/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import {
  Text as DefaultText,
  View as DefaultView,
  useColorScheme,
} from 'react-native';

import Colors from '../constants/Colors';

export function useThemeColor(
  props: { light?: string | undefined; dark?: string | undefined },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps != null) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

interface ThemeProps {
  lightColor?: string;
  darkColor?: string;
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultText
      style={[{ color, fontFamily: 'Overpass_400Regular' }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}
