import React from 'react';
import {
  Button,
  ExpoImage,
  ScreenContainer,
  SimpleStyleScrollView,
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
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const defaultProps = { lockedScreen: false };

const HomescreenMessagesScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const params = useParams();
  const Constants = GlobalVariables.useValues();
  const Variables = Constants;
  const [HangoutsExpand, setHangoutsExpand] = React.useState(true);
  const [ShoutoutsExpand, setShoutoutsExpand] = React.useState(true);
  const [checkboxValue, setCheckboxValue] = React.useState(false);
  const [compoundedString, setCompoundedString] = React.useState('');
  const [displayNewHangout, setDisplayNewHangout] = React.useState(false);
  const [newHangoutList, setNewHangoutList] = React.useState([]);
  const [selectedLocation, setSelectedLocation] = React.useState(-1);
  const [selectedMessage, setSelectedMessage] = React.useState('');
  const [selectedTag, setSelectedTag] = React.useState('Going');
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
            borderBottomWidth: 1,
            borderColor: palettes.Neutral[200],
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: 10,
          },
          dimensions.width
        )}
      >
        {/* HeaderLeftView */}
        <View
          style={StyleSheet.applyWidth(
            { flexDirection: 'row', marginLeft: 15, width: '40%' },
            dimensions.width
          )}
        >
          {/* phLeftView */}
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'center', flexDirection: 'row' },
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
              {...GlobalStyles.ExpoImageStyles(theme)['Image 12'].props}
              source={imageSource(Images['qshortlogo'])}
              style={StyleSheet.applyWidth(
                StyleSheet.compose(
                  GlobalStyles.ExpoImageStyles(theme)['Image 12'].style,
                  { height: 70, width: 70 }
                ),
                dimensions.width
              )}
            />
          </View>
          {/* phRightView */}
          <View
            style={StyleSheet.applyWidth(
              { justifyContent: 'center', marginLeft: 10, paddingTop: 5 },
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
                    color: palettes.App.black_primary,
                    fontFamily: 'System',
                    fontSize: 16,
                    fontWeight: '600',
                    lineHeight: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {'WELCOME BACK,'}
            </Text>
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
                    color: theme.colors.text.normal,
                    fontSize: 14,
                    lineHeight: 16,
                  }
                ),
                dimensions.width
              )}
            >
              {'Hannah'}
            </Text>
          </View>
        </View>
        {/* HeaderCenterView */}
        <View
          style={StyleSheet.applyWidth({ width: '24%' }, dimensions.width)}
        />
        {/* HeaderRightView */}
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'flex-end', paddingRight: 20, width: '33%' },
            dimensions.width
          )}
        >
          {/* Image 2 */}
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
                { height: 60, width: 60 }
              ),
              dimensions.width
            )}
          />
        </View>
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
        {/* phMain */}
        <View />
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
      />
    </ScreenContainer>
  );
};

export default withTheme(HomescreenMessagesScreen);
