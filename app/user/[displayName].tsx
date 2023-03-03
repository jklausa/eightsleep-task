import { AntDesign } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { type FC } from 'react';
import { ActivityIndicator, StyleSheet, useColorScheme } from 'react-native';

import { Text, View, useThemeColor } from '#components/Themed';
import Colors from '#constants/Colors';
import { useSleepSession } from '#hooks/data/useSleepSession';

interface UserShowParamList extends Record<string, string> {
  displayName: string;
}

export default function UserShow() {
  const { displayName } = useLocalSearchParams<UserShowParamList>();

  const name = displayName;
  const sleepDataURL = '2228b530e055401f81ba37b51ff6f81d.json';

  // I know the error handling here is probably an overkill and unidiomatic, but
  // because of how the expo-router works (and because we don't have a global-state-of-truth like Redux, which seems
  // like an overkill for this assignment?), I'm sorta... uneasy? about passing the data?
  // Because these could be missing, or mistyped, or anything, so I wanted to handle the errors explicitly here.
  //
  // AIUI, the "blessed" way of doing it would be to have a global store of some sort with a list of all users,
  // and passing an unique identifier, and then fetching an item via that identifier locally within the component.

  if (typeof sleepDataURL !== 'string') {
    return (
      <ErrorScreen errorMessage="Couldn't parse URL for the users sleep data." />
    );
  }

  if (typeof name !== 'string') {
    return (
      <ErrorScreen errorMessage="Couldn't parse the name for the users sleep data." />
    );
  }

  return <UserShowScreen sleepDataURL={sleepDataURL} name={name} />;
}

const UserShowScreen: FC<{
  sleepDataURL: string;
  name: string;
}> = ({ sleepDataURL, name }) => {
  const { isLoading, data, error, fetchData } = useSleepSession(sleepDataURL);

  return (
    <>
      <Stack.Screen
        options={{
          title: name,
        }}
      />
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      {!isLoading && (
        <View style={styles.container}>
          {error != null && <NetworkLoadingError onTapReload={fetchData} />}
          {error == null && (
            <Text>
              userString: {name}, sleep sessions: {data?.intervals.length}
            </Text>
          )}
        </View>
      )}
    </>
  );
};

function NetworkLoadingError({ onTapReload }: { onTapReload: () => void }) {
  const tintColor = useThemeColor({}, 'tint');
  const themeTextColor = useThemeColor({}, 'text');
  const scheme = useColorScheme() ?? 'light';

  const textColor = scheme === 'dark' ? Colors.dark.background : themeTextColor;

  return (
    <View style={networErrorStyles.networkErrorContainer}>
      <Text style={networErrorStyles.text}>
        Failed loading data from the network.
      </Text>
      <Text style={networErrorStyles.text}>
        Check that your internet connection is working and retry.
      </Text>
      <View style={networErrorStyles.button}>
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
}

function ErrorScreen({ errorMessage }: { errorMessage?: string }) {
  return (
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});

const networErrorStyles = StyleSheet.create({
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
