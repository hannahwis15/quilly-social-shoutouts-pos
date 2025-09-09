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

const OnboardingPendingApplicationScreen = props => {
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
            source={imageSource(Images['paperplane1'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image 50'].style,
                { bottom: 100, height: 93, top: 70, width: 150 }
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
            {'THE BEST IS YET TO COME.'}
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
              source={imageSource(Images['frame3233718'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .style,
                  { height: 38, marginTop: 15, width: 152 }
                ),
                dimensions.width
              )}
            />
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: 20,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: 'rgb(245, 245, 245)',
                    borderRadius: 10,
                    gap: -1,
                    height: 59,
                    justifyContent: 'center',
                    paddingTop: 7,
                    width: 59,
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
                        fontSize: 24,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'00'}
                </Text>
              </View>
              {/* Text 2 */}
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
                      fontSize: 24,
                      marginLeft: 7,
                      marginRight: 7,
                    }
                  ),
                  dimensions.width
                )}
              >
                {':'}
              </Text>
              {/* View 3 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: 'rgb(245, 245, 245)',
                    borderRadius: 10,
                    gap: -1,
                    height: 59,
                    justifyContent: 'center',
                    paddingTop: 7,
                    width: 59,
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
                        fontSize: 24,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'00'}
                </Text>
              </View>
            </View>
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
                marginTop: 20,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'HANG TIGHT, QUILLY SISTA! WE ARE REVIEWING \nYOUR INFORMATION.'}
          </Text>
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingPendingApplicationScreen);
