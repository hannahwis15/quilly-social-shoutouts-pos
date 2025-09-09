import React from 'react';
import {
  ExpoImage,
  HStack,
  Icon,
  ScreenContainer,
  SimpleStyleFlatList,
  SimpleStyleKeyboardAwareScrollView,
  SimpleStyleScrollView,
  Touchable,
  VStack,
  withTheme,
} from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import * as GlobalVariables from '../config/GlobalVariableContext';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useIsFocused from '../utils/useIsFocused';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { edit: null };

const ProfileViewMyProfilemediaScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [SelectedTab, setSelectedTab] = React.useState('faq');
  const [all_intrests, setAll_intrests] = React.useState([
    'Creativity',
    'Sports',
    '🧖‍♀️ Skincare/Makeup',
    'Creativity',
    'Sports',
    '🧖‍♀️ Skincare/Makeup',
  ]);
  const [isEditProfileVisible, setIsEditProfileVisible] = React.useState(false);
  const [selected_intrests, setSelected_intrests] = React.useState([
    'Creativity',
    '🧖‍♀️ Skincare/Makeup',
    'Music',
    'Sports',
    'Gamming',
  ]);
  const [selectedtag, setSelectedtag] = React.useState('General');
  const [tags, setTags] = React.useState([
    'General',
    'Account',
    'Service',
    'Payment',
  ]);
  const isFocused = useIsFocused();
  React.useEffect(() => {
    try {
      if (!isFocused) {
        return;
      }
      if (Constants['AUTHORIZATION_TOKEN']?.length >= 2) {
      } else {
        navigation.navigate('AuthStack', { screen: 'AuthBerkeleyLoginScreen' });
      }
    } catch (err) {
      console.error(err);
    }
  }, [isFocused]);

  return (
    <ScreenContainer scrollable={false} hasSafeArea={true}>
      {/* Header */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'flex-start',
            flexDirection: 'row',
            height: 75,
            justifyContent: 'space-between',
            marginBottom: 10,
            marginTop: 30,
            paddingLeft: 16,
            paddingRight: 16,
          },
          dimensions.width
        )}
      >
        {/* Profile Image */}
        <ExpoImage
          allowDownscaling={true}
          cachePolicy={'disk'}
          contentPosition={'center'}
          resizeMode={'cover'}
          source={imageSource(
            'https://static.draftbit.com/images/placeholder-image.png'
          )}
          transitionDuration={300}
          transitionEffect={'cross-dissolve'}
          transitionTiming={'ease-in-out'}
          {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 16'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ExpoImageStyles(theme)['Image (default) 16'].style,
              { borderRadius: 60, height: 70, marginLeft: 10, width: 70 }
            ),
            dimensions.width
          )}
        />
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', justifyContent: 'flex-end' },
            dimensions.width
          )}
        >
          {/* Edit Profile */}
          <Touchable
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Edit Profile */}
            <View
              style={StyleSheet.applyWidth(
                {
                  borderRadius: 20,
                  borderWidth: 1,
                  flexDirection: 'row',
                  height: 15,
                  justifyContent: 'center',
                  marginRight: 10,
                  marginTop: 10,
                  overflow: 'hidden',
                  padding: 10,
                },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    bottom: 3,
                    height: 8,
                    position: 'relative',
                    right: 3,
                    width: 8,
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
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                    .props}
                  source={imageSource(Images['vectoreditprofile'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 11']
                        .style,
                      { height: '100%', width: '100%' }
                    ),
                    dimensions.width
                  )}
                />
              </View>
              {/* Film & TV */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.caption,
                    {
                      alignSelf: 'center',
                      color: palettes.Quilly.Text,
                      fontSize: 10,
                      padding: 1,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Edit Profile\n'}
              </Text>
            </View>
          </Touchable>
          {/* Logout */}
          <Touchable
            onPress={() => {
              try {
                setGlobalVariableValue({
                  key: 'AUTHORIZATION_TOKEN',
                  value: null,
                });
                setGlobalVariableValue({
                  key: 'USER_ID',
                  value: null,
                });
                navigation.navigate('AuthStack', {
                  screen: 'AuthBerkeleyLoginScreen',
                });
              } catch (err) {
                console.error(err);
              }
            }}
          >
            {/* Logout */}
            <View
              style={StyleSheet.applyWidth(
                {
                  alignItems: 'center',
                  borderRadius: 20,
                  borderWidth: 1,
                  flexDirection: 'column',
                  height: 15,
                  justifyContent: 'center',
                  marginRight: 10,
                  marginTop: 10,
                  overflow: 'hidden',
                  padding: 10,
                },
                dimensions.width
              )}
            >
              {/* Film & TV */}
              <Text
                accessible={true}
                selectable={false}
                {...GlobalStyles.TextStyles(theme)['Text'].props}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.TextStyles(theme)['Text'].style,
                    theme.typography.caption,
                    {
                      alignSelf: 'center',
                      color: palettes.Quilly.Text,
                      fontSize: 10,
                      padding: 1,
                      textAlign: 'center',
                    }
                  ),
                  dimensions.width
                )}
              >
                {'Logout'}
              </Text>
            </View>
          </Touchable>
        </View>
      </View>

      <VStack
        {...GlobalStyles.VStackStyles(theme)['V Stack'].props}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.VStackStyles(theme)['V Stack'].style,
            { marginLeft: 20 }
          ),
          dimensions.width
        )}
      >
        {/* Name */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text'].style,
              theme.typography.body2,
              { color: palettes.Neutral[900], fontFamily: 'Alata_400Regular' }
            ),
            dimensions.width
          )}
        >
          {'Lily Anderson (She/Her)'}
        </Text>
        {/* Points */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text'].style,
              theme.typography.caption,
              {
                color: palettes.Quilly.Text,
                fontFamily: 'AlbertSans_400Regular',
              }
            ),
            dimensions.width
          )}
        >
          {'🌟 1080 points'}
        </Text>

        <HStack
          {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.HStackStyles(theme)['H Stack'].style,
              { gap: 20, justifyContent: 'flex-start' }
            ),
            dimensions.width
          )}
        >
          {/* Location */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            selectionColor={theme.colors.branding.primary}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.caption,
                {
                  color: theme.colors.text.light,
                  fontFamily: 'System',
                  fontWeight: '400',
                }
              ),
              dimensions.width
            )}
          >
            {'📍 Redwood City, CA'}
          </Text>
          {/* School & Major */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text'].style,
                theme.typography.caption,
                { color: theme.colors.text.light }
              ),
              dimensions.width
            )}
          >
            {"🎓 UCLA '26 | Bio"}
          </Text>
        </HStack>
      </VStack>
      {/* Tabs */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 20,
          },
          dimensions.width
        )}
      >
        {/* My Profile */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* selected */}
          <>
            {!(SelectedTab === 'faq') ? null : (
              <Touchable
                onPress={() => {
                  try {
                    setSelectedTab('faq');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 3,
                      borderColor: palettes.App['Custom Color'],
                      height: 41,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                      },
                      dimensions.width
                    )}
                  >
                    {'My Profile'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* unselected */}
          <>
            {!(SelectedTab !== 'faq') ? null : (
              <Touchable
                onPress={() => {
                  try {
                    setSelectedTab('faq');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: palettes.App['Custom Color_20'],
                      height: 41,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color_20'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                      },
                      dimensions.width
                    )}
                  >
                    {'My Profile'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
        {/* My Media */}
        <View style={StyleSheet.applyWidth({ flex: 1 }, dimensions.width)}>
          {/* selected */}
          <>
            {!(SelectedTab === 'contact') ? null : (
              <Touchable>
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 3,
                      borderColor: palettes.App['Custom Color'],
                      height: 41,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color'],
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '600',
                      },
                      dimensions.width
                    )}
                  >
                    {'My Media'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
          {/* unselected */}
          <>
            {!(SelectedTab !== 'contact') ? null : (
              <Touchable
                onPress={() => {
                  try {
                    setSelectedTab('contact');
                  } catch (err) {
                    console.error(err);
                  }
                }}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: palettes.App['Custom Color_20'],
                      height: 41,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      {
                        color: palettes.App['Custom Color_20'],
                        fontFamily: 'Inter_600SemiBold',
                        fontSize: 14,
                      },
                      dimensions.width
                    )}
                  >
                    {'My Media'}
                  </Text>
                </View>
              </Touchable>
            )}
          </>
        </View>
      </View>
      {/* My profile */}
      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
      >
        {/* Profile */}
        <>
          {!(SelectedTab === 'faq') ? null : (
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                { paddingLeft: 24, paddingRight: 24, paddingTop: 16 },
                dimensions.width
              )}
            >
              {/* Video */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.text.light,
                    borderLeftWidth: 1,
                    borderRadius: 20,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderWidth: 1,
                    height: 160,
                    justifyContent: 'center',
                    marginBottom: 18,
                    marginTop: 5,
                    paddingLeft: 20,
                    paddingRight: 20,
                  },
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
                      theme.typography.caption,
                      { color: palettes.Quilly.Text }
                    ),
                    dimensions.width
                  )}
                >
                  {'user video'}
                </Text>
              </View>
              {/* Interests */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 5,
                    justifyContent: 'flex-start',
                  },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', width: '100%' },
                    dimensions.width
                  )}
                >
                  <SimpleStyleFlatList
                    data={selected_intrests}
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
                    listKey={'My profile->Profile->Interests->View->List'}
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const listData = item;
                      return (
                        <>
                          <Touchable />
                          <View
                            style={StyleSheet.applyWidth(
                              { padding: 2 },
                              dimensions.width
                            )}
                          >
                            {/* interest1 */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  height: 30,
                                  justifyContent: 'center',
                                  overflow: 'hidden',
                                  padding: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {/* Film & TV */}
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Text']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text']
                                      .style,
                                    theme.typography.caption,
                                    {
                                      alignSelf: 'center',
                                      color: palettes.Quilly.Text,
                                      padding: 1,
                                      textAlign: 'center',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {listData}
                                {'\n'}
                              </Text>
                            </View>
                          </View>
                        </>
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth(
                      { flexDirection: 'row', flexWrap: 'wrap' },
                      dimensions.width
                    )}
                  />
                </View>
              </View>
              {/* Info Block1 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.border.brand,
                    borderLeftWidth: 1,
                    borderRadius: 20,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderWidth: 1,
                    gap: 20,
                    marginTop: 18,
                    paddingBottom: 40,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 40,
                  },
                  dimensions.width
                )}
              >
                {/* prompt */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      theme.typography.caption,
                      { color: palettes.Quilly.Text }
                    ),
                    dimensions.width
                  )}
                >
                  {'The best Friday night would be...'}
                </Text>
                {/* answer */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      theme.typography.body1,
                      {
                        color: palettes.Quilly.Text,
                        fontSize: 20,
                        paddingRight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'A chill kick back or small hangout!'}
                </Text>
              </View>
              {/* Info Block2 */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: palettes.App['Custom #ffffff'],
                    borderBottomWidth: 1,
                    borderColor: theme.colors.border.brand,
                    borderLeftWidth: 1,
                    borderRadius: 20,
                    borderRightWidth: 1,
                    borderTopWidth: 1,
                    borderWidth: 1,
                    gap: 20,
                    marginBottom: 5,
                    marginTop: 15,
                    paddingBottom: 40,
                    paddingLeft: 30,
                    paddingRight: 30,
                    paddingTop: 40,
                  },
                  dimensions.width
                )}
              >
                {/* prompt */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      theme.typography.caption,
                      { color: palettes.Quilly.Text }
                    ),
                    dimensions.width
                  )}
                >
                  {'What I like to do for fun:'}
                </Text>
                {/* answer */}
                <Text
                  accessible={true}
                  selectable={false}
                  {...GlobalStyles.TextStyles(theme)['Text'].props}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.TextStyles(theme)['Text'].style,
                      theme.typography.body1,
                      {
                        color: palettes.Quilly.Text,
                        fontSize: 20,
                        paddingRight: 20,
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {'skiing, surfing, all things outdoors!'}
                </Text>
              </View>
            </SimpleStyleScrollView>
          )}
        </>
      </SimpleStyleKeyboardAwareScrollView>

      <SimpleStyleKeyboardAwareScrollView
        enableAutomaticScroll={false}
        enableOnAndroid={false}
        enableResetScrollToCoords={false}
        keyboardShouldPersistTaps={'never'}
        showsVerticalScrollIndicator={true}
        viewIsInsideTabBar={false}
      >
        {/* My media */}
        <>
          {!(SelectedTab === 'contact') ? null : (
            <SimpleStyleScrollView
              bounces={true}
              horizontal={false}
              keyboardShouldPersistTaps={'never'}
              nestedScrollEnabled={false}
              showsHorizontalScrollIndicator={true}
              showsVerticalScrollIndicator={true}
              style={StyleSheet.applyWidth(
                {
                  paddingLeft: 24,
                  paddingRight: 24,
                  paddingTop: { minWidth: Breakpoints.Tablet, value: 16 },
                },
                dimensions.width
              )}
            >
              {/* House Check-ins */}
              <Touchable
                onPress={() => {
                  try {
                    /* 'Navigate' action requires configuration: choose a navigation destination */
                  } catch (err) {
                    console.error(err);
                  }
                }}
                style={StyleSheet.applyWidth(
                  { marginBottom: 18, marginTop: 18 },
                  dimensions.width
                )}
              >
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      backgroundColor:
                        palettes.Quilly['Primary-button-lavender'],
                      borderBottomWidth: 1,
                      borderColor: theme.colors.border.brand,
                      borderLeftWidth: 1,
                      borderRadius: 20,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      flexDirection: 'row',
                      height: 35,
                      justifyContent: 'center',
                    },
                    dimensions.width
                  )}
                >
                  <Text
                    accessible={true}
                    selectable={false}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(theme.typography.body2, {
                        color: palettes.Quilly.Text,
                        fontFamily: 'System',
                        fontSize: 14,
                        fontWeight: '400',
                        marginLeft: 12,
                      }),
                      dimensions.width
                    )}
                  >
                    {'My House Check-ins'}
                  </Text>
                </View>
              </Touchable>
              {/* Post1 */}
              <Touchable
                style={StyleSheet.applyWidth(
                  { marginBottom: 18 },
                  dimensions.width
                )}
              >
                {/* Post */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderBottomWidth: 1,
                      borderColor: theme.colors.border.brand,
                      borderLeftWidth: 1,
                      borderRadius: 20,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      flexDirection: 'column',
                      gap: 10,
                      padding: 20,
                      paddingLeft: 20,
                    },
                    dimensions.width
                  )}
                >
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 10 }
                      ),
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      source={imageSource(
                        'https://static.draftbit.com/images/placeholder-image.png'
                      )}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)[
                        'Image (default) 16'
                      ].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)[
                            'Image (default) 16'
                          ].style,
                          { borderRadius: 50, height: 40, width: 40 }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Id */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          justifyContent: 'flex-start',
                          paddingBottom: 2,
                          paddingTop: 2,
                        },
                        dimensions.width
                      )}
                    >
                      {/* User */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.body2,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Ellie S.'}
                      </Text>
                      {/* Time Stamp */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'26 min ago'}
                      </Text>
                    </View>
                  </HStack>

                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        theme.typography.body1,
                        {
                          color: palettes.Quilly.Text,
                          lineHeight: 20,
                          paddingBottom: 8,
                          paddingRight: 10,
                          paddingTop: 15,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'Anyone know any quiet places to study and allows drinks?'}
                  </Text>
                  {/* Reactions */}
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 20 }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Comments */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'32'}
                      </Text>
                    </View>
                    {/* Likes */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'46'}
                      </Text>
                    </View>
                    {/* Shares */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'3'}
                      </Text>
                    </View>
                  </HStack>
                </View>
              </Touchable>
              {/* Post2 */}
              <Touchable
                style={StyleSheet.applyWidth(
                  { marginBottom: 18 },
                  dimensions.width
                )}
              >
                {/* Post */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderBottomWidth: 1,
                      borderColor: theme.colors.border.brand,
                      borderLeftWidth: 1,
                      borderRadius: 20,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      flexDirection: 'column',
                      gap: 10,
                      padding: 20,
                      paddingLeft: 20,
                    },
                    dimensions.width
                  )}
                >
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 10 }
                      ),
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      source={imageSource(
                        'https://static.draftbit.com/images/placeholder-image.png'
                      )}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)[
                        'Image (default) 16'
                      ].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)[
                            'Image (default) 16'
                          ].style,
                          { borderRadius: 50, height: 40, width: 40 }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Id */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          justifyContent: 'flex-start',
                          paddingBottom: 2,
                          paddingTop: 2,
                        },
                        dimensions.width
                      )}
                    >
                      {/* User */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.body2,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Ellie S.'}
                      </Text>
                      {/* Time Stamp */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'26 min ago'}
                      </Text>
                    </View>
                  </HStack>

                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        theme.typography.body1,
                        {
                          color: palettes.Quilly.Text,
                          lineHeight: 20,
                          paddingBottom: 8,
                          paddingRight: 10,
                          paddingTop: 15,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {'How is everyone doing today ;p'}
                  </Text>
                  {/* Reactions */}
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 20 }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Comments */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'32'}
                      </Text>
                    </View>
                    {/* Likes */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'46'}
                      </Text>
                    </View>
                    {/* Shares */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'3'}
                      </Text>
                    </View>
                  </HStack>
                </View>
              </Touchable>
              {/* Post3 */}
              <Touchable
                style={StyleSheet.applyWidth(
                  { marginBottom: 18 },
                  dimensions.width
                )}
              >
                {/* Post */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'flex-start',
                      backgroundColor: palettes.App['Custom #ffffff'],
                      borderBottomWidth: 1,
                      borderColor: theme.colors.border.brand,
                      borderLeftWidth: 1,
                      borderRadius: 20,
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      flexDirection: 'column',
                      gap: 10,
                      padding: 20,
                      paddingLeft: 20,
                    },
                    dimensions.width
                  )}
                >
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 10 }
                      ),
                      dimensions.width
                    )}
                  >
                    <ExpoImage
                      allowDownscaling={true}
                      cachePolicy={'disk'}
                      contentPosition={'center'}
                      resizeMode={'cover'}
                      source={imageSource(
                        'https://static.draftbit.com/images/placeholder-image.png'
                      )}
                      transitionDuration={300}
                      transitionEffect={'cross-dissolve'}
                      transitionTiming={'ease-in-out'}
                      {...GlobalStyles.ExpoImageStyles(theme)[
                        'Image (default) 16'
                      ].props}
                      style={StyleSheet.applyWidth(
                        StyleSheet.compose(
                          GlobalStyles.ExpoImageStyles(theme)[
                            'Image (default) 16'
                          ].style,
                          { borderRadius: 50, height: 40, width: 40 }
                        ),
                        dimensions.width
                      )}
                    />
                    {/* Id */}
                    <View
                      style={StyleSheet.applyWidth(
                        {
                          justifyContent: 'flex-start',
                          paddingBottom: 2,
                          paddingTop: 2,
                        },
                        dimensions.width
                      )}
                    >
                      {/* User */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.body2,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'Ellie S.'}
                      </Text>
                      {/* Time Stamp */}
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'26 min ago'}
                      </Text>
                    </View>
                  </HStack>

                  <Text
                    accessible={true}
                    selectable={false}
                    {...GlobalStyles.TextStyles(theme)['Text'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextStyles(theme)['Text'].style,
                        theme.typography.body1,
                        {
                          color: palettes.Quilly.Text,
                          lineHeight: 20,
                          paddingBottom: 8,
                          paddingRight: 10,
                          paddingTop: 15,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      'Looking for a roommate in my 2br 2b apt. Walking distance to uni, LMK!'
                    }
                  </Text>
                  <ExpoImage
                    allowDownscaling={true}
                    cachePolicy={'disk'}
                    contentPosition={'center'}
                    resizeMode={'cover'}
                    source={imageSource(
                      'https://static.draftbit.com/images/placeholder-image.png'
                    )}
                    transitionDuration={300}
                    transitionEffect={'cross-dissolve'}
                    transitionTiming={'ease-in-out'}
                    {...GlobalStyles.ExpoImageStyles(theme)[
                      'Image (default) 16'
                    ].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 16'
                        ].style,
                        {
                          borderRadius: 20,
                          height: 200,
                          marginBottom: 5,
                          width: 300,
                        }
                      ),
                      dimensions.width
                    )}
                  />
                  {/* Reactions */}
                  <HStack
                    {...GlobalStyles.HStackStyles(theme)['H Stack'].props}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.HStackStyles(theme)['H Stack'].style,
                        { gap: 20 }
                      ),
                      dimensions.width
                    )}
                  >
                    {/* Comments */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'32'}
                      </Text>
                    </View>
                    {/* Likes */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'46'}
                      </Text>
                    </View>
                    {/* Shares */}
                    <View
                      style={StyleSheet.applyWidth(
                        { flexDirection: 'row', gap: 5 },
                        dimensions.width
                      )}
                    >
                      <Icon name={'FontAwesome/photo'} size={24} />
                      <Text
                        accessible={true}
                        selectable={false}
                        {...GlobalStyles.TextStyles(theme)['Text'].props}
                        style={StyleSheet.applyWidth(
                          StyleSheet.compose(
                            GlobalStyles.TextStyles(theme)['Text'].style,
                            theme.typography.caption,
                            { color: palettes.Quilly.Text }
                          ),
                          dimensions.width
                        )}
                      >
                        {'3'}
                      </Text>
                    </View>
                  </HStack>
                </View>
              </Touchable>
            </SimpleStyleScrollView>
          )}
        </>
      </SimpleStyleKeyboardAwareScrollView>
    </ScreenContainer>
  );
};

export default withTheme(ProfileViewMyProfilemediaScreen);
