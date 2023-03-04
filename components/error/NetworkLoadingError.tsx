import { AntDesign } from '@expo/vector-icons';
import { type FC } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';

import { Text, View, useThemeColor } from '#components/Themed';
import Colors from '#constants/Colors';

export const NetworkLoadingError: FC<{ onTapReload: () => void }> = ({
  onTapReload,
}) => {
  const tintColor = useThemeColor({}, 'tint');
  const themeTextColor = useThemeColor({}, 'text');
  const scheme = useColorScheme() ?? 'light';

  const textColor = scheme === 'dark' ? Colors.dark.background : themeTextColor;

  return (
    <View style={styles.networkErrorContainer}>
      <Text style={styles.text}>Failed loading data from the network.</Text>
      <Text style={styles.text}>
        Check that your internet connection is working and retry.
      </Text>
      <View style={styles.button}>
        <AntDesign.Button
          name="reload1"
          onPress={() => {
            onTapReload();
          }}
          color={textColor}
          backgroundColor={tintColor}
          style={{
            margin: 4,
          }}
        >
          Retry
        </AntDesign.Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  networkErrorContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    margin: 6,
  },
  button: {
    margin: 16,
    alignSelf: 'center',
  },
});
