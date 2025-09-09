import React from 'react';
import { Button, ExpoImage, ScreenContainer, withTheme } from '@draftbit/ui';
import { Text, View } from 'react-native';
import * as GlobalStyles from '../GlobalStyles.js';
import Images from '../config/Images';
import palettes from '../themes/palettes';
import Breakpoints from '../utils/Breakpoints';
import * as StyleSheet from '../utils/StyleSheet';
import imageSource from '../utils/imageSource';
import useNavigation from '../utils/useNavigation';
import useParams from '../utils/useParams';
import useWindowDimensions from '../utils/useWindowDimensions';

const RegistrationNotifyFlowSubmissionScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();
  const [emailInp, setEmailInp] = React.useState('');

  return (
    <ScreenContainer hasSafeArea={false} scrollable={false}>
      <View
        style={StyleSheet.applyWidth(
          {
            alignContent: 'flex-start',
            alignItems: 'center',
            alignSelf: 'auto',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: 120,
          },
          dimensions.width
        )}
      >
        <View
          style={StyleSheet.applyWidth(
            { alignItems: 'center', position: 'relative' },
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
            {...GlobalStyles.ExpoImageStyles(theme)['Image 42'].props}
            resizeMode={'contain'}
            source={
              imageSource(Images['screenshot20250523001044removebgpreview']) ??
              imageSource(
                'https://assets.draftbit.app/apps/n3Hh5umT/assets/jXGyZmsmrdadkkDRa0TV0'
              )
            }
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ExpoImageStyles(theme)['Image 42'].style,
                { height: 87, position: 'relative', width: 87 }
              ),
              dimensions.width
            )}
          />
          <Text
            accessible={true}
            selectable={false}
            {...GlobalStyles.TextStyles(theme)['Text'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
                alignSelf: 'auto',
                color: palettes.Neutral[800],
                fontFamily: 'DMSans_500Medium',
                fontSize: 24,
                lineHeight: 28,
                marginTop: 20,
                textAlign: 'center',
              }),
              dimensions.width
            )}
          >
            {'This is a placeholder to a successful submission page'}
          </Text>
        </View>
        {/* Text 2 */}
        <Text
          accessible={true}
          selectable={false}
          {...GlobalStyles.TextStyles(theme)['Text'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(GlobalStyles.TextStyles(theme)['Text'].style, {
              color: palettes.Neutral[500],
              fontFamily: 'DMSans_400Regular',
              fontSize: 14,
              lineHeight: 16,
              marginBottom: 35,
              marginTop: 10,
              textAlign: 'center',
            }),
            dimensions.width
          )}
        >
          {'We will let you know when\n registration opens at your school!'}
        </Text>
        <Button
          accessible={true}
          iconPosition={'left'}
          {...GlobalStyles.ButtonStyles(theme)['Button (default)'].props}
          style={StyleSheet.applyWidth(
            StyleSheet.compose(
              GlobalStyles.ButtonStyles(theme)['Button (default)'].style,
              {
                borderRadius: 50,
                color: 'rgb(53, 48, 61)',
                fontFamily: 'DMSans_400Regular',
                fontSize: 18,
                height: 48,
                lineHeight: 26,
                marginTop: 20,
                textAlign: 'auto',
                width: 361,
              }
            ),
            dimensions.width
          )}
          title={'Notify Me'}
        />
      </View>
    </ScreenContainer>
  );
};

export default withTheme(RegistrationNotifyFlowSubmissionScreen);
