import React from 'react';
import {
  ExpoImage,
  Icon,
  Pressable,
  ScreenContainer,
  Shadow,
  SimpleStyleFlatList,
  SimpleStyleScrollView,
  Touchable,
  VideoPlayer,
  withTheme,
} from '@draftbit/ui';
import { ActivityIndicator, Modal, Text, View } from 'react-native';
import { Fetch } from 'react-request';
import * as GlobalStyles from '../GlobalStyles.js';
import * as ApplicationApi from '../apis/ApplicationApi.js';
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

const HomescreenHousematesScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [Housemates_count, setHousemates_count] = React.useState(0);
  const [displayVideo, setDisplayVideo] = React.useState(false);
  const [selectedVideoLink, setSelectedVideoLink] = React.useState('test');
  const [togglePlay, setTogglePlay] = React.useState(true);

  return (
    <ScreenContainer
      hasSafeArea={false}
      scrollable={false}
      style={StyleSheet.applyWidth(
        {
          backgroundColor: 'rgb(255, 255, 255)',
          paddingBottom: 20,
          paddingLeft: 15,
          paddingRight: 15,
          paddingTop: 65,
        },
        dimensions.width
      )}
    >
      {/* View - header */}
      <View
        style={StyleSheet.applyWidth(
          { flexDirection: 'row' },
          dimensions.width
        )}
      >
        <Pressable
          onPress={() => {
            try {
              navigation.goBack();
            } catch (err) {
              console.error(err);
            }
          }}
        >
          <Icon
            color={palettes.Neutral[800]}
            name={'AntDesign/left'}
            size={20}
            style={StyleSheet.applyWidth(
              { height: 20, marginRight: 15, marginTop: 4, width: 15 },
              dimensions.width
            )}
          />
        </Pressable>

        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text 2'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.TextStyles(theme)['Text 2'].style,
              theme.typography.body1,
              {
                color: 'rgb(53, 48, 61)',
                fontFamily: 'DMSans_500Medium',
                fontSize: 20,
                marginBottom: -10,
              }
            ),
            dimensions.width
          )}
        >
          {"Kaylee's Housemate\n"}
        </Text>
      </View>
      {/* View - HouseInfo */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          },
          dimensions.width
        )}
      >
        {/* View - Active */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', flexDirection: 'row' },
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
                  color: 'rgb(53, 48, 61)',
                  fontFamily: 'DMSans_500Medium',
                  fontSize: 20,
                  marginRight: 10,
                }
              ),
              dimensions.width
            )}
          >
            {'Active'}
          </Text>
          <Icon
            color={palettes.Green[400]}
            name={'FontAwesome/circle'}
            size={12}
            style={StyleSheet.applyWidth({ marginTop: 2 }, dimensions.width)}
          />
        </View>
        {/* View - HouseCount */}
        <View
          style={StyleSheet.applyWidth(
            {
              alignContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            },
            dimensions.width
          )}
        >
          <Icon name={'MaterialCommunityIcons/account'} size={18} />
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text 2'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.TextStyles(theme)['Text 2'].style,
                theme.typography.body1,
                {
                  color: 'rgb(53, 48, 61)',
                  fontFamily: 'DMSans_600SemiBold',
                  fontSize: 12,
                  marginRight: 2,
                }
              ),
              dimensions.width
            )}
          >
            {Housemates_count}
          </Text>
          {/* Button */}
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                backgroundColor: 'rgb(238, 238, 238)',
                borderRadius: 12,
                flexDirection: 'row',
                marginLeft: 5,
                paddingLeft: 10,
                paddingRight: 10,
              },
              dimensions.width
            )}
          >
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
                    color: 'rgb(51, 48, 63)',
                    fontFamily: 'DMSans_400Regular',
                    fontSize: 10,
                    marginRight: 2,
                  }
                ),
                dimensions.width
              )}
            >
              {'View All'}
            </Text>
            <Icon
              color={theme.colors.text.medium}
              name={'AntDesign/down'}
              size={10}
            />
          </View>
        </View>
      </View>
      {/* View - Main */}
      <View
        style={StyleSheet.applyWidth(
          {
            flexDirection: 'row',
            height: '85%',
            justifyContent: 'space-around',
          },
          dimensions.width
        )}
      >
        <SimpleStyleScrollView
          bounces={true}
          horizontal={false}
          keyboardShouldPersistTaps={'never'}
          nestedScrollEnabled={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
        >
          {/* FetchHousemates */}
          <ApplicationApi.FetchGetHousematesGET
            handlers={{
              onData: fetchHousematesData => {
                try {
                  setHousemates_count(fetchHousematesData?.length);
                } catch (err) {
                  console.error(err);
                }
              },
            }}
            house_id={Constants['HOUSE_ID']}
          >
            {({ loading, error, data, refetchGetHousemates }) => {
              const fetchHousematesData = data?.json;
              if (loading) {
                return <ActivityIndicator />;
              }

              if (error || data?.status < 200 || data?.status >= 300) {
                return <ActivityIndicator />;
              }

              return (
                <>
                  {/* housematesList */}
                  <SimpleStyleFlatList
                    data={fetchHousematesData}
                    decelerationRate={'normal'}
                    horizontal={false}
                    inverted={false}
                    keyExtractor={(housematesListData, index) =>
                      housematesListData?.id ??
                      housematesListData?.uuid ??
                      index?.toString() ??
                      JSON.stringify(housematesListData)
                    }
                    keyboardShouldPersistTaps={'never'}
                    listKey={
                      'View - Main->Scroll View->FetchHousemates->housematesList'
                    }
                    nestedScrollEnabled={false}
                    numColumns={1}
                    onEndReachedThreshold={0.5}
                    pagingEnabled={false}
                    renderItem={({ item, index }) => {
                      const housematesListData = item;
                      return (
                        <Shadow
                          offsetX={0}
                          offsetY={0}
                          paintInside={true}
                          showShadowCornerBottomEnd={true}
                          showShadowCornerBottomStart={true}
                          showShadowCornerTopEnd={true}
                          showShadowCornerTopStart={true}
                          showShadowSideBottom={true}
                          showShadowSideEnd={true}
                          showShadowSideStart={true}
                          showShadowSideTop={true}
                          distance={2}
                          style={StyleSheet.applyWidth(
                            { marginBottom: 20 },
                            dimensions.width
                          )}
                        >
                          {/* View - Card 2 */}
                          <View
                            {...GlobalStyles.ViewStyles(theme)['cardShadow']
                              .props}
                            style={StyleSheet.applyWidth(
                              StyleSheet.compose(
                                GlobalStyles.ViewStyles(theme)['cardShadow']
                                  .style,
                                {
                                  backgroundColor: 'rgb(255, 255, 255)',
                                  borderRadius: 20,
                                }
                              ),
                              dimensions.width
                            )}
                          >
                            <Pressable
                              onPress={() => {
                                try {
                                  setSelectedVideoLink(
                                    'https://www.w3schools.com/html/mov_bbb.mp4'
                                  );
                                  setDisplayVideo(true);
                                } catch (err) {
                                  console.error(err);
                                }
                              }}
                              disabled={Boolean(
                                housematesListData?.profilevideo?.length > 0
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
                                source={imageSource(
                                  Images['JoelMottLaK153ghdigUnsplash']
                                )}
                                style={StyleSheet.applyWidth(
                                  StyleSheet.compose(
                                    GlobalStyles.ExpoImageStyles(theme)[
                                      'Image (default) 11'
                                    ].style,
                                    {
                                      borderTopLeftRadius: 20,
                                      borderTopRightRadius: 20,
                                      height: 150,
                                      minHeight: 150,
                                      width: '100%',
                                    }
                                  ),
                                  dimensions.width
                                )}
                              />
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    backgroundColor: 'rgba(238, 238, 238, 0.7)',
                                    borderRadius: 20,
                                    left: 120,
                                    paddingBottom: 2,
                                    paddingLeft: 4,
                                    paddingRight: 1,
                                    paddingTop: 2,
                                    position: 'absolute',
                                    top: 12,
                                  },
                                  dimensions.width
                                )}
                              >
                                <Icon
                                  size={24}
                                  color={theme.colors.text.medium}
                                  name={'Entypo/controller-play'}
                                />
                              </View>
                            </Pressable>
                            {/* View - CardInfo */}
                            <View
                              style={StyleSheet.applyWidth(
                                {
                                  flexDirection: 'row',
                                  justifyContent: 'space-between',
                                  paddingLeft: 10,
                                  paddingTop: 10,
                                },
                                dimensions.width
                              )}
                            >
                              {/* View - Info */}
                              <View>
                                {/* Name */}
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
                                        color: 'rgb(0, 0, 0)',
                                        fontFamily: 'DMSans_500Medium',
                                        fontSize: 15,
                                        marginBottom: -10,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {housematesListData?.name}
                                  {'\n'}
                                </Text>
                                {/* Major */}
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
                                        color: 'rgb(53, 48, 61)',
                                        fontFamily: 'DMSans_500Medium',
                                        fontSize: 11,
                                        marginBottom: -10,
                                        marginTop: -23,
                                      }
                                    ),
                                    dimensions.width
                                  )}
                                >
                                  {"'27 | Business\n"}
                                </Text>
                              </View>
                              {/* View - Icon */}
                              <View
                                style={StyleSheet.applyWidth(
                                  {
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                    paddingBottom: 20,
                                  },
                                  dimensions.width
                                )}
                              >
                                {/* Button - Message */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor: 'rgb(238, 238, 238)',
                                      borderRadius: 2012,
                                      flexDirection: 'row',
                                      height: 30,
                                      justifyContent: 'center',
                                      marginLeft: 10,
                                      marginRight: 5,
                                      minHeight: 30,
                                      paddingLeft: 6,
                                      paddingRight: 6,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Icon
                                    color={theme.colors.text.medium}
                                    name={'Feather/message-square'}
                                    size={18}
                                  />
                                </View>
                                {/* Button - Profile */}
                                <View
                                  style={StyleSheet.applyWidth(
                                    {
                                      alignItems: 'center',
                                      backgroundColor: 'rgb(238, 238, 238)',
                                      borderRadius: 2012,
                                      flexDirection: 'row',
                                      height: 30,
                                      justifyContent: 'center',
                                      marginRight: 10,
                                      minHeight: 30,
                                      paddingLeft: 4,
                                      paddingRight: 4,
                                    },
                                    dimensions.width
                                  )}
                                >
                                  <Icon
                                    color={theme.colors.text.medium}
                                    name={
                                      'MaterialCommunityIcons/account-outline'
                                    }
                                    size={22}
                                  />
                                </View>
                              </View>
                            </View>
                          </View>
                        </Shadow>
                      );
                    }}
                    showsHorizontalScrollIndicator={true}
                    showsVerticalScrollIndicator={true}
                    snapToAlignment={'start'}
                    style={StyleSheet.applyWidth(
                      {
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        width: '100%',
                      },
                      dimensions.width
                    )}
                  />
                </>
              );
            }}
          </ApplicationApi.FetchGetHousematesGET>
        </SimpleStyleScrollView>
        {/* videoModal */}
        <Modal
          supportedOrientations={['portrait', 'landscape']}
          transparent={false}
          animationType={'slide'}
          presentationStyle={'fullScreen'}
          visible={Boolean(displayVideo)}
        >
          <View
            style={StyleSheet.applyWidth(
              {
                alignItems: 'center',
                height: '100%',
                justifyContent: 'center',
                width: '100%',
                zIndex: 0,
              },
              dimensions.width
            )}
          >
            <Touchable
              onPress={() => {
                try {
                  if (togglePlay) {
                    setTogglePlay(false);
                  } else {
                    setTogglePlay(true);
                  }
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { height: '100%', width: '100%' },
                dimensions.width
              )}
            >
              <VideoPlayer
                isMuted={false}
                playsInSilentModeIOS={false}
                posterResizeMode={'cover'}
                rate={1}
                resizeMode={'cover'}
                volume={0.5}
                {...GlobalStyles.VideoPlayerStyles(theme)['Video'].props}
                isLooping={true}
                shouldPlay={Boolean(togglePlay) ?? true}
                source={imageSource(`${selectedVideoLink}`)}
                style={StyleSheet.applyWidth(
                  StyleSheet.compose(
                    GlobalStyles.VideoPlayerStyles(theme)['Video'].style,
                    { height: '100%', width: '100%', zIndex: 0 }
                  ),
                  dimensions.width
                )}
                useNativeControls={false}
                usePoster={false}
              />
            </Touchable>
          </View>
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              { position: 'absolute', right: 20, top: 20 },
              dimensions.width
            )}
          >
            <Pressable
              onPress={() => {
                try {
                  setDisplayVideo(false);
                } catch (err) {
                  console.error(err);
                }
              }}
              style={StyleSheet.applyWidth(
                { height: 40, width: 40 },
                dimensions.width
              )}
            >
              <Icon
                color={theme.colors.text.medium}
                name={'Feather/x'}
                size={32}
                style={StyleSheet.applyWidth(
                  { position: 'relative', top: 30, zIndex: 99 },
                  dimensions.width
                )}
              />
            </Pressable>
          </View>
        </Modal>
      </View>
      {/* View - Navigate */}
      <View
        style={StyleSheet.applyWidth(
          {
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0)',
            bottom: 30,
            left: 122,
            position: 'absolute',
          },
          dimensions.width
        )}
      >
        <Shadow
          offsetX={0}
          offsetY={0}
          paintInside={true}
          showShadowCornerBottomEnd={true}
          showShadowCornerBottomStart={true}
          showShadowCornerTopEnd={true}
          showShadowCornerTopStart={true}
          showShadowSideBottom={true}
          showShadowSideEnd={true}
          showShadowSideStart={true}
          showShadowSideTop={true}
          distance={2}
        >
          {/* View 2 */}
          <View
            style={StyleSheet.applyWidth(
              {
                backgroundColor: 'rgb(255, 255, 255)',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                flexDirection: 'row',
                paddingBottom: 10,
                paddingLeft: 30,
                paddingRight: 30,
                paddingTop: 10,
              },
              dimensions.width
            )}
          >
            <Pressable
              onPress={() => {
                try {
                  navigation.navigate('HomescreenHomeScreen');
                } catch (err) {
                  console.error(err);
                }
              }}
            >
              <Icon
                color={theme.colors.text.medium}
                name={'Foundation/home'}
                size={38}
              />
            </Pressable>
            {/* Pressable 2 */}
            <Pressable>
              <View
                style={StyleSheet.applyWidth(
                  {
                    backgroundColor: 'rgb(238, 238, 238)',
                    borderRadius: 100,
                    marginLeft: 12,
                    padding: 3,
                  },
                  dimensions.width
                )}
              >
                <Icon
                  color={theme.colors.text.medium}
                  name={'Entypo/plus'}
                  size={31}
                />
              </View>
            </Pressable>
          </View>
        </Shadow>
        {/* View - WhiteBG */}
        <View
          style={StyleSheet.applyWidth(
            {
              backgroundColor: 'rgb(255, 255, 255)',
              bottom: -9,
              height: 9,
              position: 'absolute',
              width: '100%',
            },
            dimensions.width
          )}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(HomescreenHousematesScreen);
