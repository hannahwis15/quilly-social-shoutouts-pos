import React from 'react';
import { Button, ExpoImage, ScreenContainer, withTheme } from '@draftbit/ui';
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

const LandingPageScreen = props => {
  const { theme } = props;
  const dimensions = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <ScreenContainer
      hasLeftSafeArea={true}
      hasRightSafeArea={true}
      hasSafeArea={false}
      scrollable={false}
    >
      <ImageBackground
        resizeMode={'cover'}
        {...GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].props}
        source={imageSource(Images['rectangle200'])}
        style={StyleSheet.applyWidth(
          StyleSheet.compose(
            GlobalStyles.ImageBackgroundStyles(theme)['Image Background'].style,
            { justifyContent: 'flex-end' }
          ),
          dimensions.width
        )}
      >
        {/* viewTop */}
        <View>
          <View>
            <ExpoImage
              allowDownscaling={true}
              cachePolicy={'disk'}
              contentPosition={'center'}
              resizeMode={'cover'}
              transitionDuration={300}
              transitionEffect={'cross-dissolve'}
              transitionTiming={'ease-in-out'}
              {...GlobalStyles.ExpoImageStyles(theme)['Image 53'].props}
              source={imageSource(Images['frame3233719'])}
              style={StyleSheet.applyWidth(
                GlobalStyles.ExpoImageStyles(theme)['Image 53'].style,
                dimensions.width
              )}
            />
          </View>
        </View>

        <View
          style={StyleSheet.applyWidth(
            { paddingLeft: 30, paddingRight: 30 },
            dimensions.width
          )}
        >
          {/* Heading */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App.White,
                fontFamily: 'Poppins_700Bold',
                fontSize: 35,
                marginBottom: 20,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {'This is Quilly'}
          </Text>
          {/* sub heading */}
          <Text
            accessible={true}
            selectable={false}
            style={StyleSheet.applyWidth(
              {
                color: palettes.App.White,
                fontFamily: 'Poppins_400Regular',
                fontSize: 15,
                marginBottom: 35,
                textAlign: 'center',
              },
              dimensions.width
            )}
          >
            {
              'Real friends, not followers--the girls you can call up, hang with, lean on. '
            }
          </Text>
          {/* Sign Up */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('RegistationStack');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['purpule_button'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['purpule_button'].style,
                {
                  backgroundColor: palettes.App.Studily_Purple_Light,
                  borderRadius: 40,
                  color: palettes.App.Studily_Primary_UI_Dark,
                  height: 66,
                  marginBottom: 10,
                  paddingBottom: 20,
                  paddingTop: 20,
                }
              ),
              dimensions.width
            )}
            title={'Sign Up'}
          />
          {/* Login */}
          <Button
            accessible={true}
            iconPosition={'left'}
            onPress={() => {
              try {
                navigation.navigate('AuthStack');
              } catch (err) {
                console.error(err);
              }
            }}
            {...GlobalStyles.ButtonStyles(theme)['transparent_button'].props}
            style={StyleSheet.applyWidth(
              StyleSheet.compose(
                GlobalStyles.ButtonStyles(theme)['transparent_button'].style,
                {
                  backgroundColor: null,
                  borderColor: palettes.App.Studily_Purple_Light,
                  borderRadius: 40,
                  borderWidth: 1,
                  color: palettes.App.Studily_Purple_Light,
                  height: 66,
                }
              ),
              dimensions.width
            )}
            title={'Login'}
          />
          <View
            style={StyleSheet.applyWidth(
              { alignItems: 'flex-end' },
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
              {...GlobalStyles.ExpoImageStyles(theme)['Image 54'].props}
              source={imageSource(Images['frame3233720'])}
              style={StyleSheet.applyWidth(
                GlobalStyles.ExpoImageStyles(theme)['Image 54'].style,
                dimensions.width
              )}
            />
          </View>
        </View>
      </ImageBackground>
    </ScreenContainer>
  );
};

export default withTheme(LandingPageScreen);
