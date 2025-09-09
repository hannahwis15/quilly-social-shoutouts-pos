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
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthenticationApi from '../apis/AuthenticationApi.js';
import ProgressFormBlock from '../components/ProgressFormBlock';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import isValidPassword from '../global-functions/isValidPassword';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const ForgotResetPasswordScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [EmailInp, setEmailInp] = React.useState('');
  const [MaskValueConfirm, setMaskValueConfirm] = React.useState(true);
  const [Maskvalue, setMaskvalue] = React.useState(false);
  const [MaskvaluePass, setMaskvaluePass] = React.useState(true);
  const [Pass, setPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [emailinpt, setEmailinpt] = React.useState({});
  const [isEmailSent, setIsEmailSent] = React.useState(false);
  const [isErrorEmailDNE, setIsErrorEmailDNE] = React.useState(false);
  const [isErrorEmailFormat, setIsErrorEmailFormat] = React.useState(false);
  const [isErrorInvalid, setIsErrorInvalid] = React.useState(false);
  const [isErrorNotEqual, setIsErrorNotEqual] = React.useState(false);
  const [isIncorrect, setIsIncorrect] = React.useState(false);
  const [isResetDone, setIsResetDone] = React.useState(false);
  const [passinpt, setPassinpt] = React.useState({});
  const [checkboxValue, setCheckboxValue] = React.useState(false);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { alignSelf: { minWidth: Breakpoints.Laptop, value: 'auto' } },
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
            { justifyContent: 'flex-start', paddingTop: 60 }
          ),
          dimensions.width
        )}
      >
        <>
          {!(isResetDone === false) ? null : (
            <SimpleStyleKeyboardAwareScrollView
              enableOnAndroid={false}
              enableResetScrollToCoords={false}
              keyboardShouldPersistTaps={'never'}
              showsVerticalScrollIndicator={true}
              viewIsInsideTabBar={false}
              enableAutomaticScroll={true}
              style={StyleSheet.applyWidth(
                { alignSelf: 'center', flex: 1, justifyContent: 'flex-start' },
                dimensions.width
              )}
            >
              {/* View - Reset Password */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'flex-end',
                    alignSelf: 'auto',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingTop: 45,
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
                      marginBottom: 45,
                      marginTop: 40,
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
                          height: 52,
                          marginBottom: 20,
                          marginTop: -60,
                          position: 'relative',
                          width: 297,
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
                    {'RESET YOUR PASSWORD'}
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
                          textAlign: 'center',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'CHECK YOUR EMAIL FOR INSTRUCTION ON \nWHAT TO DO!'}
                  </Text>
                </View>
                {/* View - Form */}
                <View
                  style={StyleSheet.applyWidth(
                    { width: 341 },
                    dimensions.width
                  )}
                >
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
                  {/* View - Password Input */}
                  <View
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', justifyContent: 'space-around' },
                      dimensions.width
                    )}
                  >
                    {/* Password Input */}
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={true}
                      changeTextDelay={500}
                      onChangeText={newPasswordInputValue => {
                        try {
                          setPass(newPasswordInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      {...GlobalStyles.TextInputStyles(theme)['Input-style']
                        .props}
                      keyboardType={'email-address'}
                      placeholder={'YOUR NEW PASSWORD'}
                      secureTextEntry={Boolean(MaskvaluePass)}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Input-style']
                            .style,
                          {
                            alignSelf: 'auto',
                            borderColor: 'rgb(0, 0, 0)',
                            color: 'rgb(0, 0, 0)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0.5,
                            paddingBottom: 8,
                            paddingRight: 8,
                            paddingTop: 12,
                            width: 341,
                          }
                        ),
                        dimensions.width
                      )}
                      textContentType={'emailAddress'}
                      value={Pass}
                    />
                    <Checkbox
                      onPress={newCheckboxValue => {
                        try {
                          setMaskvaluePass(newCheckboxValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      checkedIcon={'Entypo/eye-with-line'}
                      status={MaskvaluePass}
                      style={StyleSheet.applyWidth(
                        { position: 'absolute', right: 10, top: 15 },
                        dimensions.width
                      )}
                      uncheckedColor={palettes.Neutral[500]}
                      uncheckedIcon={'AntDesign/eye'}
                    />
                  </View>
                  {/* Spacer 2 */}
                  <Spacer bottom={8} left={8} right={8} top={8} />
                  {/* Confirm Password Text */}
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
                    {'CONFIRM PASSWORD'}
                  </Text>
                  {/* View - Confirm Password Input */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        marginBottom: 20,
                      },
                      dimensions.width
                    )}
                  >
                    {/* Confirm Password Input */}
                    <TextInput
                      autoCapitalize={'none'}
                      autoCorrect={true}
                      changeTextDelay={500}
                      onChangeText={newConfirmPasswordInputValue => {
                        try {
                          setConfirmPass(newConfirmPasswordInputValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      webShowOutline={true}
                      {...GlobalStyles.TextInputStyles(theme)['Input-style']
                        .props}
                      placeholder={'CONFIRM YOUR PASSWORD'}
                      secureTextEntry={Boolean(MaskValueConfirm)}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.TextInputStyles(theme)['Input-style']
                            .style,
                          {
                            alignSelf: 'auto',
                            borderColor: 'rgb(0, 0, 0)',
                            color: 'rgb(0, 0, 0)',
                            fontFamily: 'DMMono_500Medium',
                            fontSize: 16,
                            letterSpacing: 0.5,
                            paddingBottom: 8,
                            paddingRight: 8,
                            paddingTop: 12,
                            width: 341,
                          }
                        ),
                        dimensions.width
                      )}
                    />
                    <Checkbox
                      onPress={newCheckboxValue => {
                        try {
                          setMaskValueConfirm(newCheckboxValue);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      checkedIcon={'Entypo/eye-with-line'}
                      status={MaskValueConfirm}
                      style={StyleSheet.applyWidth(
                        { position: 'absolute', right: 10, top: 15 },
                        dimensions.width
                      )}
                      uncheckedColor={palettes.Neutral[500]}
                      uncheckedIcon={'AntDesign/eye'}
                    />
                  </View>
                  {/* View - Incorrect - Not Equal */}
                  <>
                    {!isErrorNotEqual ? null : (
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
                          {'PLEASE MAKE SURE BOTH PASSWORDS ARE THE SAME.'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* View - Incorrect - Invalid */}
                  <>
                    {!isErrorInvalid ? null : (
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
                          {'OOPS! USE 8+ CHARACTERS WITH A NUMBER.'}
                        </Text>
                      </View>
                    )}
                  </>
                  {/* Spacer 4 */}
                  <Spacer bottom={100} left={8} right={8} top={100} />
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
                        if (isValidPassword(Pass) === true) {
                          if (Pass === confirmPass) {
                            setIsResetDone(true);
                          } else {
                            setIsErrorInvalid(false);
                            setIsErrorNotEqual(true);
                          }
                        } else {
                          setIsErrorNotEqual(false);
                          setIsErrorInvalid(true);
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
                    title={'CONFIRM'}
                  />
                </View>
              </View>
            </SimpleStyleKeyboardAwareScrollView>
          )}
        </>
        {/* View - Password Reset Done */}
        <>
          {!isResetDone ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  alignSelf: 'auto',
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  paddingLeft: 15,
                  paddingRight: 15,
                  paddingTop: 175,
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
                    marginBottom: 45,
                    marginTop: 40,
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
                        height: 52,
                        marginBottom: 20,
                        marginTop: -60,
                        position: 'relative',
                        width: 297,
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
                  {'PASSWORD RESET'}
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
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'YOU DID IT! CLICK THE BUTTON BELOW\nTO LOG-IN TO YOUR ACCOUNT'
                  }
                </Text>
              </View>
              <Spacer left={8} right={8} bottom={100} top={200} />
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgb(0, 0, 0)',
                    borderRadius: 8,
                    height: 52,
                    marginBottom: -55,
                    marginLeft: 4,
                    width: 341,
                    zIndex: 0,
                  },
                  dimensions.width
                )}
              />
              {/* Login button */}
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
                      setGlobalVariableValue({
                        key: 'isLoading',
                        value: false,
                      });
                      (
                        await AuthenticationApi.updateUserPATCH(Constants, {
                          class_of: 26,
                          password: Pass,
                          user_id: Constants['USER_ID'],
                        })
                      )?.json;
                      navigation.navigate('AuthStack', {
                        screen: 'AuthBerkeleyLoginScreen',
                      });
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
                      borderColor: 'rgb(53, 48, 61)',
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
                title={'LOGIN'}
              />
            </View>
          )}
        </>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(ForgotResetPasswordScreen);
