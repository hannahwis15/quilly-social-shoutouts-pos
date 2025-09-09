import React from 'react';
import { LottieAnimation, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthenticationApi from '../apis/AuthenticationApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';
import waitUtil from '../utils/wait';

const SplashScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const isFocused = useIsFocused();
  React.useEffect(() => {
    const handler = async () => {
      try {
        if (!isFocused) {
          return;
        }
        await waitUtil({ milliseconds: 1000 });
        if (Constants['AUTHORIZATION_TOKEN'] !== null) {
          const return_user = (
            await AuthenticationApi.getMeGET(Constants, {
              user_id: Constants['USER_ID'],
            })
          )?.json;
          if (return_user?.code === 'ERROR_CODE UNAUTHORIZED') {
            setGlobalVariableValue({
              key: 'USER_ID',
              value: null,
            });
            setGlobalVariableValue({
              key: 'AUTHORIZATION_TOKEN',
              value: null,
            });
            setGlobalVariableValue({
              key: 'isLoading',
              value: false,
            });
            navigation.navigate('AuthStack');
          } else {
          }

          if (return_user?.status === 'SORTING') {
            navigation.navigate('OnboardingStack', {
              screen: 'OnboardingPendingApplicationScreen',
            });
          } else {
            navigation.navigate('HomescreenHomeScreen');
          }
        } else {
          setGlobalVariableValue({
            key: 'USER_ID',
            value: null,
          });
          setGlobalVariableValue({
            key: 'isLoading',
            value: false,
          });
          navigation.navigate('LandingPageScreen');
        }
      } catch (err) {
        console.error(err);
      }
    };
    handler();
  }, [isFocused]);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      hasBottomSafeArea={true}
      hasTopSafeArea={true}
      style={StyleSheet.applyWidth(
        { alignItems: 'center', justifyContent: 'center' },
        dimensions.width
      )}
    >
      <LottieAnimation
        autoPlay={true}
        loop={true}
        source={imageSource(
          'https://assets.draftbit.app/apps/XO5oP0uW/assets/2ZLofn9B5wGZ5t5qMal9Y'
        )}
        speed={1}
        {...GlobalStyles.LottieAnimationStyles(theme)['Lottie Animation'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.LottieAnimationStyles(theme)['Lottie Animation'].style,
          dimensions.width
        )}
      />
      <Text
        accessible={true}
        selectable={false}
        {...GlobalStyles.TextStyles(theme)['Text'].props}
        style={StyleSheet.applyWidth(
          GlobalStyles.TextStyles(theme)['Text'].style,
          dimensions.width
        )}
      >
        {'Loading ....'}
      </Text>
    </ScreenContainer>
  );
};

export default withTheme(SplashScreen);
