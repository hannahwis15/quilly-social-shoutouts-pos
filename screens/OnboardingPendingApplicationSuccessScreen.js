import React from 'react';
import { Button, ExpoImage, ScreenContainer, withTheme } from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const OnboardingPendingApplicationSuccessScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [Pass, setPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        resizeMode={'cover'}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { justifyContent: 'flex-start', paddingTop: 60, width: '100%' }
          ),
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center' },
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
            {...GlobalStyles.ExpoImageStyles(theme)['Image 50'].props}
            resizeMode={'contain'}
            source={imageSource(Images['confetti1'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image 50'].style,
                { bottom: 100, height: 111, top: 70, width: 124 }
              ),
              dimensions.width
            )}
          />
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: 'rgb(0, 0, 0)',
                fontFamily: 'DMMono_500Medium',
                fontSize: 24,
                letterSpacing: -0.5,
                marginBottom: 50,
                marginTop: 100,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'CONGRATULATIONS!'}
          </Text>

          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgb(255, 255, 255)',
                borderColor: 'rgb(0, 0, 0)',
                borderRadius: 10,
                borderWidth: 1,
                paddingBottom: 20,
                paddingTop: 30,
                width: '75%',
              },
              dimensions.width
            )}
          >
            {/* Text 3 */}
            <Text
              accessible={true}
              selectable={false}
              {...GlobalStyles.TextStyles(theme)['Text'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.TextStyles(theme)['Text'].style,
                  {
                    color: 'rgb(0, 0, 0)',
                    fontFamily: 'DMMono_500Medium',
                    fontSize: 18,
                    letterSpacing: -0.5,
                    marginLeft: 10,
                    marginRight: 10,
                    textAlign: 'center',
                  }
                ),
                dimensions.width
              )}
            >
              {'APPLICATION STATUS'}
            </Text>
            {/* Image 2 */}
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                .props}
              source={imageSource(Images['acceptedstatus'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .style,
                  { height: 38, marginTop: 15, width: 162 }
                ),
                dimensions.width
              )}
            />
          </View>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: 'rgba(53, 48, 61, 0.5)',
                fontFamily: 'DMMono_500Medium',
                fontSize: 12,
                marginTop: 40,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'CLICK YOUR APPLICATION STATUS TO DISCOVER YOUR \nHOUSE.'}
          </Text>
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingPendingApplicationSuccessScreen);
