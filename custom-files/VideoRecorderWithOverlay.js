import React, { useRef, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';

// your three interview prompts
const QUESTIONS = [
  "1) What's your name and role?",
  '2) Why are you excited about this opportunity?',
  '3) Where do you see yourself in 5 years?',
];

export function InterviewRecorder({
  maxDuration = 90, // total seconds allotted
  onUploadComplete = () => {}, // optional callback
}) {
  const cameraRef = useRef(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timer, setTimer] = useState(maxDuration);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [uploadProgress, setUploadProgress] = useState(0);

  // ask camera perms on mount
  useEffect(() => {
    requestPermission();
  }, []);

  // countdown + question switching
  useEffect(() => {
    if (!isRecording || isPaused) return;
    const tick = setInterval(() => {
      setTimer(t => {
        if (t <= 1) {
          clearInterval(tick);
          handleStop(); // auto-stop at zero
          return maxDuration;
        }
        const next = t - 1;
        // update question index
        const elapsed = maxDuration - next;
        const idx = Math.min(
          Math.floor(elapsed / (maxDuration / QUESTIONS.length)),
          QUESTIONS.length - 1
        );
        setQuestionIndex(idx);
        return next;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [isRecording, isPaused]);

  if (!permission || !permission.granted) {
    return (
      <View style={styles.center}>
        <Text>Waiting for camera permission…</Text>
      </View>
    );
  }

  function formatTime(sec) {
    const m = Math.floor(sec / 60),
      s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  async function handleStart() {
    setTimer(maxDuration);
    setQuestionIndex(0);
    setUploadProgress(0);
    setIsRecording(true);
    setIsPaused(false);
    try {
      const video = await cameraRef.current.recordAsync();
      setIsRecording(false);
      uploadVideoToS3(video.uri);
    } catch (err) {
      console.error(err);
      Alert.alert('Recording failed', err.message);
      setIsRecording(false);
    }
  }

  async function handlePause() {
    // expo-camera currently doesn’t officially support pauseRecording;
    // if yours does, call it here. Otherwise, you can do a stop & resume-record-segments approach.
    await cameraRef.current.pauseRecording?.();
    setIsPaused(true);
  }

  async function handleResume() {
    await cameraRef.current.resumeRecording?.();
    setIsPaused(false);
  }

  function handleStop() {
    if (isRecording) {
      cameraRef.current.stopRecording();
      setIsRecording(false);
    }
  }

  function handleReset() {
    if (isRecording) cameraRef.current.stopRecording();
    setIsRecording(false);
    setIsPaused(false);
    setTimer(maxDuration);
    setQuestionIndex(0);
    setUploadProgress(0);
  }

  async function uploadVideoToS3(uri) {
    try {
      // 1) get presigned URL + public URL from your backend
      const fileName = uri.split('/').pop();
      const presignResp = await fetch('https://YOUR_API/get-presign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileName }),
      });
      const { uploadUrl, fileUrl } = await presignResp.json();

      // 2) fetch blob from local file URI
      const fileResp = await fetch(uri);
      const blob = await fileResp.blob();

      // 3) upload with progress
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('PUT', uploadUrl);
        xhr.upload.onprogress = e => {
          if (e.lengthComputable) {
            setUploadProgress(Math.floor((e.loaded / e.total) * 100));
          }
        };
        xhr.onload = () => (xhr.status === 200 ? resolve() : reject());
        xhr.onerror = () => reject();
        xhr.send(blob);
      });

      // 4) fire your DB update with the public fileUrl
      await fetch('https://YOUR_API/update-profile-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ videoUrl: fileUrl }),
      });

      setUploadProgress(100);
      Alert.alert('Upload complete!');
      onUploadComplete(fileUrl);
    } catch (err) {
      console.error(err);
      Alert.alert('Upload failed', err.message);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={CameraType.front} ref={cameraRef}>
        <View style={styles.overlay}>
          {isRecording && (
            <>
              <Text style={styles.overlayText}>Time: {formatTime(timer)}</Text>
              <Text style={styles.overlayText}>{QUESTIONS[questionIndex]}</Text>
            </>
          )}
        </View>
      </CameraView>

      <View style={styles.controls}>
        {!isRecording && <RecordButton onPress={handleStart} label="Start" />}
        {isRecording && !isPaused && (
          <RecordButton onPress={handlePause} label="Pause" />
        )}
        {isRecording && isPaused && (
          <RecordButton onPress={handleResume} label="Resume" />
        )}
        {isRecording && <RecordButton onPress={handleStop} label="Stop" />}
        <RecordButton onPress={handleReset} label="Reset" />
      </View>

      {uploadProgress > 0 && (
        <View style={styles.upload}>
          <Text>Uploading: {uploadProgress}%</Text>
          {uploadProgress < 100 && (
            <ActivityIndicator style={{ marginTop: 8 }} />
          )}
        </View>
      )}
    </View>
  );
}

// simple styled button
function RecordButton({ onPress, label }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 12,
    alignItems: 'center',
  },
  overlayText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 12,
    backgroundColor: '#111',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  buttonText: { color: '#fff', fontSize: 14 },
  upload: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#111',
  },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
