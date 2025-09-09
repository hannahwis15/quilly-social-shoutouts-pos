import React from 'react';
import {
  Button,
  ExpoImage,
  IconButton,
  ScreenContainer,
  SimpleStyleScrollView,
  Spacer,
  TextInput,
  withTheme,
} from '@draftbit/ui';
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

const OnboardingPledgeScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [EmailInp, setEmailInp] = React.useState('');
  const [Pass, setPass] = React.useState('');
  const [confirmPass, setConfirmPass] = React.useState('');
  const [isErrorName, setIsErrorName] = React.useState(false);
  const [nameInput, setNameInput] = React.useState('');
  const [sign_name, setSign_name] = React.useState(false);
  const [signedCondition, setSignedCondition] = React.useState(false);

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <ImageBackground
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        resizeMode={'cover'}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { justifyContent: 'flex-start', width: '100%' }
          ),
          dimensions.width
        )}
      >
        {/* Top */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', marginBottom: 20, marginTop: 115 },
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
                fontSize: 24,
                letterSpacing: -1,
                lineHeight: 28,
                marginTop: 25,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {"HERE'S OUR QUILLY \nGIRL PLEDGE."}
          </Text>
          {/* Image 2 */}
          <Image
            resizeMode={'cover'}
            {...GlobalStyles.ImageStyles(theme)['Image'].props}
            source={imageSource(Images['feather212'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageStyles(theme)['Image'].style,
                {
                  height: 56,
                  left: 232,
                  position: 'absolute',
                  top: 56,
                  width: 89,
                }
              ),
              dimensions.width
            )}
          />
        </View>

        <SimpleStyleScrollView
          bounces={true}
          horizontal={false}
          nestedScrollEnabled={false}
          keyboardShouldPersistTaps={'always'}
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={StyleSheet.applyWidth(
            {
              alignItems: 'flex-start',
              borderColor: palettes.Neutral[800],
              borderRadius: 15,
              borderWidth: 1,
              flexDirection: 'row',
              height: 430,
              justifyContent: 'space-between',
              marginLeft: 30,
              marginTop: 35,
              padding: 5,
              position: 'relative',
              width: 340,
            },
            dimensions.width
          )}
        >
          {/* View - Pledge */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'flex-start',
                flexDirection: 'column',
                marginLeft: 35,
              },
              dimensions.width
            )}
          >
            {/* View - First Line */}
            <>
              {!(signedCondition === false) ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-end',
                      flexDirection: 'row',
                      marginTop: 10,
                    },
                    dimensions.width
                  )}
                >
                  {/* Text Before Blank Line */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.Neutral[800],
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 21,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'I, '}
                  </Text>
                  {/* View - Blank Line */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        height: 1,
                        marginBottom: 5,
                        marginLeft: 2,
                        marginRight: 2,
                        width: 75,
                      },
                      dimensions.width
                    )}
                  />
                  {/* Text After Blank Line */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.Neutral[800],
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 21,
                          marginLeft: 2,
                          textDecorationLine: 'none',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {' pledge always to'}
                  </Text>
                </View>
              )}
            </>
            {/* View - Paragraph */}
            <>
              {!(signedCondition === false) ? null : (
                <View>
                  {/* Text 4 */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        {
                          color: palettes.Neutral[800],
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 21,
                          textDecorationLine: 'none',
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'be inclusive and empathetic. As a Quilly girl, I’m all in for making real friendships. I’ll be honest and authentic—no gossip or drama. I’ll cheer on my friends—without competing or undermining. I’ll be there for my Quilly girls, through thick and thin. I promise to bring my best energy to our activities, and be a reliable, involved member of our community. Above all else, I... am here to support others as I wish to be supported.'
                    }
                  </Text>
                </View>
              )}
            </>
            {/* Text Name */}
            <>
              {!signedCondition ? null : (
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      {
                        color: palettes.Neutral[800],
                        fontFamily: 'DMSans_400Regular',
                        fontSize: 21,
                        marginLeft: 2,
                        textDecorationLine: 'none',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'I, '}
                  {nameInput}
                  {
                    ', pledge always to be inclusive and empathetic. As a Quilly girl, I’m all in for making real friendships. I’ll be honest and authentic—no gossip or drama. I’ll cheer on my friends—without competing or undermining. I’ll be there for my Quilly girls, through thick and thin. I promise to bring my best energy to our activities, and be a reliable, involved member of our community. Above all else, I... am here to support others as I wish to be supported.'
                  }
                </Text>
              )}
            </>
          </View>
        </SimpleStyleScrollView>
        {/* View - Continue */}
        <>
          {!(signedCondition === false) ? null : (
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', marginTop: 55 },
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
                    setSign_name(true);
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
                title={'CONTINUE'}
              />
            </View>
          )}
        </>
        {/* View - Finish */}
        <>
          {!signedCondition ? null : (
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', marginTop: 25 },
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
                      screen: 'OnboardingPendingApplicationScreen',
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
                title={'FINISH'}
              />
            </View>
          )}
        </>
        {/* View -Gray Background */}
        <>
          {!sign_name ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  height: '100%',
                  position: 'absolute',
                  width: '100%',
                  zIndex: 30,
                },
                dimensions.width
              )}
            />
          )}
        </>
        {/* Pop up */}
        <>
          {!sign_name ? null : (
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  backgroundColor: theme.colors.background.base,
                  borderColor: palettes.Neutral[300],
                  borderRadius: 10,
                  borderWidth: 2,
                  left: 28,
                  opacity: 1,
                  paddingBottom: 30,
                  paddingTop: 10,
                  position: 'absolute',
                  top: 319,
                  width: 349,
                  zIndex: 50,
                },
                dimensions.width
              )}
            >
              {/* Cancel Button */}
              <IconButton
                onPress={() => {
                  try {
                    setSign_name(false);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                color={palettes.App.black_primary}
                icon={'Feather/x'}
                size={28}
                style={StyleSheet.applyWidth(
                  { left: 12, position: 'absolute', top: 8 },
                  dimensions.width
                )}
              />
              {/* Send Button */}
              <IconButton
                onPress={() => {
                  try {
                    if (nameInput?.length > 2) {
                      setIsErrorName(false);
                      setSign_name(false);
                      setSignedCondition(true);
                    } else {
                      setIsErrorName(true);
                    }
                  } catch (err) {
                    console.error(err);
                  }
                }}
                color={palettes.App.black_primary}
                icon={'Ionicons/send-sharp'}
                size={28}
                style={StyleSheet.applyWidth(
                  { bottom: 38, position: 'absolute', right: 35, zIndex: 99 },
                  dimensions.width
                )}
              />
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    {
                      alignSelf: 'center',
                      color: palettes.Neutral[800],
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 18,
                      letterSpacing: -0.5,
                      marginLeft: 17,
                      marginRight: 15,
                      marginTop: 25,
                      textAlign: 'left',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'ALMOST DONE! SIGN YOUR \nNAME TO BECOME A QUILLY \nGIRL.'}
              </Text>
              <TextInput
                autoCapitalize={'none'}
                autoCorrect={true}
                changeTextDelay={500}
                onChangeText={newTextInputValue => {
                  try {
                    setNameInput(newTextInputValue);
                  } catch (err) {
                    console.error(err);
                  }
                }}
                webShowOutline={true}
                {...GlobalStyles.TextInputStyles(theme)['Text Input'].props}
                placeholder={'ENTER NAME HERE'}
                placeholderTextColor={theme.colors.text.medium}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextInputStyles(theme)['Text Input'].style,
                    {
                      alignSelf: 'flex-start',
                      borderColor: 'rgb(0, 0, 0)',
                      borderLeftWidth: 0,
                      borderRadius: null,
                      borderRightWidth: 0,
                      borderTopWidth: 0,
                      color: theme.colors.text.medium,
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 18,
                      marginLeft: 40,
                      marginRight: 17,
                      marginTop: 25,
                      width: '80%',
                    }
                  ),
                  dimensions.width
                )}
                underlineColorAndroid={palettes.App.black_primary}
                value={nameInput}
              />
              {/* View - Incorrect - length */}
              <>
                {!isErrorName ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgba(255, 101, 73, 0.4)',
                        borderRadius: 8,
                        height: 32,
                        marginTop: 15,
                        width: 280,
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
                            color: 'rgb(199, 30, 0)',
                            fontFamily: 'DMSans_400Regular',
                            fontSize: 12,
                            lineHeight: 16,
                          }
                        ),
                        dimensions.width
                      )}
                    >
                      {'Please enter a name with at least 3 characters.'}
                    </Text>
                  </View>
                )}
              </>
            </View>
          )}
        </>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingPledgeScreen);
