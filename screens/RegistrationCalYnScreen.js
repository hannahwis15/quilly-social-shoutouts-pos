import React from 'react';
import {
  Button,
  ExpoImage,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const RegistrationCalYnScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [Email, setEmail] = React.useState('');
  const [EmailInp, setEmailInp] = React.useState('');
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isErrorEmailDNE, setIsErrorEmailDNE] = React.useState(false);
  const [isErrorEmailFormat, setIsErrorEmailFormat] = React.useState(false);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      undefined;
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { justifyContent: 'center', paddingTop: 60 }
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
          {/* ForgotPass - View */}
          <>
            {!(isEmailSent === false) ? null : (
              <View
                style={StyleSheet.applyWidth(
                  { marginBottom: 150 },
                  dimensions.width
                )}
              >
                {/* View - Main */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignContent: 'flex-start',
                      alignItems: 'center',
                      alignSelf: 'auto',
                      flexDirection: 'column',
                      justifyContent: 'center',
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
                      source={imageSource(Images['calflag1'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 161,
                            marginBottom: 60,
                            marginTop: -60,
                            position: 'relative',
                            width: 245,
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
                            letterSpacing: -1.5,
                            marginBottom: 20,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'DO YOU CURRENTLY \nATTEND UC BERKELEY?'}
                    </Text>
                  </View>
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginBottom: -75,
                        marginLeft: 8,
                        width: 359,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate('RegistationStack', {
                          screen: 'RegistrationFormScreen',
                        });
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
                          marginBottom: 20,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 359,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'YES\n'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginBottom: -75,
                        marginLeft: 8,
                        width: 359,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                  {/* Button 2 */}
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.navigate('RegistationStack', {
                          screen: 'RegistrationNotifyFlowScreen',
                        });
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
                          color: 'rgb(0, 0, 0)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 20,
                          height: 52,
                          lineHeight: 26,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 359,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'NO'}
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

export default withTheme(RegistrationCalYnScreen);
