import React from 'react';
import {
  Button,
  Checkbox,
  ExpoImage,
  Link,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthenticationApi from '../apis/AuthenticationApi.js';
import ProgressFormBlock from '../components/ProgressFormBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const AuthBerkeleyLoginScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [EmailInp, setEmailInp] = React.useState('');
  const [Maskvalue, setMaskvalue] = React.useState(false);
  const [PreferredName, setPreferredName] = React.useState('');
  const [emailinpt, setEmailinpt] = React.useState(null);
  const [isErrorEmailExist, setIsErrorEmailExist] = React.useState(false);
  const [isErrorEmailInvalid, setIsErrorEmailInvalid] = React.useState('');
  const [isErrorEmailNotFound, setIsErrorEmailNotFound] = React.useState(false);
  const [isIncorrect, setIsIncorrect] = React.useState(false);
  const [newCheckBoxValue, setNewCheckBoxValue] = React.useState('');
  const [passinpt, setPassinpt] = React.useState(null);
  const [textInputValue, setTextInputValue] = React.useState('');
  const [textInputValue2, setTextInputValue2] = React.useState('');
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { paddingTop: 60 }
          ),
          dimensions.width
        )}
      >
        <SimpleStyleKeyboardAwareScrollView
          enableOnAndroid={false}
          enableResetScrollToCoords={false}
          keyboardShouldPersistTaps={'never'}
          showsVerticalScrollIndicator={true}
          viewIsInsideTabBar={false}
          enableAutomaticScroll={true}
          style={StyleSheet.applyWidth(
            { alignSelf: 'center', flex: 1, justifyContent: 'center' },
            dimensions.width
          )}
        >
          {/* View - Main */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-end',
                alignSelf: 'auto',
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingLeft: 15,
                paddingRight: 15,
                paddingTop: 20,
                width: '100%',
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
                  marginBottom: 55,
                  marginTop: 80,
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
                source={imageSource(Images['hands1'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                    {
                      height: 200,
                      marginTop: -60,
                      position: 'relative',
                      width: 200,
                    }
                  ),
                  dimensions.width
                )}
              />
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
                      fontSize: 36,
                      letterSpacing: -1.5,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'WELCOME BACK!'}
              </Text>
            </View>
            {/* View - Form */}
            <View
              style={StyleSheet.applyWidth({ width: 341 }, dimensions.width)}
            >
              {/* Email Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: 'rgb(114, 114, 114)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 12,
                      letterSpacing: 0,
                      lineHeight: 12,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'YOUR UC BERKELEY E-MAIL'}
              </Text>
              {/* Email Input */}
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newEmailInputValue => {
                  try {
                    setEmailinpt(newEmailInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Input-style'].props}
                keyboardType={'email-address'}
                placeholder={'EMAIL'}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Input-style'].style,
                    {
                      alignSelf: 'auto',
                      borderColor: 'rgb(0, 0, 0)',
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 16,
                      letterSpacing: -0.5,
                      paddingBottom: 8,
                      paddingRight: 8,
                      paddingTop: 8,
                      width: 341,
                    }
                  ),
                  dimensions.width
                )}
                textContentType={'emailAddress'}
              />
              {/* Spacer 2 */}
              <Spacer bottom={8} left={8} right={8} top={8} />
              {/* Password Text */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      color: 'rgb(114, 114, 114)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 12,
                      letterSpacing: 0,
                      lineHeight: 12,
                      marginTop: 6,
                      paddingRight: -120,
                    }
                  ),
                  dimensions.width
                )}
              >
                {'PASSWORD'}
              </Text>

              <View
                style={StyleSheet.applyWidth(
                  { flexDirection: 'row', justifyContent: 'space-around' },
                  dimensions.width
                )}
              >
                <Checkbox
                  onPress={newCheckboxValue => {
                    const checkboxValue = newCheckboxValue;
                    try {
                      setMaskvalue(newCheckboxValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  checkedIcon={'AntDesign/eye'}
                  color={palettes.Neutral[500]}
                  status={Maskvalue}
                  style={StyleSheet.applyWidth(
                    { position: 'absolute', right: 10, top: 8, zIndex: 99 },
                    dimensions.width
                  )}
                  uncheckedIcon={'Entypo/eye-with-line'}
                />
                {/* Password Input */}
                <TextInput
                  autoCapitalize={'none'}
                  autoCorrect={true}
                  changeTextDelay={500}
                  onChangeText={newPasswordInputValue => {
                    try {
                      setPassinpt(newPasswordInputValue);
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  webShowOutline={true}
                  {...GlobalStyles.TextInputStyles(theme)['Input-style'].props}
                  placeholder={'PASSWORD'}
                  secureTextEntry={Boolean(Maskvalue !== true)}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextInputStyles(theme)['Input-style'].style,
                      {
                        alignSelf: 'auto',
                        borderColor: 'rgb(0, 0, 0)',
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 16,
                        letterSpacing: -0.5,
                        paddingBottom: 8,
                        paddingRight: 8,
                        paddingTop: 8,
                        width: 341,
                      }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* ForgotPass */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(171, 141, 197)',
                      flex: 1,
                      fontFamily: 'DMSans_700Bold',
                      marginTop: 15,
                      textDecorationLine: 'none',
                    }
                  ),
                  dimensions.width
                )}
              >
                {' '}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.navigate('AuthStack', {
                        screen: 'AuthForgotPasswordScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectable={false}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        alignSelf: 'flex-end',
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 12,
                        lineHeight: 16,
                        marginTop: 12,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'FORGOT PASSWORD?'}
                />
              </Text>
              {/* NotUCBerkStud */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      alignSelf: 'flex-end',
                      color: 'rgb(171, 141, 197)',
                      flex: 1,
                      fontFamily: 'DMSans_700Bold',
                      marginTop: 5,
                    }
                  ),
                  dimensions.width
                )}
              >
                {' '}
                <Link
                  accessible={true}
                  onPress={() => {
                    try {
                      navigation.navigate('RegistationStack', {
                        screen: 'RegistrationNotifyFlowScreen',
                      });
                    } catch (err) {
                      console.error(err);
                    }
                  }}
                  selectable={false}
                  {...GlobalStyles.LinkStyles(theme)['Link'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.LinkStyles(theme)['Link'].style,
                      {
                        alignSelf: 'flex-end',
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 12,
                        lineHeight: 16,
                        marginTop: 12,
                      }
                    ),
                    dimensions.width
                  )}
                  title={'NOT A UC BERKELEY STUDENT?'}
                />
              </Text>
              {/* Spacer 4 */}
              <Spacer bottom={0} left={8} right={8} top={60} />
              {/* View - Incorrect */}
              <>
                {!isIncorrect ? null : (
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
                      {'INCORRECT EMAIL OR PASSWORD'}
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
                    marginBottom: -55,
                    marginLeft: 3,
                    width: 341,
                    zIndex: 0,
                  },
                  dimensions.width
                )}
              />
              {/* Log-in button */}
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
                      const returnLogin = (
                        await AuthenticationApi.loginPOST(Constants, {
                          email: emailinpt,
                          password: passinpt,
                        })
                      )?.json;
                      if (returnLogin?.user?.id >= 1) {
                        setGlobalVariableValue({
                          key: 'USER_ID',
                          value: returnLogin?.user?.id,
                        });
                        setGlobalVariableValue({
                          key: 'AUTHORIZATION_TOKEN',
                          value: returnLogin?.authToken,
                        });
                        setGlobalVariableValue({
                          key: 'isLoading',
                          value: false,
                        });
                        if (returnLogin?.user?.status === 'SORTING') {
                          navigation.navigate('OnboardingStack', {
                            screen: 'OnboardingPendingApplicationScreen',
                          });
                        } else {
                          navigation.navigate('HomescreenHomeScreen');
                        }
                      } else {
                        setIsIncorrect(true);
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
                {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                    {
                      backgroundColor: 'rgb(233, 238, 168)',
                      borderColor: 'rgb(0, 0, 0)',
                      borderWidth: 1,
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 20,
                      height: 52,
                      lineHeight: 26,
                      width: 341,
                    }
                  ),
                  dimensions.width
                )}
                title={'LOG-IN'}
              />
            </View>
          </View>
        </SimpleStyleKeyboardAwareScrollView>
      </ImageBackground>
      <>{!(Constants['isLoading'] === true) ? null : <ProgressFormBlock />}</>
    </ScreenContainer>
  );
};

export default withTheme(AuthBerkeleyLoginScreen);
