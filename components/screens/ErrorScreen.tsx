import { type FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from '#components/Themed';

export const ErrorScreen: FC<{ errorMessage?: string }> = ({
  errorMessage,
}) => (
  <View style={errorStyles.container}>
    <Text style={errorStyles.header}>An unrecoverable error occured.</Text>
    <Text style={errorStyles.subHeader}>
      Please return to the previous screen.
    </Text>
    {errorMessage != null && (
      <>
        <Text style={errorStyles.subHeader}>Error description:</Text>
        <Text style={errorStyles.errorMessage}>{errorMessage}</Text>
      </>
    )}
  </View>
);

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  header: {
    fontSize: 30,
    fontFamily: 'Overpass_700Bold',
  },
  subHeader: {
    fontSize: 20,
    fontFamily: 'Overpass_400Regular',
  },
  errorMessage: {
    padding: 4,
    fontFamily: 'SpaceMono',
    fontSize: 16,
    backgroundColor: '#e5e5e5',
  },
});
