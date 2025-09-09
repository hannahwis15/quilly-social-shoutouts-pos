import React from 'react';
import {
  Button,
  Checkbox,
  ExpoImage,
  LinearProgress,
  PinInput,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthenticationApi from '../apis/AuthenticationApi.js';
import ProgressFormBlock from '../components/ProgressFormBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import isValidEmail from '../global-functions/isValidEmail';
import isValidPassword from '../global-functions/isValidPassword';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const RegistrationFormScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [EmailInp, setEmailInp] = React.useState('');
  const [MaskValueConf, setMaskValueConf] = React.useState(false);
  const [MaskvaluePass, setMaskvaluePass] = React.useState(false);
  const [PasswordInp, setPasswordInp] = React.useState('');
  const [PreferredName, setPreferredName] = React.useState('');
  const [VerificationNum, setVerificationNum] = React.useState(0);
  const [confirmPassInp, setConfirmPassInp] = React.useState('');
  const [isConfirmPass, setIsConfirmPass] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isErrorConfirmPass, setIsErrorConfirmPass] = React.useState(false);
  const [isErrorEmailDNE, setIsErrorEmailDNE] = React.useState(false);
  const [isErrorEmailExist, setIsErrorEmailExist] = React.useState(false);
  const [isErrorEmailFormat, setIsErrorEmailFormat] = React.useState(false);
  const [isErrorEmailInvalid, setIsErrorEmailInvalid] = React.useState(false);
  const [isErrorEmailNotFound, setIsErrorEmailNotFound] = React.useState(false);
  const [isErrorName, setIsErrorName] = React.useState(false);
  const [isErrorPassInvalid, setIsErrorPassInvalid] = React.useState(false);
  const [isErrorVerification, setIsErrorVerification] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPreferredName, setIsPreferredName] = React.useState(true);
  const [isVerification, setIsVerification] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      setGlobalVariableValue({
        key: 'isLoading',
        value: false,
      });
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}
    >
      <>{!Constants['isLoading'] ? null : <ProgressFormBlock />}</>
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { justifyContent: 'flex-start' }
          ),
          dimensions.width
        )}
      >
        <SimpleStyleKeyboardAwareScrollView
          enableAutomaticScroll={false}
          enableOnAndroid={false}
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps={'never'}
          showsVerticalScrollIndicator={true}
          viewIsInsideTabBar={false}
        >
          {/* Name - View */}
          <>
            {!isPreferredName ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginTop: 50 },
                  dimensions.width
                )}
              >
                {/* View - Linear Progress */}
                <>
                  {!25 ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 4,
                          borderWidth: 1,
                          height: 15,
                          marginTop: 45,
                          maxHeight: 15,
                          minHeight: 15,
                          overflow: 'hidden',
                          width: '90%',
                        },
                        dimensions.width
                      )}
                    >
                      <LinearProgress
                        animationDuration={500}
                        indeterminate={false}
                        isAnimated={true}
                        showTrack={true}
                        {...GlobalStyles.LinearProgressStyles(theme)[
                          'Linear Progress'
                        ].props}
                        color={palettes.App.Yellow_primary}
                        lineCap={'square'}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearProgressStyles(theme)[
                              'Linear Progress'
                            ].style,
                            { height: 13, overflow: 'hidden' }
                          ),
                          dimensions.width
                        )}
                        thickness={25}
                        trackColor={palettes.App.White}
                        trackLineCap={'round'}
                        value={20}
                      />
                    </View>
                  )}
                </>
                {/* View - Main */}
                <View
                  style={StyleSheet.applyWidth(
                    { alignItems: 'center', marginTop: 50 },
                    dimensions.width
                  )}
                >
                  {/* View - Questions */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 45,
                        marginTop: 70,
                        position: 'relative',
                      },
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['Image 38'].props}
                      resizeMode={'contain'}
                      source={imageSource(Images['face11'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 103,
                            marginBottom: 60,
                            marginLeft: 30,
                            marginTop: -60,
                            position: 'relative',
                            width: 101,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Question */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(53, 48, 61)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 24,
                            letterSpacing: -0.5,
                            marginBottom: 20,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {"WHAT'S YOUR NAME?"}
                    </Text>
                    {/* Desc */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgba(0, 0, 0, 0.5)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'HELP US GET TO KNOW YOU!'}
                    </Text>
                  </View>
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setPreferredName(newTextInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholder={'ENTER YOUR NAME'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        theme.typography.body2,
                        {
                          borderColor: 'rgb(0, 0, 0)',
                          borderLeftWidth: 0,
                          borderRadius: 4,
                          borderRightWidth: 0,
                          borderTopWidth: 0,
                          color: theme.colors.text.medium,
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 16,
                          letterSpacing: 0.5,
                          marginBottom: 12,
                          marginTop: -3,
                          textAlign: 'center',
                          width: 362,
                        }
                      ),
                      dimensions.width
                    )}
                    value={PreferredName}
                  />
                  {/* View - LengthError */}
                  <>
                    {!isErrorName ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
                            marginTop: 10,
                            width: 341,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Spacer 5 */}
                        <Spacer bottom={3} left={8} right={8} top={3} />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'DMMono_500Medium',
                                fontSize: 12,
                                letterSpacing: -0.5,
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'PLEASE ENTER A NAME WITH AT LEAST 3 CHARACTERS.'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* Button 2 */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        if (PreferredName?.length > 2) {
                          setIsErrorName(false);
                          setIsEmail(true);
                          setIsPreferredName(false);
                        } else {
                          setIsErrorName(true);
                        }
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .style,
                        {
                          backgroundColor: 'rgb(233, 238, 168)',
                          borderWidth: 1,
                          color: 'rgb(0, 0, 0)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 20,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 359,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'CONTINUE'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 5,
                        width: 359,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            )}
          </>
          {/* Email - View */}
          <>
            {!isEmail ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginTop: 50 },
                  dimensions.width
                )}
              >
                {/* View - Linear Progress 2 */}
                <>
                  {!50 ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 4,
                          borderWidth: 1,
                          height: 15,
                          marginTop: 45,
                          maxHeight: 15,
                          minHeight: 15,
                          overflow: 'hidden',
                          width: '90%',
                        },
                        dimensions.width
                      )}
                    >
                      <LinearProgress
                        animationDuration={500}
                        indeterminate={false}
                        isAnimated={true}
                        showTrack={true}
                        {...GlobalStyles.LinearProgressStyles(theme)[
                          'Linear Progress'
                        ].props}
                        color={palettes.App.Yellow_primary}
                        lineCap={'square'}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearProgressStyles(theme)[
                              'Linear Progress'
                            ].style,
                            { height: 13, overflow: 'hidden' }
                          ),
                          dimensions.width
                        )}
                        thickness={25}
                        trackColor={palettes.App.White}
                        trackLineCap={'round'}
                        value={20}
                      />
                    </View>
                  )}
                </>
                {/* View - Main */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginTop: 50,
                    },
                    dimensions.width
                  )}
                >
                  {/* View - Questions */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 45,
                        marginTop: 70,
                        position: 'relative',
                      },
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['Image 38'].props}
                      resizeMode={'contain'}
                      source={imageSource(Images['letter31'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 120,
                            marginBottom: 45,
                            marginLeft: 30,
                            marginTop: -70,
                            position: 'relative',
                            width: 148,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Question */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(53, 48, 61)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 24,
                            letterSpacing: -0.5,
                            marginBottom: 20,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {"WHAT'S YOUR SCHOOL EMAIL?"}
                    </Text>
                    {/* Desc */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgba(0, 0, 0, 0.5)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {
                        "WE'LL GET YOU CONNECTED WITH OTHER AWESOME GIRLS ON CAMPUS!"
                      }
                    </Text>
                  </View>
                  {/* Text Input 2 */}
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInput2Value => {
                      try {
                        setEmailInp(newTextInput2Value);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                    placeholder={'ENTER YOUR EMAIL'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                        theme.typography.body2,
                        {
                          borderColor: 'rgb(0, 0, 0)',
                          borderLeftWidth: 0,
                          borderRadius: 4,
                          borderRightWidth: 0,
                          borderTopWidth: 0,
                          color: theme.colors.text.medium,
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 16,
                          letterSpacing: 0.5,
                          marginBottom: 12,
                          marginTop: -3,
                          textAlign: 'center',
                          width: 362,
                        }
                      ),
                      dimensions.width
                    )}
                    value={EmailInp}
                  />
                  {/* View - Incorrect - Exist */}
                  <>
                    {!isErrorEmailExist ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
                            marginTop: 10,
                            width: 341,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Spacer 5 */}
                        <Spacer bottom={3} left={8} right={8} top={3} />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'DMMono_500Medium',
                                fontSize: 12,
                                letterSpacing: -0.5,
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'YOU ALREADY HAVE AN ACCOUNT. TRY LOGGING IN!'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* View - Incorrect - Invalid */}
                  <>
                    {!isErrorEmailInvalid ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
                            marginTop: 10,
                            width: 341,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Spacer 5 */}
                        <Spacer bottom={3} left={8} right={8} top={3} />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'DMMono_500Medium',
                                fontSize: 12,
                                letterSpacing: -0.5,
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'EMAIL FORMAT IS INVALID!'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* View - Button */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        paddingLeft: 25,
                        paddingRight: 25,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Back Button */}
                    <View>
                      <Button
                        accessible={true}
                        iconPosition={'left'}
                        onPress={() => {
                          try {
                            setIsPreferredName(true);
                            setIsEmail(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button (default)']
                              .style,
                            {
                              backgroundColor: 'rgb(255, 255, 255)',
                              borderWidth: 1,
                              color: 'rgb(53, 48, 61)',
                              fontFamily: 'DMMono_500Medium',
                              fontSize: 18,
                              height: 52,
                              lineHeight: 26,
                              marginBottom: -49,
                              marginTop: 20,
                              textAlign: 'auto',
                              width: 111,
                              zIndex: 99,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'BACK'}
                      />
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderRadius: 8,
                            height: 52,
                            marginLeft: 4,
                            width: 111,
                            zIndex: 0,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Continue Button */}
                    <View
                      style={StyleSheet.applyWidth(
                        { justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <Button
                        accessible={true}
                        iconPosition={'left'}
                        onPress={() => {
                          const handler = async () => {
                            try {
                              if (isValidEmail(EmailInp) === true) {
                                setGlobalVariableValue({
                                  key: 'isLoading',
                                  value: true,
                                });
                                const signUpResponse = (
                                  await AuthenticationApi.userSignupPOST(
                                    Constants,
                                    {
                                      email: EmailInp,
                                      name: PreferredName,
                                      password: 'abcdefgh1',
                                    }
                                  )
                                )?.json;
                                if (
                                  signUpResponse?.message ===
                                  'The email is already in use.'
                                ) {
                                  setGlobalVariableValue({
                                    key: 'isLoading',
                                    value: false,
                                  });
                                  setIsErrorEmailInvalid(false);
                                  setIsErrorEmailExist(true);
                                } else {
                                  setGlobalVariableValue({
                                    key: 'isLoading',
                                    value: false,
                                  });
                                  setGlobalVariableValue({
                                    key: 'AUTHORIZATION_TOKEN',
                                    value:
                                      'Bearer ' + signUpResponse?.authToken,
                                  });
                                  setGlobalVariableValue({
                                    key: 'USER_ID',
                                    value: signUpResponse?.user.id,
                                  });
                                  setIsEmail(false);
                                  setIsPassword(true);
                                }
                              } else {
                                setIsErrorEmailExist(false);
                                setIsErrorEmailInvalid(true);
                              }
                            } catch (err) {
                              console.error(err);
                            }
                          };
                          handler();
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button (default)']
                              .style,
                            {
                              backgroundColor: palettes.App.Yellow_primary,
                              borderWidth: 1,
                              color: 'rgb(53, 48, 61)',
                              fontFamily: 'DMMono_500Medium',
                              fontSize: 18,
                              height: 52,
                              lineHeight: 26,
                              marginBottom: -49,
                              marginTop: 20,
                              textAlign: 'auto',
                              width: 111,
                              zIndex: 99,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'NEXT'}
                      />
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderRadius: 8,
                            height: 52,
                            marginLeft: 4,
                            width: 111,
                            zIndex: 0,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
          {/* Pass - View */}
          <>
            {!isPassword ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginTop: 50 },
                  dimensions.width
                )}
              >
                {/* View - Linear Progress */}
                <>
                  {!50 ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 4,
                          borderWidth: 1,
                          height: 15,
                          marginTop: 45,
                          maxHeight: 15,
                          minHeight: 15,
                          overflow: 'hidden',
                          width: '90%',
                        },
                        dimensions.width
                      )}
                    >
                      <LinearProgress
                        animationDuration={500}
                        indeterminate={false}
                        isAnimated={true}
                        showTrack={true}
                        {...GlobalStyles.LinearProgressStyles(theme)[
                          'Linear Progress'
                        ].props}
                        color={palettes.App.Yellow_primary}
                        lineCap={'square'}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearProgressStyles(theme)[
                              'Linear Progress'
                            ].style,
                            { height: 13, overflow: 'hidden' }
                          ),
                          dimensions.width
                        )}
                        thickness={25}
                        trackColor={palettes.App.White}
                        trackLineCap={'round'}
                        value={75}
                      />
                    </View>
                  )}
                </>
                {/* View - Main */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginTop: 50,
                    },
                    dimensions.width
                  )}
                >
                  {/* View - Questions */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 0,
                        marginTop: 70,
                        position: 'relative',
                      },
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['Image 38'].props}
                      resizeMode={'contain'}
                      source={imageSource(Images['stars11'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 51,
                            marginBottom: 45,
                            marginTop: -30,
                            position: 'relative',
                            width: 296,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Question */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(53, 48, 61)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 24,
                            letterSpacing: -0.5,
                            marginBottom: 20,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'COME UP WITH A PASSWORD!'}
                    </Text>
                  </View>
                  {/* View - Password */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 25,
                      },
                      dimensions.width
                    )}
                  >
                    {/* passinp */}
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={true}
                      changeTextDelay={500}
                      onChangeText={newPassinpValue => {
                        try {
                          setPasswordInp(newPassinpValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      {...GlobalStyles.TextInputStyles(theme)['Text Input']
                        .props}
                      placeholder={'ENTER YOUR PASSWORD'}
                      secureTextEntry={Boolean(MaskvaluePass === false)}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Text Input']
                            .style,
                          theme.typography.body2,
                          {
                            borderColor: 'rgb(0, 0, 0)',
                            borderLeftWidth: 0,
                            borderRadius: 4,
                            borderRightWidth: 0,
                            borderTopWidth: 0,
                            color: theme.colors.text.medium,
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0.5,
                            marginBottom: 12,
                            marginTop: -3,
                            paddingLeft: 22,
                            textAlign: 'left',
                            width: 362,
                          }
                        ),
                        dimensions.width
                      )}
                      value={PasswordInp}
                    />
                    {/* Checkboxpass */}
                    <Checkbox
                      onPress={newCheckboxpassValue => {
                        try {
                          setMaskvaluePass(newCheckboxpassValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      checkedIcon={'Feather/eye'}
                      color={palettes.App.black_primary}
                      status={MaskvaluePass}
                      style={StyleSheet.applyWidth(
                        { bottom: 20, position: 'absolute', right: 10 },
                        dimensions.width
                      )}
                      uncheckedColor={palettes.App.black_primary}
                      uncheckedIcon={'Feather/eye-off'}
                    />
                  </View>
                  {/* View - ConfirmPassword */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginTop: 25,
                      },
                      dimensions.width
                    )}
                  >
                    {/* confirmpassinp */}
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={true}
                      changeTextDelay={500}
                      onChangeText={newConfirmpassinpValue => {
                        try {
                          setConfirmPassInp(newConfirmpassinpValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      {...GlobalStyles.TextInputStyles(theme)['Text Input']
                        .props}
                      placeholder={'CONFIRM PASSWORD'}
                      secureTextEntry={Boolean(MaskValueConf === false)}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Text Input']
                            .style,
                          theme.typography.body2,
                          {
                            borderColor: 'rgb(0, 0, 0)',
                            borderLeftWidth: 0,
                            borderRadius: 4,
                            borderRightWidth: 0,
                            borderTopWidth: 0,
                            color: theme.colors.text.medium,
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0.5,
                            marginBottom: 12,
                            marginTop: -3,
                            paddingLeft: 22,
                            textAlign: 'left',
                            width: 362,
                          }
                        ),
                        dimensions.width
                      )}
                      value={confirmPassInp}
                    />
                    {/* Checkboxconf */}
                    <Checkbox
                      onPress={newCheckboxconfValue => {
                        try {
                          setMaskValueConf(newCheckboxconfValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      checkedIcon={'Feather/eye'}
                      color={palettes.App.black_primary}
                      status={MaskValueConf}
                      style={StyleSheet.applyWidth(
                        { bottom: 20, position: 'absolute', right: 10 },
                        dimensions.width
                      )}
                      uncheckedColor={palettes.App.black_primary}
                      uncheckedIcon={'Feather/eye-off'}
                    />
                  </View>
                  {/* View - Incorrect - Invalid */}
                  <>
                    {!isErrorPassInvalid ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
                            marginTop: 10,
                            width: 341,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Spacer 5 */}
                        <Spacer bottom={3} left={8} right={8} top={3} />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'DMMono_500Medium',
                                fontSize: 12,
                                letterSpacing: -0.5,
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {'OOPS! USE 8+ CHARACTERS WITH A NUMBER.'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* View - Incorrect - Confirm */}
                  <>
                    {!isErrorConfirmPass ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
                            marginTop: 10,
                            width: 341,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Spacer 5 */}
                        <Spacer bottom={3} left={8} right={8} top={3} />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'DMMono_500Medium',
                                fontSize: 12,
                                letterSpacing: -0.5,
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {"PASSWORDS AREN'T THE SAME. TRY AGAIN!"}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* View - Button */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 20,
                        paddingLeft: 25,
                        paddingRight: 25,
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  >
                    {/* Back Button */}
                    <View>
                      <Button
                        accessible={true}
                        iconPosition={'left'}
                        onPress={() => {
                          try {
                            setIsEmail(true);
                            setIsPassword(false);
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button (default)']
                              .style,
                            {
                              backgroundColor: 'rgb(255, 255, 255)',
                              borderWidth: 1,
                              color: 'rgb(53, 48, 61)',
                              fontFamily: 'DMMono_500Medium',
                              fontSize: 18,
                              height: 52,
                              lineHeight: 26,
                              marginBottom: -49,
                              marginTop: 20,
                              textAlign: 'auto',
                              width: 111,
                              zIndex: 99,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'BACK'}
                      />
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderRadius: 8,
                            height: 52,
                            marginLeft: 4,
                            width: 111,
                            zIndex: 0,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                    {/* Continue Button */}
                    <View
                      style={StyleSheet.applyWidth(
                        { justifyContent: 'center' },
                        dimensions.width
                      )}
                    >
                      <Button
                        accessible={true}
                        iconPosition={'left'}
                        onPress={() => {
                          try {
                            if (isValidPassword(PasswordInp)) {
                              if (confirmPassInp === PasswordInp) {
                                setIsPassword(false);
                                setIsVerification(true);
                              } else {
                                setIsErrorPassInvalid(false);
                                setIsErrorConfirmPass(true);
                              }
                            } else {
                              setIsErrorPassInvalid(true);
                              setIsErrorConfirmPass(false);
                            }
                          } catch (err) {
                            console.error(err);
                          }
                        }}
                        {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.ButtonStyles(theme)['Button (default)']
                              .style,
                            {
                              backgroundColor: palettes.App.Yellow_primary,
                              borderWidth: 1,
                              color: 'rgb(53, 48, 61)',
                              fontFamily: 'DMMono_500Medium',
                              fontSize: 18,
                              height: 52,
                              lineHeight: 26,
                              marginBottom: -49,
                              marginTop: 20,
                              textAlign: 'auto',
                              width: 111,
                              zIndex: 99,
                            }
                          ),
                          dimensions.width
                        )}
                        title={'NEXT'}
                      />
                      {/* View 2 */}
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(0, 0, 0)',
                            borderRadius: 8,
                            height: 52,
                            marginLeft: 4,
                            width: 111,
                            zIndex: 0,
                          },
                          dimensions.width
                        )}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </>
          {/* Verification - View */}
          <>
            {!isVerification ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { alignItems: 'center', marginTop: 50 },
                  dimensions.width
                )}
              >
                {/* View - Linear Progress 2 */}
                <>
                  {!50 ? null : (
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          borderRadius: 4,
                          borderWidth: 1,
                          height: 15,
                          marginTop: 45,
                          maxHeight: 15,
                          minHeight: 15,
                          overflow: 'hidden',
                          width: '90%',
                        },
                        dimensions.width
                      )}
                    >
                      <LinearProgress
                        animationDuration={500}
                        indeterminate={false}
                        isAnimated={true}
                        showTrack={true}
                        {...GlobalStyles.LinearProgressStyles(theme)[
                          'Linear Progress'
                        ].props}
                        color={palettes.App.Yellow_primary}
                        lineCap={'square'}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.LinearProgressStyles(theme)[
                              'Linear Progress'
                            ].style,
                            { height: 13, overflow: 'hidden' }
                          ),
                          dimensions.width
                        )}
                        thickness={25}
                        trackColor={palettes.App.White}
                        trackLineCap={'round'}
                        value={100}
                      />
                    </View>
                  )}
                </>
                {/* View - Main */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      marginTop: 30,
                    },
                    dimensions.width
                  )}
                >
                  {/* View - Questions */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: 45,
                        position: 'relative',
                      },
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)['Image 38'].props}
                      resizeMode={'contain'}
                      source={imageSource(Images['feather21'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 143,
                            marginBottom: 15,
                            position: 'relative',
                            width: 119,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Question */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgb(53, 48, 61)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 24,
                            letterSpacing: -0.5,
                            marginBottom: 20,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {"LET'S DO A QUICK\nVERIFICATION"}
                    </Text>
                    {/* Desc */}
                    <Text
                      accessible={true}
                      selectable={false}
                      {...GlobalStyles.TextStyles(theme)['Heading 1'].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextStyles(theme)['Heading 1'].style,
                          {
                            alignSelf: 'center',
                            color: 'rgba(0, 0, 0, 0.5)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'WE WILL SEND YOU A CODE'}
                    </Text>
                  </View>
                  <PinInput
                    autoComplete={'one-time-code'}
                    blurOnFull={true}
                    changeTextDelay={500}
                    clearOnCellFocus={true}
                    focusedBorderColor={theme.colors.branding.primary}
                    keyboardType={'number-pad'}
                    onChangeText={newPinInputValue => {
                      try {
                        setVerificationNum(newPinInputValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    renderItem={({ cellValue, isFocused }) => {
                      return null;
                    }}
                    secureTextEntry={false}
                    {...GlobalStyles.PinInputStyles(theme)['Pin Input'].props}
                    cellCount={5}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.PinInputStyles(theme)['Pin Input'].style,
                        theme.typography.headline5,
                        { borderRadius: 8, maxHeight: 55, maxWidth: 55 }
                      ),
                      dimensions.width
                    )}
                    value={VerificationNum}
                  />
                  {/* View - Incorrect - verification */}
                  <>
                    {!isErrorVerification ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
                            marginTop: 30,
                            width: 341,
                          },
                          dimensions.width
                        )}
                      >
                        {/* Spacer 5 */}
                        <Spacer bottom={3} left={8} right={8} top={3} />
                        <Text
                          accessible={true}
                          selectable={false}
                          {...GlobalStyles.TextStyles(theme)['Text'].props}
                          style={StyleSheet.applyWidth(
                            StyleSheet.compose(
                              GlobalStyles.TextStyles(theme)['Text'].style,
                              {
                                alignSelf: 'center',
                                color: 'rgb(0, 0, 0)',
                                fontFamily: 'DMMono_500Medium',
                                fontSize: 12,
                                letterSpacing: -0.5,
                                lineHeight: 16,
                              }
                            ),
                            dimensions.width
                          )}
                        >
                          {
                            "OOPS! THAT CODE DIDN'T WORK. PLEASE TRY AGAIN.\nOops! That code didn’t work. Please try again."
                          }
                        </Text>
                      </View>
                    )}
                  </>
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      const handler = async () => {
                        try {
                          setGlobalVariableValue({
                            key: 'isLoading',
                            value: true,
                          });
                          const verifyResult = (
                            await AuthenticationApi.verifyMemberPOST(
                              Constants,
                              {
                                user_id: Constants['USER_ID'],
                                verification_number: VerificationNum,
                              }
                            )
                          )?.json;
                          if (verifyResult === true) {
                            setIsErrorVerification(false);
                            setGlobalVariableValue({
                              key: 'isLoading',
                              value: false,
                            });
                            navigation.navigate('OnboardingStack');
                          } else {
                            setIsErrorVerification(true);
                            setGlobalVariableValue({
                              key: 'isLoading',
                              value: false,
                            });
                          }
                        } catch (err) {
                          console.error(err);
                        }
                      };
                      handler();
                    }}
                    {...GlobalStyles.ButtonStyles(theme)['Button (default)']
                      .props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ButtonStyles(theme)['Button (default)']
                          .style,
                        {
                          backgroundColor: palettes.App.Yellow_primary,
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 51,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 55,
                          textAlign: 'auto',
                          width: 361,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'CONTINUE'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 51,
                        marginLeft: 4,
                        width: 361,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            )}
          </>
        </SimpleStyleKeyboardAwareScrollView>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(RegistrationFormScreen);
