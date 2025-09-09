import React from 'react';
import { withTheme } from '@draftbit/ui';
import { ActivityIndicator, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import useNavigation from '../utils/useNavigation';
import useWindowDimensions from '../utils/useWindowDimensions';

const ProgressFormBlock = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();

  return (
    <View
      style={StyleSheet.applyWidth(
        {
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.26)',
          bottom: 0,
          flex: 1,
          justifyContent: 'center',
          left: 0,
          position: 'absolute',
          right: 0,
          top: 0,
          zIndex: 9999999,
        },
        dimensions.width
      )}
    >
      <ActivityIndicator
        animating={true}
        hidesWhenStopped={true}
        size={'small'}
        {...GlobalStyles.ActivityIndicatorStyles(theme)['Activity Indicator']
          .props}
        style={StyleSheet.applyWidth(
          GlobalStyles.ActivityIndicatorStyles(theme)['Activity Indicator']
            .style,
          dimensions.width
        )}
      />
    </View>
  );
};

export default withTheme(ProgressFormBlock);
