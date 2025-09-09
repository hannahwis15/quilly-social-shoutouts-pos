import React from 'react';
import {
  AccordionGroup,
  Button,
  Checkbox,
  ExpoImage,
  Icon,
  IconButton,
  KeyboardAvoidingView,
  LottieAnimation,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  SwipeableItem,
  SwipeableItemButton,
  TabView,
  TabViewItem,
  TextInput,
  Touchable,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, Image, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as ApplicationApi from '../apis/ApplicationApi.js';
import Animations from '../config/Animations';
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

const defaultProps = { lockedScreen: false };

const HomescreenDeprecatedScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const setGlobalVariableValue = GlobalVariables.useSetValue();
  const [HangoutsExpand, setHangoutsExpand] = React.useState(true);
  const [ShoutoutsExpand, setShoutoutsExpand] = React.useState(true);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [compoundedString, setCompoundedString] = React.useState('');
  const [displayNewHangout, setDisplayNewHangout] = React.useState(false);
  const [newHangoutList, setNewHangoutList] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(-1);
  const [selectedMessage, setSelectedMessage] = React.useState('');
  const [styledTextAreaValue, setStyledTextAreaValue] = React.useState('');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textInputValue, setTextInputValue] = React.useState('');
  const augmentHangoutList = (item, type, message, list) => {
    // ensure we’re appending to an array
    const baseList = Array.isArray(list) ? list : [];

    // guard: if item is null/undefined or not an object, replace with empty object
    if (item == null || typeof item !== 'object') {
      item = {};
    }

    // core item
    const newItem = { type, message };

    // copy over the ready flag if present
    if ('ready' in item) newItem.ready = item.ready;

    // unify single vs. multiple into locations[]
    if (Array.isArray(item?.options)) {
      newItem.locations = item.options;
    } else if (item?.location) {
      newItem.locations = [item.location];
    }

    // carry forward the follow-up question
    if (item.question) newItem.question = item.question;

    return [...baseList, newItem];
  };

  const displayLocationSection = item => {
    // 1) must be a response
    if (item.type !== 'response') return false;

    // 2) must have a non-empty locations array
    if (!Array.isArray(item.locations) || item.locations.length === 0) {
      return false;
    }

    return true;
  };

  return (
    <ScreenContainer
      scrollable={false}
      hasBottomSafeArea={true}
      hasSafeArea={true}
      hasTopSafeArea={true}
    >
      {/* HeaderView */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 20,
          },
          dimensions.width
        )}
      >
        {/* HeaderLeftView */}
        <View
          style={StyleSheet.applyWidth({ marginLeft: 15 }, dimensions.width)}
        >
          {/* profileCircle */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: palettes.Neutral[200],
                borderRadius: 50,
                height: 30,
                justifyContent: 'center',
                width: 30,
              },
              dimensions.width
            )}
          >
            <Checkbox
              onPress={newCheckboxValue => {
                const checkboxValue = newCheckboxValue;
                try {
                  setCheckboxValue(checkboxValue);
                  navigation.navigate('ProfileViewMyProfilemediaScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
              checkedIcon={'Ionicons/people'}
              color={palettes.App.Studily_Dark_Primary}
              status={checkboxValue}
              uncheckedColor={palettes.App.Studily_Dark_Primary}
              uncheckedIcon={'Ionicons/people'}
            />
          </View>
        </View>
        {/* HeaderCenterView */}
        <View>
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['Image 12'].props}
            source={imageSource(Images['frame249'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image 12'].style,
                { height: 37, width: 93 }
              ),
              dimensions.width
            )}
          />
        </View>
        {/* HeaderRightView */}
        <View />
      </View>
      {/* profileView */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
          },
          dimensions.width
        )}
      >
        {/* phLeft */}
        <View
          style={StyleSheet.applyWidth(
            { justifyContent: 'space-evenly' },
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
                fontFamily: 'System',
                fontSize: 24,
                fontWeight: '600',
              }),
              dimensions.width
            )}
          >
            {'Welcome Back,\n'}
            {'Hannah'}
          </Text>
          {/* Text 2 */}
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                color: 'rgb(224, 135, 162)',
              }),
              dimensions.width
            )}
          >
            {'Kahlo House '}
            {540}
            {' points'}
          </Text>
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                /* 'Navigate' action requires configuration: choose a navigation destination */
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
            icon={'Ionicons/people-outline'}
            iconSize={18}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
                {
                  backgroundColor: palettes.App['Custom Color 3'],
                  borderRadius: 40,
                  color: palettes.Neutral[800],
                  fontFamily: 'System',
                  fontWeight: '400',
                }
              ),
              dimensions.width
            )}
            title={'meet my housemates'}
          />
        </View>
        {/* phRight */}
        <View>
          <ExpoImage
            allowDownscaling={true}
            cachePolicy={'disk'}
            contentPosition={'center'}
            resizeMode={'cover'}
            transitionDuration={300}
            transitionEffect={'cross-dissolve'}
            transitionTiming={'ease-in-out'}
            {...GlobalStyles.ExpoImageStyles(theme)['Image 13'].props}
            source={imageSource(Images['kahlo2'])}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image 13'].style,
                { height: 144, width: 148 }
              ),
              dimensions.width
            )}
          />
        </View>
      </View>
      {/* Scroll View 2 */}
      <SimpleStyleScrollView
        bounces={true}
        horizontal={false}
        keyboardShouldPersistTaps={'never'}
        nestedScrollEnabled={false}
        showsHorizontalScrollIndicator={true}
        showsVerticalScrollIndicator={true}
        scrollEnabled={true}
        style={StyleSheet.applyWidth({ height: 700 }, dimensions.width)}
      >
        {/* Tab View 2 */}
        <TabView
          activeColor={theme.colors.branding.primary}
          iconPosition={'top'}
          indicatorColor={theme.colors.branding.primary}
          initialTabIndex={0}
          keyboardDismissMode={'auto'}
          pressColor={theme.colors.branding.primary}
          scrollEnabled={false}
          swipeEnabled={true}
          tabBarPosition={'top'}
          tabsBackgroundColor={theme.colors.background.base}
        >
          {/* Tab View Item 2 */}
          <TabViewItem
            {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
              dimensions.width
            )}
            title={'House Events'}
          >
            <View
              style={StyleSheet.applyWidth({ height: '30%' }, dimensions.width)}
            />
            {/* View 2 */}
            <View
              style={StyleSheet.applyWidth(
                { alignItems: 'center', height: '30%', width: '100%' },
                dimensions.width
              )}
            >
              <View
                style={StyleSheet.applyWidth(
                  {
                    alignItems: 'center',
                    paddingLeft: '20%',
                    paddingRight: '20%',
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
                  {...GlobalStyles.ExpoImageStyles(theme)['Image (default) 27']
                    .props}
                  source={imageSource(Images['whoslogo'])}
                  style={StyleSheet.applyWidth(
                    StyleSheet.compose(
                      GlobalStyles.ExpoImageStyles(theme)['Image (default) 27']
                        .style,
                      { height: 150, width: 150 }
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
                        color: palettes.Neutral[900],
                        fontFamily: 'Poppins_400Regular',
                        fontSize: 15,
                        textAlign: 'center',
                      }
                    ),
                    dimensions.width
                  )}
                >
                  {"Let your house mates know you're down to meet up"}
                </Text>
              </View>
            </View>
          </TabViewItem>

          <TabViewItem
            {...GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].props}
            style={StyleSheet.applyWidth(
              GlobalStyles.TabViewItemStyles(theme)['Tab View Item'].style,
              dimensions.width
            )}
            title={'My Events'}
          >
            {/* Fetch 3 */}
            <ApplicationApi.FetchMyShoutoutsGET id={Constants['USER_ID']}>
              {({ loading, error, data, refetchMyShoutouts }) => {
                const fetch3Data = data?.json;
                if (loading) {
                  return <ActivityIndicator />;
                }

                if (error || data?.status < 200 || data?.status >= 300) {
                  return <ActivityIndicator />;
                }

                return (
                  <>
                    {/* List 2 */}
                    <SimpleStyleFlatList
                      data={fetch3Data}
                      decelerationRate={'normal'}
                      horizontal={false}
                      inverted={false}
                      keyExtractor={(list2Data, index) =>
                        list2Data?.id ??
                        list2Data?.uuid ??
                        index?.toString() ??
                        JSON.stringify(list2Data)
                      }
                      keyboardShouldPersistTaps={'never'}
                      listKey={
                        'Scroll View 2->Tab View 2->Tab View Item->Fetch 3->List 2'
                      }
                      nestedScrollEnabled={false}
                      numColumns={1}
                      onEndReachedThreshold={0.5}
                      pagingEnabled={false}
                      renderItem={({ item, index }) => {
                        const list2Data = item;
                        return (
                          <SwipeableItem
                            closeOnPress={true}
                            friction={20}
                            swipeActivationPercentage={80}
                            swipeToClosePercent={50}
                            swipeToOpenPercent={50}
                            {...GlobalStyles.SwipeableItemStyles(theme)[
                              'Swipeable Item'
                            ].props}
                            style={StyleSheet.applyWidth(
                              GlobalStyles.SwipeableItemStyles(theme)[
                                'Swipeable Item'
                              ].style,
                              dimensions.width
                            )}
                          >
                            <SwipeableItemButton
                              closeOnPress={true}
                              revealSwipeDirection={'left'}
                              title={'Button'}
                              backgroundColor={theme.colors.text.danger}
                              icon={'Feather/trash-2'}
                            />
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  borderBottomWidth: 1,
                                  borderColor: palettes.Neutral[100],
                                  padding: 10,
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Text 2']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text 2']
                                      .style,
                                    theme.typography.body1,
                                    { color: theme.colors.text.normal }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {list2Data?.title}
                              </Text>
                              {/* Text 2 */}
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Text 2']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text 2']
                                      .style,
                                    theme.typography.body1,
                                    {
                                      color: theme.colors.text.normal,
                                      fontSize: 12,
                                    }
                                  ),
                                  dimensions.width
                                )}
                              >
                                {list2Data?.message}
                              </Text>
                            </View>
                          </SwipeableItem>
                        );
                      }}
                      showsHorizontalScrollIndicator={true}
                      showsVerticalScrollIndicator={true}
                      snapToAlignment={'start'}
                    />
                  </>
                );
              }}
            </ApplicationApi.FetchMyShoutoutsGET>
          </TabViewItem>
        </TabView>
      </SimpleStyleScrollView>

      <Modal
        supportedOrientations={['portrait', 'landscape']}
        transparent={false}
        animationType={'slide'}
        presentationStyle={'overFullScreen'}
        visible={Boolean(displayNewHangout)}
      >
        <KeyboardAvoidingView
          enabled={true}
          keyboardVerticalOffset={0}
          behavior={'padding'}
          style={StyleSheet.applyWidth({ height: '100%' }, dimensions.width)}
        >
          <View
            style={StyleSheet.applyWidth(
              { borderTopLeftRadius: 8, borderTopRightRadius: 8, flex: 1 },
              dimensions.width
            )}
          >
            <View
              style={StyleSheet.applyWidth(
                {
                  backgroundColor: palettes.App.White,
                  borderColor: palettes.Neutral[300],
                  borderLeftWidth: 1,
                  borderRightWidth: 1,
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8,
                  borderTopWidth: 1,
                  flex: 1,
                  paddingLeft: 20,
                  paddingRight: 20,
                },
                dimensions.width
              )}
            >
              {/* modelHeaderView */}
              <View>
                {/* headerView */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      alignItems: 'center',
                      borderBottomWidth: 1,
                      borderColor: palettes.Neutral[100],
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingBottom: 10,
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
                    source={imageSource(Images['whoslogo'])}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.ExpoImageStyles(theme)[
                          'Image (default) 11'
                        ].style,
                        { height: 50, width: 50 }
                      ),
                      dimensions.width
                    )}
                  />
                  <IconButton
                    onPress={() => {
                      try {
                        setDisplayNewHangout(false);
                        setNewHangoutList([]);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    size={32}
                    color={palettes.Neutral[900]}
                    icon={'Ionicons/close'}
                  />
                </View>
                {/* View 2 */}
                <View
                  style={StyleSheet.applyWidth(
                    {
                      backgroundColor: palettes.Houses['Hypatia House'],
                      borderRadius: 2,
                      marginTop: 10,
                      width: '95%',
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
                          alignSelf: 'center',
                          color: theme.colors.text.medium,
                          fontFamily: 'Poppins_400Regular',
                          lineHeight: 21,
                          padding: 10,
                        }
                      ),
                      dimensions.width
                    )}
                  >
                    {
                      "Lets do something. Tell your house mates what you'er up to."
                    }
                  </Text>
                </View>
              </View>
              {/* modelContentView */}
              <View
                style={StyleSheet.applyWidth(
                  { flex: 1, marginTop: 10 },
                  dimensions.width
                )}
              >
                <SimpleStyleScrollView
                  bounces={true}
                  horizontal={false}
                  keyboardShouldPersistTaps={'never'}
                  nestedScrollEnabled={false}
                  showsVerticalScrollIndicator={true}
                  showsHorizontalScrollIndicator={false}
                  style={StyleSheet.applyWidth(
                    { flex: 1, maxHeight: 600 },
                    dimensions.width
                  )}
                >
                  {/* hangoutList */}
                  <SimpleStyleFlatList
                    data={newHangoutList}
                    decelerationRate={'normal'}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(hangoutListData, index) =>
                      hangoutListData?.id ??
                      hangoutListData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(hangoutListData)
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={
                      'Modal->Keyboard Avoiding View->View->View->modelContentView->Scroll View->hangoutList'
                    }
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const hangoutListData = item;
                      return (
                        <>
                          <View
                            style={StyleSheet.applyWidth(
                              {
                                alignSelf: [
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value: 'auto',
                                  },
                                  {
                                    minWidth: Breakpoints.Mobile,
                                    value:
                                      hangoutListData?.type === 'request'
                                        ? "'flex-start'"
                                        : 'flex-end',
                                  },
                                ],
                                backgroundColor: palettes.Neutral[100],
                                borderRadius: 15,
                                marginBottom: 15,
                                padding: 5,
                                width: '85%',
                              },
                              dimensions.width
                            )}
                          >
                            <Text
                              accessible={true}
                              selectable={false}
                              {...GlobalStyles.TextStyles(theme)['Text 2']
                                .props}
                              style={StyleSheet.applyWidth(
                                StyleSheet.compose(
                                  GlobalStyles.TextStyles(theme)['Text 2']
                                    .style,
                                  theme.typography.body1,
                                  {
                                    color: theme.colors.text.medium,
                                    fontFamily: 'Poppins_400Regular',
                                    lineHeight: 21,
                                    padding: 5,
                                  }
                                ),
                                dimensions.width
                              )}
                            >
                              {hangoutListData?.message}
                            </Text>
                          </View>
                          {/* meetingLocationView */}
                          <>
                            {!displayLocationSection(hangoutListData) ? null : (
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    borderColor: theme.colors.text.light,
                                    borderTopWidth: 1,
                                    marginTop: 10,
                                    paddingBottom: 15,
                                    paddingTop: 15,
                                    width: '100%',
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* headerView */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      flexDirection: 'row',
                                      gap: 10,
                                      marginBottom: 10,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Icon name={'FontAwesome/map-o'} size={22} />
                                  <Text
                                    accessible={true}
                                    selectable={false}
                                    {...GlobalStyles.TextStyles(theme)['Text 2']
                                      .props}
                                    style={StyleSheet.applyWidth(
                                      StyleSheet.compose(
                                        GlobalStyles.TextStyles(theme)['Text 2']
                                          .style,
                                        theme.typography.body1,
                                        {
                                          color:
                                            palettes.App
                                              .Studily_Primary_UI_Dark,
                                          fontFamily: 'Poppins_400Regular',
                                          fontSize: 12,
                                          lineHeight: 16,
                                        }
                                      ),
                                      dimensions.width
                                    )}
                                  >
                                    {
                                      'HERE ARE MEETUP LOCATION WE FOUND THAT MATCH YOUR REFERENCE. PLEASE VERIFY THE LOCATION OR SELECT ONE OF THEM'
                                    }
                                  </Text>
                                </View>
                                {/* locationList */}
                                <SimpleStyleFlatList
                                  data={hangoutListData?.locations}
                                  decelerationRate={'normal'}
                                  horizontal={false}
                                  inverted={false}
                                  keyExtractor={(locationListData, index) =>
                                    locationListData?.id ??
                                    locationListData?.uuid ??
                                    index?.toString() ??
                                    JSON.stringify(locationListData)
                                  }
                                  keyboardShouldPersistTaps={'never'}
                                  listKey={JSON.stringify(
                                    hangoutListData?.locations
                                  )}
                                  nestedScrollEnabled={false}
                                  numColumns={1}
                                  onEndReachedThreshold={0.5}
                                  pagingEnabled={false}
                                  renderItem={({ item, index }) => {
                                    const locationListData = item;
                                    return (
                                      <Touchable
                                        onPress={() => {
                                          try {
                                            setSelectedLocation(index);
                                          } catch (err) {
                                            console.error(err);
                                          }
                                        }}
                                      >
                                        <View
                                          style={StyleSheet.applyWidth(
                                            {
                                              backgroundColor:
                                                palettes.App.White,
                                              borderTopLeftRadius: 8,
                                              borderTopRightRadius: 8,
                                              height: 150,
                                              width: 150,
                                            },
                                            dimensions.width
                                          )}
                                        >
                                          <>
                                            {!(
                                              selectedLocation === index
                                            ) ? null : (
                                              <Icon
                                                size={24}
                                                name={'Entypo/check'}
                                                style={StyleSheet.applyWidth(
                                                  {
                                                    left: 0,
                                                    position: 'absolute',
                                                    top: 0,
                                                  },
                                                  dimensions.width
                                                )}
                                              />
                                            )}
                                          </>
                                          <ExpoImage
                                            allowDownscaling={true}
                                            cachePolicy={'disk'}
                                            contentPosition={'center'}
                                            resizeMode={'cover'}
                                            transitionDuration={300}
                                            transitionEffect={'cross-dissolve'}
                                            transitionTiming={'ease-in-out'}
                                            {...GlobalStyles.ExpoImageStyles(
                                              theme
                                            )['Image (default) 11'].props}
                                            source={imageSource(
                                              Images['quillyimage']
                                            )}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.ExpoImageStyles(
                                                  theme
                                                )['Image (default) 11'].style,
                                                {
                                                  borderTopLeftRadius: 8,
                                                  borderTopRightRadius: 8,
                                                  height: 75,
                                                  width: 150,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          />
                                          {/* locationTitle */}
                                          <Text
                                            accessible={true}
                                            selectable={false}
                                            {...GlobalStyles.TextStyles(theme)[
                                              'Text 2'
                                            ].props}
                                            style={StyleSheet.applyWidth(
                                              StyleSheet.compose(
                                                GlobalStyles.TextStyles(theme)[
                                                  'Text 2'
                                                ].style,
                                                theme.typography.body1,
                                                {
                                                  color:
                                                    theme.colors.text.medium,
                                                  fontFamily:
                                                    'Poppins_400Regular',
                                                  fontSize: 11,
                                                }
                                              ),
                                              dimensions.width
                                            )}
                                          >
                                            {locationListData?.name}
                                          </Text>

                                          <View
                                            style={StyleSheet.applyWidth(
                                              { flexDirection: 'row', gap: 5 },
                                              dimensions.width
                                            )}
                                          >
                                            <Icon
                                              size={24}
                                              name={'EvilIcons/location'}
                                            />
                                            {/* AddressText */}
                                            <Text
                                              accessible={true}
                                              selectable={false}
                                              {...GlobalStyles.TextStyles(
                                                theme
                                              )['Text 2'].props}
                                              style={StyleSheet.applyWidth(
                                                StyleSheet.compose(
                                                  GlobalStyles.TextStyles(
                                                    theme
                                                  )['Text 2'].style,
                                                  theme.typography.body1,
                                                  {
                                                    color:
                                                      palettes.App
                                                        .Studily_Slate_Blue_Dark,
                                                    fontFamily:
                                                      'Poppins_400Regular',
                                                    fontSize: 9,
                                                    lineHeight: 16,
                                                  }
                                                ),
                                                dimensions.width
                                              )}
                                            >
                                              {locationListData?.address}
                                            </Text>
                                          </View>
                                        </View>
                                      </Touchable>
                                    );
                                  }}
                                  showsHorizontalScrollIndicator={true}
                                  showsVerticalScrollIndicator={true}
                                  snapToAlignment={'start'}
                                  style={StyleSheet.applyWidth(
                                    { flexDirection: 'row', gap: 30 },
                                    dimensions.width
                                  )}
                                />
                              </View>
                            )}
                          </>
                        </>
                      );
                    }}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    showsHorizontalScrollIndicator={false}
                  />
                  {/* confirmShoutoutView */}
                  <>
                    {!(selectedLocation > -1) ? null : (
                      <View>
                        <View
                          style={StyleSheet.applyWidth(
                            { flexDirection: 'row' },
                            dimensions.width
                          )}
                        >
                          <Icon
                            size={24}
                            name={'FontAwesome/flag-checkered'}
                            style={StyleSheet.applyWidth(
                              { marginRight: 10 },
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
                                  color: theme.colors.text.medium,
                                  fontSize: 12,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            {'Excellent! you are ready to post. '}
                          </Text>
                        </View>
                        {/* contentView */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              borderRadius: 12,
                              borderWidth: 1,
                              marginBottom: 10,
                            },
                            dimensions.width
                          )}
                        >
                          {/* headerView */}
                          <View
                            style={StyleSheet.applyWidth(
                              { height: 50 },
                              dimensions.width
                            )}
                          />
                          {/* content */}
                          <View
                            style={StyleSheet.applyWidth(
                              { marginBottom: 10 },
                              dimensions.width
                            )}
                          >
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  alignItems: 'center',
                                  backgroundColor: palettes.Neutral[100],
                                  borderBottomLeftRadius: 8,
                                  borderBottomRightRadius: 8,
                                  borderTopRightRadius: 8,
                                  justifyContent: 'center',
                                  marginLeft: 10,
                                  marginRight: 10,
                                  padding: 20,
                                },
                                dimensions.width
                              )}
                            >
                              <Text
                                accessible={true}
                                selectable={false}
                                {...GlobalStyles.TextStyles(theme)['Text 2']
                                  .props}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.TextStyles(theme)['Text 2']
                                      .style,
                                    theme.typography.body1,
                                    {}
                                  ),
                                  dimensions.width
                                )}
                              >
                                {selectedMessage}
                              </Text>
                            </View>
                          </View>
                          {/* footerview */}
                          <View />
                        </View>
                        {/* confFooterView */}
                        <View
                          style={StyleSheet.applyWidth(
                            {
                              flexDirection: 'row',
                              justifyContent: 'space-around',
                            },
                            dimensions.width
                          )}
                        >
                          <Button
                            accessible={true}
                            iconPosition={'left'}
                            {...GlobalStyles.ButtonStyles(theme)[
                              'Button (default)'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)[
                                  'Button (default)'
                                ].style,
                                theme.typography.button,
                                {
                                  backgroundColor: 'rgba(0, 0, 0, 0)',
                                  borderRadius: 20,
                                  borderWidth: 1,
                                  color: theme.colors.text.medium,
                                  width: 150,
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Edit'}
                          />
                          {/* postBtn */}
                          <Button
                            accessible={true}
                            iconPosition={'left'}
                            onPress={() => {
                              try {
                                /* hidden 'API Request' action */
                                setDisplayNewHangout(false);
                                undefined;
                              } catch (err) {
                                console.error(err);
                              }
                            }}
                            {...GlobalStyles.ButtonStyles(theme)[
                              'Button (default)'
                            ].props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ButtonStyles(theme)[
                                  'Button (default)'
                                ].style,
                                theme.typography.button,
                                {
                                  backgroundColor:
                                    palettes.Houses['Hypatia House'],
                                  borderRadius: 20,
                                  color: palettes.App.Studily_Dark_Primary,
                                  width: 150,
                                }
                              ),
                              dimensions.width
                            )}
                            title={'Post'}
                          />
                        </View>
                      </View>
                    )}
                  </>
                </SimpleStyleScrollView>
              </View>
              {/* modelFooterView */}
              <View
                style={StyleSheet.applyWidth(
                  {
                    bottom: 5,
                    flexDirection: 'row',
                    position: 'absolute',
                    width: '95%',
                  },
                  dimensions.width
                )}
              >
                {/* requestView */}
                <View
                  style={StyleSheet.applyWidth(
                    { flexDirection: 'row', marginRight: 15, width: '85%' },
                    dimensions.width
                  )}
                >
                  {/* hangoutRequest */}
                  <TextInput
                    autoCorrect={true}
                    changeTextDelay={500}
                    multiline={true}
                    onChangeText={newHangoutRequestValue => {
                      const textInputValue = newHangoutRequestValue;
                      try {
                        setTextAreaValue(newHangoutRequestValue);
                      } catch (err) {
                        console.error(err);
                      }
                    }}
                    webShowOutline={true}
                    {...GlobalStyles.TextInputStyles(theme)['Text Area'].props}
                    autoFocus={true}
                    disabled={Boolean(Constants['isLoading'])}
                    enablesReturnKeyAutomatically={true}
                    numberOfLines={2}
                    placeholder={'What do you want to do?'}
                    style={StyleSheet.applyWidth(
                      StyleSheet.compose(
                        GlobalStyles.TextInputStyles(theme)['Text Area'].style,
                        theme.typography.body2,
                        {
                          borderBottomLeftRadius: 20,
                          borderBottomRightRadius: 20,
                          borderColor: palettes.Neutral[200],
                          borderRadius: 0,
                          borderTopLeftRadius: 20,
                          borderTopRightRadius: 20,
                          color: palettes.Neutral[400],
                          fontFamily: 'Poppins_400Regular',
                          marginBottom: 20,
                          width: '100%',
                        }
                      ),
                      dimensions.width
                    )}
                    textAlignVertical={'center'}
                    value={textAreaValue}
                  />
                </View>
                <>
                  {!(Constants['isLoading'] === false) ? null : (
                    <IconButton
                      onPress={() => {
                        const handler = async () => {
                          try {
                            const newList = augmentHangoutList(
                              null,
                              'request',
                              textAreaValue,
                              newHangoutList
                            );
                            setNewHangoutList(newList);

                            const message = compoundedString + textAreaValue;
                            setCompoundedString(message);
                            setTextAreaValue('');
                            setGlobalVariableValue({
                              key: 'isLoading',
                              value: true,
                            });
                            const return_hangout = (
                              await ApplicationApi.initShoutoutPOST(Constants, {
                                message: message,
                                owner_id: Constants['USER_ID'],
                              })
                            )?.json;
                            if (
                              return_hangout?.code === 'ERROR_CODE_UNAUTHORIZED'
                            ) {
                              setGlobalVariableValue({
                                key: 'AUTHORIZATION_TOKEN',
                                value: null,
                              });
                              setGlobalVariableValue({
                                key: 'USER_ID',
                                value: null,
                              });
                              setGlobalVariableValue({
                                key: 'isLoading',
                                value: false,
                              });
                              if (navigation.canGoBack()) {
                                navigation.popToTop();
                              }
                              navigation.replace('AuthStack');
                              return;
                            } else {
                            }

                            const newList2 = augmentHangoutList(
                              return_hangout,
                              'response',
                              return_hangout?.question,
                              newList
                            );
                            setNewHangoutList(newList2);
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
                      size={32}
                      color={
                        textAreaValue?.length > 10
                          ? palettes.Indigo[600]
                          : palettes.Indigo[100]
                      }
                      icon={'Feather/send'}
                      style={StyleSheet.applyWidth(
                        { marginTop: 5 },
                        dimensions.width
                      )}
                    />
                  )}
                </>
                <>
                  {!(Constants['isLoading'] === true) ? null : (
                    <LottieAnimation
                      autoPlay={true}
                      loop={true}
                      speed={1}
                      {...GlobalStyles.LottieAnimationStyles(theme)[
                        'Lottie Animation'
                      ].props}
                      source={imageSource(Animations['animation1748097225411'])}
                      style={StyleSheet.applyWidth(
                        GlobalStyles.LottieAnimationStyles(theme)[
                          'Lottie Animation'
                        ].style,
                        dimensions.width
                      )}
                    />
                  )}
                </>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      {/* footerView */}
      <View
        style={StyleSheet.applyWidth(
          {
            bottom: 20,
            height: 50,
            position: 'absolute',
            right: 20,
            zIndex: 9999,
          },
          dimensions.width
        )}
      >
        {/* rightView */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignItems: 'center',
              backgroundColor: palettes.Houses['Hypatia House'],
              borderRadius: 50,
              bottom: 0,
              height: 60,
              justifyContent: 'center',
              position: 'relative',
              right: 0,
              width: 60,
            },
            dimensions.width
          )}
        >
          <IconButton
            onPress={() => {
              try {
                if (displayNewHangout === true) {
                  setDisplayNewHangout(false);
                } else {
                  setNewHangoutList({});
                  setSelectedLocation(-1);
                  setDisplayNewHangout(true);
                }
              } catch (err) {
                console.error(err);
              }
            }}
            size={32}
            color={theme.colors.text.medium}
            icon={'FontAwesome/plus'}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomescreenDeprecatedScreen);
