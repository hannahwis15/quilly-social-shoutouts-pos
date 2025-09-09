import React from 'react';
import {
  Button,
  ExpoImage,
  LinearProgress,
  ScreenContainer,
  SimpleStyleFlatList,
  Swiper,
  SwiperItem,
  Touchable,
  withTheme,
} from '@draftbit/ui';
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
import waitUtil from '../utils/wait';

const OnboardingQuestionnaireScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const [AdventureIndex, setAdventureIndex] = React.useState(-1);
  const [EmailInp, setEmailInp] = React.useState('');
  const [MaskValueConf, setMaskValueConf] = React.useState(false);
  const [MaskValueConfirm, setMaskValueConfirm] = React.useState(false);
  const [MaskvaluePass, setMaskvaluePass] = React.useState(false);
  const [Pass, setPass] = React.useState('');
  const [PasswordInp, setPasswordInp] = React.useState('');
  const [PrefIndex, setPrefIndex] = React.useState(-1);
  const [PreferredName, setPreferredName] = React.useState('');
  const [VerificationNum, setVerificationNum] = React.useState(0);
  const [confirmPass, setConfirmPass] = React.useState('');
  const [confirmPassInp, setConfirmPassInp] = React.useState('');
  const [favStudyIndex, setFavStudyIndex] = React.useState(-1);
  const [isEmail, setIsEmail] = React.useState(false);
  const [isErrorConfirmPass, setIsErrorConfirmPass] = React.useState(false);
  const [isErrorEmailExist, setIsErrorEmailExist] = React.useState(false);
  const [isErrorEmailInvalid, setIsErrorEmailInvalid] = React.useState(false);
  const [isErrorInvalid, setIsErrorInvalid] = React.useState(false);
  const [isErrorName, setIsErrorName] = React.useState(false);
  const [isErrorNotEqual, setIsErrorNotEqual] = React.useState(false);
  const [isErrorPassInvalid, setIsErrorPassInvalid] = React.useState(false);
  const [isErrorVerification, setIsErrorVerification] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);
  const [isPreferredName, setIsPreferredName] = React.useState(false);
  const [isResetDone, setIsResetDone] = React.useState(false);
  const [isVerification, setIsVerification] = React.useState(false);
  const [socialBatteryIndex, setSocialBatteryIndex] = React.useState(-1);
  const swiperRef = React.useRef();

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          justifyContent: 'center',
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 0,
          paddingRight: 0,
        },
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
        ref={swiperRef}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(GlobalStyles.SwiperStyles(theme)['Swiper'].style, {
            height: '100%',
            marginLeft: 0,
            marginRight: 0,
            paddingLeft: -25,
            paddingRight: -25,
          }),
          dimensions.width
        )}
      >
        {/* SwipItemStep1 */}
        <SwiperItem
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              gap: 0,
              justifyContent: 'center',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <ImageBackground
            {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
              .props}
            resizeMode={'cover'}
            source={imageSource(Images['grid'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
                  .style,
                { justifyContent: 'flex-start', paddingTop: 60, width: '100%' }
              ),
              dimensions.width
            )}
          >
            {/* Questionaire2View */}
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
                    marginBottom: 25,
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
                  source={imageSource(Images['bow12'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                      {
                        height: 75,
                        marginBottom: 75,
                        position: 'relative',
                        width: 66,
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
                        letterSpacing: -1,
                        marginBottom: 20,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'HOW ABOUT SOME FUN \nQUESTION TO GET TO KNOW \nYOU A LITTLE BETTER?'
                  }
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
                  {"FIRST UP, LET'S HEAR ABOUT \nYOUR ACTIVITY PREFERENCES!"}
                </Text>
              </View>
              {/* Image 3 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image 19'].props}
                resizeMode={'contain'}
                source={imageSource(Images['poloroids1'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 19'].style,
                    { height: 124, marginBottom: 75, marginTop: 30, width: 206 }
                  ),
                  dimensions.width
                )}
              />
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
                    swiperRef.current?.swipeNext();
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
                title={"LET'S START !"}
              />
            </View>
          </ImageBackground>
        </SwiperItem>
        {/* SwipItemStep2 */}
        <SwiperItem
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgb(255, 207, 214)',
              justifyContent: 'flex-start',
              paddingTop: 60,
            },
            dimensions.width
          )}
        >
          {/* View - Main */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', marginLeft: 25, marginRight: 25 },
              dimensions.width
            )}
          >
            {/* View - Linear Progress 2 */}
            <>
              {!25 ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 4,
                      borderWidth: 1,
                      height: 15,
                      marginTop: 15,
                      maxHeight: 15,
                      minHeight: 15,
                      overflow: 'hidden',
                      width: '100%',
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
            {/* View - Questions */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  alignSelf: 'center',
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
                source={imageSource(Images['face21'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                    {
                      height: 120,
                      marginBottom: 30,
                      marginTop: -15,
                      position: 'relative',
                      width: 205,
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
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 22,
                      letterSpacing: -0.5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'LONG LECTURE JUST ENDED,\nWHAT DO YOU WANT TO DO?'}
              </Text>
            </View>
            {/* View - List */}
            <View
              {...GlobalStyles.ViewStyles(theme)['test'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['test'].style,
                  { alignSelf: 'auto', height: '40%', marginTop: 20 }
                ),
                dimensions.width
              )}
            >
              <SimpleStyleFlatList
                data={[
                  {
                    item: 'RELAXING AT HOME WITH A BOOK OR MOVIE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/4yKNmYVl1HytFvMo8Y1e7',
                  },
                  {
                    item: 'GOING ON A WALK WITH A COUPLE FRIENDS',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/35kaAEKRXZtSy_6upkkOs',
                  },
                  {
                    item: 'GOING TO CONCERT, FESTIVAL, OR PARTY!',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/uXGPznLABS6pB5heczCO4',
                  },
                  {
                    item: 'WORKING OUT, GETTING YOUR SWEAT ON',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/3DFujxOWKMXgI3lPZ22qs',
                  },
                ]}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={JSON.stringify([
                  {
                    item: 'RELAXING AT HOME WITH A BOOK OR MOVIE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/4yKNmYVl1HytFvMo8Y1e7',
                  },
                  {
                    item: 'GOING ON A WALK WITH A COUPLE FRIENDS',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/35kaAEKRXZtSy_6upkkOs',
                  },
                  {
                    item: 'GOING TO CONCERT, FESTIVAL, OR PARTY!',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/uXGPznLABS6pB5heczCO4',
                  },
                  {
                    item: 'WORKING OUT, GETTING YOUR SWEAT ON',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/3DFujxOWKMXgI3lPZ22qs',
                  },
                ])}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          setPrefIndex(index);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: undefined
                              ? palettes.Quilly.Primary
                              : palettes.App.White,
                            borderRadius: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            height: 55,
                            justifyContent: 'flex-start',
                            marginBottom: 7,
                            paddingLeft: 17,
                            paddingRight: 17,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '17%' },
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
                            resizeMode={'contain'}
                            source={imageSource(`${listData?.image}`)}
                            style={StyleSheet.applyWidth(
                              { height: 32, width: 32 },
                              dimensions.width
                            )}
                          />
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '75%' },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: palettes.App.Studily_Dark_Primary,
                                  fontFamily: 'DMMono_500Medium',
                                  fontSize: 16,
                                  letterSpacing: -0.5,
                                  lineHeight: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {listData?.item}
                          </Text>
                        </View>
                      </View>
                    </Touchable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
            </View>
            {/* View - Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 35,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipePrev();
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
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipeNext();
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
                        backgroundColor: palettes.App.Yellow_primary,
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
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
              backgroundColor: 'rgb(202, 205, 255)',
              justifyContent: 'flex-start',
              paddingTop: 60,
            },
            dimensions.width
          )}
        >
          {/* View - Main */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', marginLeft: 25, marginRight: 25 },
              dimensions.width
            )}
          >
            {/* View - Linear Progress 2 */}
            <>
              {!25 ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 4,
                      borderWidth: 1,
                      height: 15,
                      marginTop: 15,
                      maxHeight: 15,
                      minHeight: 15,
                      overflow: 'hidden',
                      width: '100%',
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
                    value={40}
                  />
                </View>
              )}
            </>
            {/* View - Questions */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  alignSelf: 'center',
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
                source={imageSource(Images['camp1'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                    {
                      height: 108,
                      marginBottom: 30,
                      marginTop: -15,
                      position: 'relative',
                      width: 175,
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
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 22,
                      letterSpacing: -0.5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'HOW OPEN ARE YOU TO A NEW ADVENTURE (AS OF RIGHT NOW)?'}
              </Text>
            </View>
            {/* View - List */}
            <View
              {...GlobalStyles.ViewStyles(theme)['test'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['test'].style,
                  { alignSelf: 'auto', height: '40%', marginTop: 20 }
                ),
                dimensions.width
              )}
            >
              <SimpleStyleFlatList
                data={[
                  {
                    item: 'NOT REALLY, I KNOW WHAT I LIKE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/oBrjsHJITrvR7Sn74qBKL',
                  },
                  {
                    item: 'I LIKE EXPLORING WITHIN MY COMFORT ZONE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/5xkW04z8oQSKascXixQy_',
                  },
                  {
                    item: "I'LL TRY SOMETHING ONCE",
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/ShXSr9yiaOMOs2tpMymYd',
                  },
                  {
                    item: 'THE AMAZING RACE CALLED ME',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/R7U3KX8a9LNJUib46HVta',
                  },
                ]}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={JSON.stringify([
                  {
                    item: 'NOT REALLY, I KNOW WHAT I LIKE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/oBrjsHJITrvR7Sn74qBKL',
                  },
                  {
                    item: 'I LIKE EXPLORING WITHIN MY COMFORT ZONE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/5xkW04z8oQSKascXixQy_',
                  },
                  {
                    item: "I'LL TRY SOMETHING ONCE",
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/ShXSr9yiaOMOs2tpMymYd',
                  },
                  {
                    item: 'THE AMAZING RACE CALLED ME',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/R7U3KX8a9LNJUib46HVta',
                  },
                ])}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          setAdventureIndex(index);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: undefined
                              ? palettes.Quilly.Primary
                              : palettes.App.White,
                            borderRadius: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            height: 55,
                            justifyContent: 'flex-start',
                            marginBottom: 7,
                            paddingLeft: 17,
                            paddingRight: 17,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '17%' },
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
                            resizeMode={'contain'}
                            source={imageSource(`${listData?.image}`)}
                            style={StyleSheet.applyWidth(
                              { height: 32, width: 32 },
                              dimensions.width
                            )}
                          />
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '75%' },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: palettes.App.Studily_Dark_Primary,
                                  fontFamily: 'DMMono_500Medium',
                                  fontSize: 16,
                                  letterSpacing: -0.5,
                                  lineHeight: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {listData?.item}
                          </Text>
                        </View>
                      </View>
                    </Touchable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
            </View>
            {/* View - Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 35,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipePrev();
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
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipeNext();
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
                        backgroundColor: palettes.App.Yellow_primary,
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
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
              backgroundColor: 'rgb(229, 207, 255)',
              justifyContent: 'flex-start',
              paddingTop: 60,
            },
            dimensions.width
          )}
        >
          {/* View - Main */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', marginLeft: 25, marginRight: 25 },
              dimensions.width
            )}
          >
            {/* View - Linear Progress 2 */}
            <>
              {!25 ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 4,
                      borderWidth: 1,
                      height: 15,
                      marginTop: 15,
                      maxHeight: 15,
                      minHeight: 15,
                      overflow: 'hidden',
                      width: '100%',
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
                    value={60}
                  />
                </View>
              )}
            </>
            {/* View - Questions */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  alignSelf: 'center',
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
                source={imageSource(Images['camp1'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                    {
                      height: 108,
                      marginBottom: 30,
                      marginTop: -15,
                      position: 'relative',
                      width: 175,
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
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 22,
                      letterSpacing: -0.5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'FAVOURITE PLACE TO STUDY...OR PRETEND TO STUDY?'}
              </Text>
            </View>
            {/* View - List */}
            <View
              {...GlobalStyles.ViewStyles(theme)['test'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['test'].style,
                  { alignSelf: 'auto', height: '40%', marginTop: 20 }
                ),
                dimensions.width
              )}
            >
              <SimpleStyleFlatList
                data={[
                  {
                    item: 'I LIKE TO BE IN MY OWN PRIVATE SPACE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/yAV0V4sUsOGb_qYSUSdxH',
                  },
                  {
                    item: 'A QUIET LIBRARY (WHEN I CAN FIND SEATS)',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/L6pXiIKVlX5cxtmeEyhan',
                  },
                  {
                    item: 'A BUSTLING COFFEE SHOP WITH SOME FRIENDS',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/xMdwY7UQ0RKLwCNC8qjmM',
                  },
                  {
                    item: 'ANYWHERE OUTSIDE WITH FRIENDS',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/xe89QR1h_9gi1jFQZvNAe',
                  },
                ]}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={JSON.stringify([
                  {
                    item: 'I LIKE TO BE IN MY OWN PRIVATE SPACE',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/yAV0V4sUsOGb_qYSUSdxH',
                  },
                  {
                    item: 'A QUIET LIBRARY (WHEN I CAN FIND SEATS)',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/L6pXiIKVlX5cxtmeEyhan',
                  },
                  {
                    item: 'A BUSTLING COFFEE SHOP WITH SOME FRIENDS',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/xMdwY7UQ0RKLwCNC8qjmM',
                  },
                  {
                    item: 'ANYWHERE OUTSIDE WITH FRIENDS',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/xe89QR1h_9gi1jFQZvNAe',
                  },
                ])}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          setFavStudyIndex(index);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: undefined
                              ? palettes.Quilly.Primary
                              : palettes.App.White,
                            borderRadius: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            height: 55,
                            justifyContent: 'flex-start',
                            marginBottom: 7,
                            paddingLeft: 17,
                            paddingRight: 17,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '17%' },
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
                            resizeMode={'contain'}
                            source={imageSource(`${listData?.image}`)}
                            style={StyleSheet.applyWidth(
                              { height: 32, width: 32 },
                              dimensions.width
                            )}
                          />
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '75%' },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: palettes.App.Studily_Dark_Primary,
                                  fontFamily: 'DMMono_500Medium',
                                  fontSize: 16,
                                  letterSpacing: -0.5,
                                  lineHeight: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {listData?.item}
                          </Text>
                        </View>
                      </View>
                    </Touchable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
            </View>
            {/* View - Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 35,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipePrev();
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
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipeNext();
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
                        backgroundColor: palettes.App.Yellow_primary,
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
                      zIndex: 0,
                    },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </View>
        </SwiperItem>
        {/* SwipItemStep5 */}
        <SwiperItem
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgb(253, 184, 128)',
              justifyContent: 'flex-start',
              paddingTop: 60,
            },
            dimensions.width
          )}
        >
          {/* View - Main */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', marginLeft: 25, marginRight: 25 },
              dimensions.width
            )}
          >
            {/* View - Linear Progress 2 */}
            <>
              {!25 ? null : (
                <View
                  style={StyleSheet.applyWidth(
                    {
                      borderRadius: 4,
                      borderWidth: 1,
                      height: 15,
                      marginTop: 15,
                      maxHeight: 15,
                      minHeight: 15,
                      overflow: 'hidden',
                      width: '100%',
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
                    value={80}
                  />
                </View>
              )}
            </>
            {/* View - Questions */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  alignSelf: 'center',
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
                source={imageSource(Images['batt1'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                    {
                      height: 108,
                      marginBottom: 30,
                      marginTop: -15,
                      position: 'relative',
                      width: 175,
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
                      color: 'rgb(0, 0, 0)',
                      fontFamily: 'DMMono_500Medium',
                      fontSize: 22,
                      letterSpacing: -0.5,
                      marginBottom: 10,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'WHAT"S YOUR SOCIAL \nBATTERY LIKE?'}
              </Text>
            </View>
            {/* View - List */}
            <View
              {...GlobalStyles.ViewStyles(theme)['test'].props}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ViewStyles(theme)['test'].style,
                  { alignSelf: 'auto', height: '40%', marginTop: 20 }
                ),
                dimensions.width
              )}
            >
              <SimpleStyleFlatList
                data={[
                  {
                    item: 'PRETTY LOW, I PREFER QUIET NIGHTS AT HOME',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/2AgF-lGQsoLpOlLxngbql',
                  },
                  {
                    item: "IT'S OKAY, I'LL GO WHEN THERE'S SOMETHING SPECIAL",
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/ASLzCWz3uNmCKIBepbNm_',
                  },
                  {
                    item: 'HIGH, I LOVE BEING SOCIAL',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/x5-_e7ZINduyFN3fdFciX',
                  },
                  {
                    item: "ALL TIME HIGH, I'M BASICALLY NEVER HOME",
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/eXM845SOVRRjkkuXaWVSD',
                  },
                ]}
                decelerationRate={'normal'}
                horizontal={false}
                inverted={false}
                keyExtractor={(listData, index) =>
                  listData?.id ??
                  listData?.uuid ??
                  index?.toString() ??
                  JSON.stringify(listData)
                }
                keyboardShouldPersistTaps={'never'}
                listKey={JSON.stringify([
                  {
                    item: 'PRETTY LOW, I PREFER QUIET NIGHTS AT HOME',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/2AgF-lGQsoLpOlLxngbql',
                  },
                  {
                    item: "IT'S OKAY, I'LL GO WHEN THERE'S SOMETHING SPECIAL",
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/ASLzCWz3uNmCKIBepbNm_',
                  },
                  {
                    item: 'HIGH, I LOVE BEING SOCIAL',
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/x5-_e7ZINduyFN3fdFciX',
                  },
                  {
                    item: "ALL TIME HIGH, I'M BASICALLY NEVER HOME",
                    image:
                      'https://assets.draftbit.app/apps/VDrjnmvY/assets/eXM845SOVRRjkkuXaWVSD',
                  },
                ])}
                nestedScrollEnabled={false}
                numColumns={1}
                onEndReachedThreshold={0.5}
                pagingEnabled={false}
                renderItem={({ item, index }) => {
                  const listData = item;
                  return (
                    <Touchable
                      onPress={() => {
                        try {
                          setSocialBatteryIndex(index);
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                    >
                      <View
                        style={StyleSheet.applyWidth(
                          {
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: undefined
                              ? palettes.Quilly.Primary
                              : palettes.App.White,
                            borderRadius: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            height: 55,
                            justifyContent: 'flex-start',
                            marginBottom: 7,
                            paddingLeft: 17,
                            paddingRight: 17,
                            width: '100%',
                          },
                          dimensions.width
                        )}
                      >
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '17%' },
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
                            resizeMode={'contain'}
                            source={imageSource(`${listData?.image}`)}
                            style={StyleSheet.applyWidth(
                              { height: 32, width: 32 },
                              dimensions.width
                            )}
                          />
                        </View>
                        {/* View 2 */}
                        <View
                          style={StyleSheet.applyWidth(
                            { width: '75%' },
                            dimensions.width
                          )}
                        >
                          <Text
                            accessible={true}
                            selectable={false}
                            {...GlobalStyles.TextStyles(theme)['Text'].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.TextStyles(theme)['Text'].style,
                                {
                                  color: palettes.App.Studily_Dark_Primary,
                                  fontFamily: 'DMMono_500Medium',
                                  fontSize: 16,
                                  letterSpacing: -0.5,
                                  lineHeight: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {listData?.item}
                          </Text>
                        </View>
                      </View>
                    </Touchable>
                  );
                }}
                showsHorizontalScrollIndicator={true}
                showsVerticalScrollIndicator={true}
                snapToAlignment={'start'}
              />
            </View>
            {/* View - Button */}
            <View
              style={StyleSheet.applyWidth(
                {
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 35,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipePrev();
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
                        backgroundColor: 'rgb(255, 255, 255)',
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
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
                    const handler = async () => {
                      try {
                        await waitUtil({ milliseconds: 500 });
                        swiperRef.current?.swipeNext();
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
                        backgroundColor: palettes.App.Yellow_primary,
                        borderWidth: 1,
                        color: 'rgb(53, 48, 61)',
                        fontFamily: 'DMMono_500Medium',
                        fontSize: 18,
                        height: 48,
                        lineHeight: 26,
                        marginBottom: -49,
                        marginTop: 20,
                        textAlign: 'auto',
                        width: 98,
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
                      height: 48,
                      marginLeft: 3,
                      marginTop: 4,
                      width: 98,
                      zIndex: 0,
                    },
                    dimensions.width
                  )}
                />
              </View>
            </View>
          </View>
        </SwiperItem>
        {/* SwipItemStep6 */}
        <SwiperItem
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              gap: 0,
              justifyContent: 'center',
              width: '100%',
            },
            dimensions.width
          )}
        >
          <ImageBackground
            {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
              .props}
            resizeMode={'cover'}
            source={imageSource(Images['grid'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ImageBackgroundStyles(theme)['Image Background']
                  .style,
                { justifyContent: 'flex-start', paddingTop: 60, width: '100%' }
              ),
              dimensions.width
            )}
          >
            {/* Questionaire2View */}
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
              {/* View - Linear Progress 2 */}
              <>
                {!25 ? null : (
                  <View
                    style={StyleSheet.applyWidth(
                      {
                        borderRadius: 4,
                        borderWidth: 1,
                        height: 15,
                        marginTop: 15,
                        maxHeight: 15,
                        minHeight: 15,
                        overflow: 'hidden',
                        width: '87%',
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
              {/* View - Questions */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginBottom: 25,
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
                  source={imageSource(Images['note1'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image 38'].style,
                      {
                        height: 130,
                        marginBottom: 35,
                        position: 'relative',
                        width: 133,
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
                        letterSpacing: -1,
                        marginBottom: 20,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {"THANKS GIRL!\nWOW I FEEL LIKE WE'RE\nBESTIES ALREADY."}
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
                        fontSize: 12,
                        letterSpacing: 0,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {
                    'THANKS FOR COMPLETING THE QUESTIONNAIRE!\nWE HAVE JUST ONE LAST THING FOR YOU TO \nDO, AND THEN YOU ARE IN!'
                  }
                </Text>
              </View>
              {/* Image 3 */}
              <ExpoImage
                allowDownscaling={true}
                cachePolicy={'disk'}
                contentPosition={'center'}
                transitionDuration={300}
                transitionEffect={'cross-dissolve'}
                transitionTiming={'ease-in-out'}
                {...GlobalStyles.ExpoImageStyles(theme)['Image 19'].props}
                resizeMode={'contain'}
                source={imageSource(Images['hug1'])}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.ExpoImageStyles(theme)['Image 19'].style,
                    { height: 128, marginBottom: 75, marginTop: 30, width: 115 }
                  ),
                  dimensions.width
                )}
              />
              {/* View - Button */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 35,
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
                      const handler = async () => {
                        try {
                          await waitUtil({ milliseconds: 500 });
                          swiperRef.current?.swipePrev();
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
                          backgroundColor: 'rgb(255, 255, 255)',
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 48,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 98,
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
                        height: 48,
                        marginLeft: 3,
                        marginTop: 4,
                        width: 98,
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
                      const handler = async () => {
                        try {
                          await waitUtil({ milliseconds: 500 });
                          swiperRef.current?.swipeNext();
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
                          backgroundColor: palettes.App.Yellow_primary,
                          borderWidth: 1,
                          color: 'rgb(53, 48, 61)',
                          fontFamily: 'DMMono_500Medium',
                          fontSize: 18,
                          height: 48,
                          lineHeight: 26,
                          marginBottom: -49,
                          marginTop: 20,
                          textAlign: 'auto',
                          width: 98,
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
                        height: 48,
                        marginLeft: 3,
                        marginTop: 4,
                        width: 98,
                        zIndex: 0,
                      },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
            </View>
          </ImageBackground>
        </SwiperItem>
      </Swiper>
    </ScreenContainer>
  );
};

export default withTheme(OnboardingQuestionnaireScreen);
