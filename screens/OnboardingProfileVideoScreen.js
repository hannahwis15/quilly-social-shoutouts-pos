import React from 'react';
import { ScreenContainer, withTheme } from '@draftbit/ui';
import * as VideoRecorderWithOverlay from '../custom-files/VideoRecorderWithOverlay';
import palettes from '../themes/palettes';
import * as Utils from '../utils';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const OnboardingProfileVideoScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <Utils.CustomCodeErrorBoundary>
        <VideoRecorderWithOverlay.VideoRecorderWithOverlay />
      </Utils.CustomCodeErrorBoundary>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingProfileVideoScreen);
