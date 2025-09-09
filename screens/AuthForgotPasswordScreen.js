import React from 'react';
import {
  Button,
  ExpoImage,
  IconButton,
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
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const AuthForgotPasswordScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [EmailInp, setEmailInp] = React.useState('');
  const [Maskvalue, setMaskvalue] = React.useState(false);
  const [emailinpt, setEmailinpt] = React.useState({});
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isErrorEmailDNE, setIsErrorEmailDNE] = React.useState(false);
  const [isErrorEmailFormat, setIsErrorEmailFormat] = React.useState(false);
  const [isIncorrect, setIsIncorrect] = React.useState(false);
  const [passinpt, setPassinpt] = React.useState({});

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={false}
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      hasSafeArea={false}
      hasTopSafeArea={false}
      style={StyleSheet.applyWidth(
        { justifyContent: 'center' },
        dimensions.width
      )}
    >
      <>{!(Constants['isLoading'] === true) ? null : <ProgressFormBlock />}</>
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
                      source={imageSource(Images['letter21'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 82,
                            marginBottom: 60,
                            marginLeft: 30,
                            marginTop: -60,
                            position: 'relative',
                            width: 114,
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
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'FORGOT YOUR PASSWORD?'}
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
                            letterSpacing: -1.5,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {
                        "ENTER YOUR EMAIL AND WE'LL SEND\nINSTRUCTIONS ON WHAT TO DO NEXT!"
                      }
                    </Text>
                  </View>
                  <TextInput
                    autoCapitalize={'none'}
                    autoCorrect={true}
                    changeTextDelay={500}
                    onChangeText={newTextInputValue => {
                      try {
                        setEmailInp(newTextInputValue);
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
                          borderColor: palettes.Neutral[400],
                          borderLeftWidth: 0,
                          borderRadius: 4,
                          borderRightWidth: 0,
                          borderTopWidth: 0,
                          color: theme.colors.text.medium,
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 16,
                          letterSpacing: 1,
                          marginBottom: 55,
                          marginTop: -3,
                          paddingLeft: 25,
                          width: 362,
                        }
                      ),
                      dimensions.width
                    )}
                    value={EmailInp}
                  />
                  {/* View - Incorrect DNE1 */}
                  <>
                    {!isErrorEmailDNE ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
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
                          {'EMAIL NOT FOUND. SIGN UP TO BEGIN!'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* View - Incorrect Invalid1 */}
                  <>
                    {!isErrorEmailFormat ? null : (
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            backgroundColor: 'rgb(255, 108, 31)',
                            borderRadius: 8,
                            borderWidth: 1,
                            height: 32,
                            marginBottom: 20,
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
                          {'INVALID EMAIL FORMAT'}
                        </Text>
                      </View>
                    )}
                  </>
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
                      const handler = async () => {
                        try {
                          setGlobalVariableValue({
                            key: 'isLoading',
                            value: true,
                          });
                          if (isValidEmail(EmailInp)) {
                            setIsErrorEmailFormat(false);
                            const passwordRecovery = (
                              await AuthenticationApi.passwordRecoveryPOST(
                                Constants,
                                { email: EmailInp }
                              )
                            )?.json;
                            if (
                              passwordRecovery?.error ===
                              'ERROR_USER_CANNOT_BE_FOUND'
                            ) {
                              setIsErrorEmailDNE(true);
                              setIsErrorEmailFormat(false);
                              setGlobalVariableValue({
                                key: 'isLoading',
                                value: false,
                              });
                            } else {
                              setIsErrorEmailDNE(false);
                              setGlobalVariableValue({
                                key: 'isLoading',
                                value: false,
                              });
                              setIsEmailSent(true);
                            }
                          } else {
                            setIsErrorEmailFormat(true);
                            setIsErrorEmailDNE(false);
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
                          backgroundColor: 'rgb(233, 238, 168)',
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
                    title={'SEND EMAIL\n'}
                  />
                </View>
              </View>
            )}
          </>
          {/* EmailSent - View */}
          <>
            {!isEmailSent ? null : (
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
                      source={imageSource(Images['letter11'])}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                          {
                            height: 82,
                            marginBottom: 60,
                            marginLeft: 30,
                            marginTop: -60,
                            position: 'relative',
                            width: 114,
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
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'EMAIL SENT!'}
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
                            alignSelf: 'auto',
                            color: 'rgba(0, 0, 0, 0.5)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: -1.5,
                            textAlign: 'center',
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'CHECK YOU EMAIL FOR INSTRUCTIONS ON \nWHAT TO DO!'}
                    </Text>
                  </View>
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
                          const passwordRecovery = (
                            await AuthenticationApi.passwordRecoveryPOST(
                              Constants,
                              { email: EmailInp }
                            )
                          )?.json;
                          setGlobalVariableValue({
                            key: 'isLoading',
                            value: false,
                          });
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
                          backgroundColor: 'rgb(233, 238, 168)',
                          borderWidth: 1,
                          color: 'rgb(0, 0, 0)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 20,
                          height: 52,
                          lineHeight: 26,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 361,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'RESEND EMAIL'}
                  />
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        bottom: 48,
                        height: 52,
                        left: 6,
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
        </SimpleStyleKeyboardAwareScrollView>
      </ImageBackground>
      <>
        {!(isEmailSent === false) ? null : (
          <IconButton
            onPress={() => {
              try {
                navigation.goBack();
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors.text.medium}
            icon={'AntDesign/arrowleft'}
            style={StyleSheet.applyWidth(
              { left: 20, position: 'absolute', top: 55 },
              dimensions.width
            )}
          />
        )}
      </>
    </ScreenContainer>
  );
};

export default withTheme(AuthForgotPasswordScreen);
