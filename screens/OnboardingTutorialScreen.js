import React from 'react';
import {
  Button,
  Checkbox,
  ExpoImage,
  LinearProgress,
  PinInput,
  ScreenContainer,
  SimpleStyleKeyboardAwareScrollView,
  Spacer,
  Swiper,
  SwiperItem,
  TextInput,
  withTheme,
} from '@draftbit/ui';
import { ImageBackground, Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as AuthenticationApi from '../apis/AuthenticationApi.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import isValidEmail from '../global-functions/isValidEmail';
import isValidPassword from '../global-functions/isValidPassword';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const OnboardingTutorialScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [AdventureIndex, setAdventureIndex] = React.useState(-1);
  const [EmailInp, setEmailInp] = React.useState('');
  const [MaskValueConf, setMaskValueConf] = React.useState(false);
  const [MaskvaluePass, setMaskvaluePass] = React.useState(false);
  const [PasswordInp, setPasswordInp] = React.useState('');
  const [PrefIndex, setPrefIndex] = React.useState(-1);
  const [PreferredName, setPreferredName] = React.useState('');
  const [VerificationNum, setVerificationNum] = React.useState(0);
  const [confirmPassInp, setConfirmPassInp] = React.useState('');
  const [favStudyIndex, setFavStudyIndex] = React.useState(-1);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isErrorConfirmPass, setIsErrorConfirmPass] = React.useState(false);
  const [isErrorEmailExist, setIsErrorEmailExist] = React.useState(false);
  const [isErrorEmailInvalid, setIsErrorEmailInvalid] = React.useState(false);
  const [isErrorName, setIsErrorName] = React.useState(false);
  const [isErrorPassInvalid, setIsErrorPassInvalid] = React.useState(false);
  const [isErrorVerification, setIsErrorVerification] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPreferredName, setIsPreferredName] = React.useState(false);
  const [isVerification, setIsVerification] = React.useState(false);
  const [socialBatteryIndex, setSocialBatteryIndex] = React.useState(-1);
  const imageBackgroundSwiperRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        { justifyContent: 'center' },
        dimensions.width
      )}
    >
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['grid'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { justifyContent: 'flex-start' }
          ),
          dimensions.width
        )}
      >
        <Swiper
          dotActiveColor={theme.colors.branding.primary}
          dotColor={theme.colors.text.light}
          hideDots={false}
          loop={false}
          timeout={0}
          vertical={false}
          {...GlobalStyles.SwiperStyles(theme)['Swiper'].props}
          dotsTouchable={false}
          from={0}
          minDistanceForAction={100000}
          minDistanceToCapture={100000}
          ref={imageBackgroundSwiperRef}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.SwiperStyles(theme)['Swiper'].style,
              { height: '100%' }
            ),
            dimensions.width
          )}
        >
          {/* SwipItemStep1 */}
          <SwiperItem
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 0,
                gap: 0,
                justifyContent: 'flex-start',
                paddingBottom: 0,
              },
              dimensions.width
            )}
          >
            {/* Shoutout1 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  alignSelf: 'auto',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 0,
                  paddingTop: 40,
                },
                dimensions.width
              )}
            >
              {/* View - Linear Progress */}
              <>
                {!25 ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 4,
                        borderWidth: 1,
                        height: 15,
                        marginTop: 45,
                        maxHeight: 15,
                        minHeight: 15,
                        overflow: 'hidden',
                        width: '90%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearProgress
                      animationDuration={500}
                      indeterminate={false}
                      isAnimated={true}
                      showTrack={true}
                      {...GlobalStyles.LinearProgressStyles(theme)[
                        'Linear Progress'
                      ].props}
                      color={palettes.App.Yellow_primary}
                      lineCap={'square'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinearProgressStyles(theme)[
                            'Linear Progress'
                          ].style,
                          { height: 13, overflow: 'hidden' }
                        ),
                        dimensions.width
                      )}
                      thickness={25}
                      trackColor={palettes.App.White}
                      trackLineCap={'round'}
                      value={20}
                    />
                  </View>
                )}
              </>
              {/* View - Title */}
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
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 24,
                        letterSpacing: -0.5,
                        marginBottom: 20,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'SHOUTOUTS ARE MEET-UPS \nFOR RIGHT NOW'}
                </Text>
              </View>
              {/* View - Card */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    backgroundColor: 'rgb(255, 255, 255)',
                    borderRadius: 10,
                    borderWidth: 1,
                    flexWrap: 'nowrap',
                    height: 212,
                    marginBottom: 37,
                    width: 222,
                  },
                  dimensions.width
                )}
              >
                {/* Thumb */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      height: 41,
                      justifyContent: 'center',
                      left: 132,
                      position: 'absolute',
                      top: 31,
                      width: 35,
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
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    resizeMode={'contain'}
                    source={imageSource(Images['greenthumb'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 29, marginBottom: -5, width: 29 }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          color: 'rgba(0, 190, 51, 0.7)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 8,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'3+ going\n'}
                  </Text>
                </View>
                {/* Cancel */}
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .props}
                  resizeMode={'contain'}
                  source={imageSource(Images['group3'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                        .style,
                      {
                        height: 13,
                        left: 160,
                        position: 'absolute',
                        top: 10,
                        width: 13,
                      }
                    ),
                    dimensions.width
                  )}
                />
                {/* Happening Now */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: 'rgb(224, 237, 195)',
                      borderRadius: 15,
                      flexDirection: 'row',
                      height: 19,
                      justifyContent: 'space-evenly',
                      left: 15,
                      position: 'absolute',
                      top: 13,
                      width: 105,
                    },
                    dimensions.width
                  )}
                >
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    source={imageSource(Images['vector(4)'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 9, marginLeft: 2, width: 9 }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          alignSelf: 'center',
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 10,
                          marginBottom: 7,
                          marginRight: 6,
                          paddingBottom: 20,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Happening Now'}
                  </Text>
                </View>
                {/* View - Name */}
                <View
                  style={StyleSheet.applyWidth(
                    { left: 55, position: 'absolute', top: 38 },
                    dimensions.width
                  )}
                >
                  {/* Text - name */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          color: 'rgba(53, 48, 61, 0.8)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 12,
                          marginBottom: 0,
                          paddingBottom: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Hannah'}
                  </Text>
                  {/* Text - time */}
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          color: 'rgba(53, 48, 61, 0.8)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 9,
                          marginTop: -12,
                          paddingTop: 0,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'21 min ago'}
                  </Text>
                </View>
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
                  source={imageSource(Images['shoutoutavatar'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                        .style,
                      {
                        height: 33,
                        left: 15,
                        position: 'absolute',
                        top: 40,
                        width: 33,
                      }
                    ),
                    dimensions.width
                  )}
                />
                {/* View - Main bubble */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      justifyContent: 'center',
                      left: 15,
                      padding: 20,
                      paddingBottom: 40,
                      position: 'absolute',
                      top: 55,
                    },
                    dimensions.width
                  )}
                >
                  {/* Image 2 */}
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    resizeMode={'contain'}
                    source={imageSource(Images['union'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 66, position: 'absolute', width: 152 }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          alignSelf: 'auto',
                          color: palettes.Neutral[800],
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 14,
                          marginTop: 30,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {"let's grab coffee!"}
                  </Text>
                </View>
                {/* View - Place Time */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      flexDirection: 'row',
                      left: 15,
                      position: 'absolute',
                      top: 150,
                    },
                    dimensions.width
                  )}
                >
                  {/* Box Border */}
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    source={imageSource(Images['group6'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 24, position: 'absolute', width: 153 }
                      ),
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
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    source={imageSource(Images['vector(3)'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 12, marginLeft: 5, width: 12 }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          color: 'rgba(53, 48, 61, 0.8)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 10,
                          marginLeft: 5,
                          marginRight: 35,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'11am'}
                  </Text>
                  {/* Image 3 */}
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    source={imageSource(Images['vector(2)'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 11, width: 8 }
                      ),
                      dimensions.width
                    )}
                  />
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
                          color: 'rgba(53, 48, 61, 0.8)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 10,
                          marginLeft: 5,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Glade'}
                  </Text>
                </View>
                {/* View - Send a Chat */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: 'rgb(238, 238, 238)',
                      borderRadius: 30,
                      flexDirection: 'row',
                      height: 24,
                      justifyContent: 'center',
                      left: 15,
                      position: 'absolute',
                      top: 180,
                      width: 126,
                    },
                    dimensions.width
                  )}
                >
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    source={imageSource(Images['vector(5)'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 8, marginRight: 10, width: 8 }
                      ),
                      dimensions.width
                    )}
                  />
                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text 2'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text 2'].style,
                        theme.typography.body1,
                        {
                          color: 'rgba(53, 48, 61, 0.8)',
                          fontFamily: 'DMSans_400Regular',
                          fontSize: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Send a chat'}
                  </Text>
                </View>
                {/* View - Send Icon */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor: 'rgb(238, 238, 238)',
                      borderRadius: 30,
                      flexDirection: 'row',
                      height: 24,
                      justifyContent: 'center',
                      left: 145,
                      position: 'absolute',
                      top: 180,
                      width: 24,
                    },
                    dimensions.width
                  )}
                >
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 11'
                    ].props}
                    source={imageSource(Images['vector(1)'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 8, width: 8 }
                      ),
                      dimensions.width
                    )}
                  />
                </View>
              </View>
              {/* View - Text */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    marginBottom: 80,
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
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
                        letterSpacing: 0,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'INVITE QUILLY GIRLS FOR A COFFEE BREAK, SPONTANEOUS COSTCO RUN, OR SOME COMPANY ON A WALK HOME!'
                  }
                </Text>
              </View>
              {/* View - Button */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingLeft: 25,
                    paddingRight: 25,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <View>
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        navigation.goBack();
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
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'BACK'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Continue Button */}
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipeNext();
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
                          backgroundColor: palettes.App.Yellow_primary,
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'NEXT'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
          </SwiperItem>
          {/* SwipItemStep2 */}
          <SwiperItem
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 0,
                gap: 0,
                justifyContent: 'flex-start',
                paddingBottom: 0,
              },
              dimensions.width
            )}
          >
            {/* Hangout1 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  alignSelf: 'auto',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 0,
                  paddingTop: 40,
                },
                dimensions.width
              )}
            >
              {/* View - Linear Progress */}
              <>
                {!25 ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 4,
                        borderWidth: 1,
                        height: 15,
                        marginTop: 45,
                        maxHeight: 15,
                        minHeight: 15,
                        overflow: 'hidden',
                        width: '90%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearProgress
                      animationDuration={500}
                      indeterminate={false}
                      isAnimated={true}
                      showTrack={true}
                      {...GlobalStyles.LinearProgressStyles(theme)[
                        'Linear Progress'
                      ].props}
                      color={palettes.App.Yellow_primary}
                      lineCap={'square'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinearProgressStyles(theme)[
                            'Linear Progress'
                          ].style,
                          { height: 13, overflow: 'hidden' }
                        ),
                        dimensions.width
                      )}
                      thickness={25}
                      trackColor={palettes.App.White}
                      trackLineCap={'round'}
                      value={50}
                    />
                  </View>
                )}
              </>
              {/* View - Title */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 35,
                    marginTop: 70,
                    position: 'relative',
                  },
                  dimensions.width
                )}
              >
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
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 24,
                        letterSpacing: -0.5,
                        marginBottom: 20,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'HANGOUT ARE \nEVENTS FOR LATER.'}
                </Text>
              </View>
              {/* View - Image */}
              <View>
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .props}
                  resizeMode={'contain'}
                  source={imageSource(Images['hangoutexpandedcard'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                        .style,
                      { height: 250, width: 260 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* View - Text 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    marginBottom: 60,
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
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
                        letterSpacing: 0,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'WHETHER IT’S A CONCERT OR AN ART CLASS, QUILLY GIRLS ARE THERE TO JOIN OR FIND GIRLS READY TO JOIN IN THE FUN!'
                  }
                </Text>
              </View>
              {/* View - Button */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingLeft: 25,
                    paddingRight: 25,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <View>
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipePrev();
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
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'BACK'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Continue Button */}
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipeNext();
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
                          backgroundColor: palettes.App.Yellow_primary,
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'NEXT'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
          </SwiperItem>
          {/* SwipItemStep3 */}
          <SwiperItem
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 0,
                gap: 0,
                justifyContent: 'flex-start',
                paddingBottom: 0,
              },
              dimensions.width
            )}
          >
            {/* Hangout1 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  alignSelf: 'auto',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 0,
                  paddingTop: 40,
                },
                dimensions.width
              )}
            >
              {/* View - Linear Progress */}
              <>
                {!25 ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 4,
                        borderWidth: 1,
                        height: 15,
                        marginTop: 45,
                        maxHeight: 15,
                        minHeight: 15,
                        overflow: 'hidden',
                        width: '90%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearProgress
                      animationDuration={500}
                      indeterminate={false}
                      isAnimated={true}
                      showTrack={true}
                      {...GlobalStyles.LinearProgressStyles(theme)[
                        'Linear Progress'
                      ].props}
                      color={palettes.App.Yellow_primary}
                      lineCap={'square'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinearProgressStyles(theme)[
                            'Linear Progress'
                          ].style,
                          { height: 13, overflow: 'hidden' }
                        ),
                        dimensions.width
                      )}
                      thickness={25}
                      trackColor={palettes.App.White}
                      trackLineCap={'round'}
                      value={75}
                    />
                  </View>
                )}
              </>
              {/* View - Title */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 15,
                    marginTop: 50,
                    position: 'relative',
                  },
                  dimensions.width
                )}
              >
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
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 24,
                        letterSpacing: -0.5,
                        marginBottom: 20,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'EARN HOUSE POINT AND\nUNLOCK KEYS!'}
                </Text>
              </View>
              {/* View - Image */}
              <View>
                <ExpoImage
                  allowDownscaling={true}
                  cachePolicy={'disk'}
                  contentPosition={'center'}
                  transitionDuration={300}
                  transitionEffect={'cross-dissolve'}
                  transitionTiming={'ease-in-out'}
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .props}
                  resizeMode={'contain'}
                  source={imageSource(Images['simplifiedprofilepoints'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                        .style,
                      { height: 371, width: 271 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* View - Text 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    marginBottom: 30,
                    marginTop: 20,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
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
                        letterSpacing: 0,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'MORE POINTS = AWESOME BADGES AND \nSWAG WAITING FOR YOU!'}
                </Text>
              </View>
              {/* View - Button */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingLeft: 25,
                    paddingRight: 25,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <View>
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipePrev();
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
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'BACK'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Continue Button */}
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipeNext();
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
                          backgroundColor: palettes.App.Yellow_primary,
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'NEXT'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
          </SwiperItem>
          {/* SwipItemStep4 */}
          <SwiperItem
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                borderBottomWidth: 0,
                gap: 0,
                justifyContent: 'flex-start',
                paddingBottom: 0,
              },
              dimensions.width
            )}
          >
            {/* Hangout1 */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignContent: 'flex-start',
                  alignItems: 'center',
                  alignSelf: 'auto',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  marginTop: 0,
                  paddingTop: 40,
                },
                dimensions.width
              )}
            >
              {/* View - Linear Progress */}
              <>
                {!25 ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 4,
                        borderWidth: 1,
                        height: 15,
                        marginTop: 45,
                        maxHeight: 15,
                        minHeight: 15,
                        overflow: 'hidden',
                        width: '90%',
                      },
                      dimensions.width
                    )}
                  >
                    <LinearProgress
                      animationDuration={500}
                      indeterminate={false}
                      isAnimated={true}
                      showTrack={true}
                      {...GlobalStyles.LinearProgressStyles(theme)[
                        'Linear Progress'
                      ].props}
                      color={palettes.App.Yellow_primary}
                      lineCap={'square'}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.LinearProgressStyles(theme)[
                            'Linear Progress'
                          ].style,
                          { height: 13, overflow: 'hidden' }
                        ),
                        dimensions.width
                      )}
                      thickness={25}
                      trackColor={palettes.App.White}
                      trackLineCap={'round'}
                      value={100}
                    />
                  </View>
                )}
              </>
              {/* View - Image */}
              <View
                style={StyleSheet.applyWidth(
                  { marginTop: 100 },
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
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .props}
                  resizeMode={'contain'}
                  source={imageSource(Images['hands41'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                        .style,
                      { height: 128, width: 160 }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* View - Title */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 15,
                    marginTop: 20,
                    position: 'relative',
                  },
                  dimensions.width
                )}
              >
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
                        color: 'rgb(0, 0, 0)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 24,
                        letterSpacing: -0.5,
                        marginBottom: 20,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'NICE!'}
                </Text>
              </View>
              {/* View - Text 2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    marginBottom: 220,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
                  dimensions.width
                )}
              >
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
                        letterSpacing: 0,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'YOU’RE DONE WITH THE TUTORIAL! \nLET’S HEAD IN :)'}
                </Text>
              </View>
              {/* View - Button */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 20,
                    paddingLeft: 25,
                    paddingRight: 25,
                    width: '100%',
                  },
                  dimensions.width
                )}
              >
                {/* Back Button */}
                <View>
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipePrev();
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
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'BACK'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
                {/* Continue Button */}
                <View
                  style={StyleSheet.applyWidth(
                    { justifyContent: 'center' },
                    dimensions.width
                  )}
                >
                  <Button
                    accessible={true}
                    iconPosition={'left'}
                    onPress={() => {
                      try {
                        imageBackgroundSwiperRef.current?.swipeNext();
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
                          backgroundColor: palettes.App.Yellow_primary,
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 52,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 111,
                          zIndex: 99,
                        }
                      ),
                      dimensions.width
                    )}
                    title={'NEXT'}
                  />
                  {/* View 2 */}
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        backgroundColor: 'rgb(0, 0, 0)',
                        borderRadius: 8,
                        height: 52,
                        marginLeft: 4,
                        width: 111,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
          </SwiperItem>
        </Swiper>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingTutorialScreen);
