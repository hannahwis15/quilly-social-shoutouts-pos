import React from 'react';
import { Button, ExpoImage, ScreenContainer, withTheme } from '@draftbit/ui';
import { Image, ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const OnboardingHouseAnnouncementScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [MaskValueConfirm, setMaskValueConfirm] = React.useState(false);
  const [MaskvaluePass, setMaskvaluePass] = React.useState(false);
  const [Pass, setPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [isErrorInvalid, setIsErrorInvalid] = React.useState(false);
  const [isErrorNotEqual, setIsErrorNotEqual] = React.useState(false);
  const [isResetDone, setIsResetDone] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { alignItems: 'center', justifyContent: 'flex-start' }
          ),
          dimensions.width
        )}
      >
        {/* Top Content */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              borderBottomWidth: 1,
              marginTop: 100,
              paddingBottom: 15,
              width: '80%',
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.Neutral[800],
                fontFamily: 'DMMono_500Medium',
                fontSize: 20,
                letterSpacing: -0.5,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'WELCOME [INSERT NAME]!'}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: palettes.Neutral[800],
                fontFamily: 'DMMono_500Medium',
                fontSize: 24,
                letterSpacing: -0.5,
                lineHeight: 26,
                marginTop: 15,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {"YOU'VE JOINED THE \nKAHLO HOUSE"}
          </Text>
        </View>
        <Image
          resizeMode={'cover'}
          {...GlobalStyles.ImageStyles(theme)['Image'].props}
          source={imageSource(Images['kahlohouse'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.ImageStyles(theme)['Image'].style, {
              height: 305,
              marginTop: 15,
              width: 301,
            }),
            dimensions.width
          )}
        />
        {/* Image 2 */}
        <ExpoImage
          allowDownscaling={true}
          cachePolicy={'disk'}
          contentPosition={'center'}
          resizeMode={'cover'}
          transitionDuration={300}
          transitionEffect={'cross-dissolve'}
          transitionTiming={'ease-in-out'}
          {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11'].props}
          source={imageSource(Images['frame3234386'])}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ExpoImageStyles(theme)['Image (default) 11'].style,
              { height: 27, width: 327 }
            ),
            dimensions.width
          )}
        />
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgb(255, 255, 255)',
              borderColor: 'rgb(0, 0, 0)',
              borderRadius: 10,
              borderWidth: 1,
              marginTop: 20,
              paddingBottom: 12,
              paddingLeft: 10,
              paddingRight: 10,
              paddingTop: 12,
              width: '80%',
            },
            dimensions.width
          )}
        >
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text 2'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text 2'].style,
                theme.typography.body1,
                {
                  color: 'rgb(0, 0, 0)',
                  fontFamily: 'DMMono_500Medium',
                  fontSize: 16,
                  letterSpacing: -1,
                  lineHeight: 20,
                }
              ),
              dimensions.width
            )}
          >
            {
              'HERE AT THE KAHLO HOUSE YOU DON’T NEED TO BE AN AWARD WINNING ARTIST, YOU JUST NEED TO HAVE A CREATIVE FLAIR. EXPRESSION AND RESILIENCE DRIVE US KAHLO GIRLS.'
            }
          </Text>
        </View>
        {/* View 4 */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginTop: 22 },
            dimensions.width
          )}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgb(0, 0, 0)',
                borderRadius: 8,
                height: 52,
                marginBottom: -55,
                marginLeft: 3,
                width: 341,
                zIndex: 0,
              },
              dimensions.width
            )}
          />
          {/* Confirm button */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('OnboardingStack', {
                  screen: 'OnboardingTutorialScreen',
                });
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                {
                  backgroundColor: 'rgb(233, 238, 168)',
                  borderColor: 'rgb(0, 0, 0)',
                  borderWidth: 1,
                  color: 'rgb(53, 48, 61)',
                  fontFamily: 'DMMono_500Medium',
                  fontSize: 20,
                  height: 52,
                  lineHeight: 26,
                  width: 341,
                }
              ),
              dimensions.width
            )}
            title={'BEGIN TOUR'}
          />
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingHouseAnnouncementScreen);
