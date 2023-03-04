import { AntDesign } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { type FC, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  type ListRenderItem,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { IntervalSummary } from '#components/interval/IntervalSummary';
import { Text, View, useThemeColor } from '#components/Themed';
import Colors from '#constants/Colors';
import { useSleepSessionForUser } from '#hooks/data/useSleepSessionForUser';
import { type Interval } from '#types/sleep-session';

interface UserShowParamList extends Record<string, string> {
  displayName: string;
}

export default function UserShow() {
  const { displayName } = useLocalSearchParams<UserShowParamList>();

  // I know the error handling here is probably an overkill and unidiomatic, but
  // because of how the expo-router works (and because we don't have a global-state-of-truth like Redux, which seems
  // like an overkill for this assignment?), I'm sorta... uneasy? about passing the data?
  // Because these could be missing, or mistyped, or anything, so I wanted to handle the errors explicitly here.
  //
  // AIUI, the "blessed" way of doing it would be to have a global store of some sort with a list of all users,
  // and passing an unique identifier, and then fetching an item via that identifier locally within the component.

  if (typeof displayName !== 'string') {
    return (
      <ErrorScreen errorMessage="Missing required parameter: displayName" />
    );
  }

  return <UserShowScreen displayName={displayName} />;
}

const UserShowScreen: FC<{
  displayName: string;
}> = ({ displayName }) => {
  const { isLoading, user, sleepSession, error, refetch } =
    useSleepSessionForUser(displayName);

  // sort intervals by date
  const intervals = useMemo(
    () =>
      sleepSession?.intervals.sort(
        (lhs, rhs) => new Date(lhs.ts).getTime() - new Date(rhs.ts).getTime()
      ),
    [sleepSession?.intervals]
  );

  const renderItem = useCallback<ListRenderItem<Interval>>(
    ({ item: interval }) => {
      return <IntervalSummary interval={interval} />;
    },
    []
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: displayName,
        }}
      />
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={'large'} />
        </View>
      )}
      {!isLoading && user != null && sleepSession != null && (
        <View style={styles.container}>
          {error != null && <NetworkLoadingError onTapReload={refetch} />}
          {error == null && (
            <>
              <Text>
                userString: {user.displayName}, sleep sessions:{' '}
                {sleepSession.intervals.length}
              </Text>
              <FlatList data={intervals} renderItem={renderItem} />
            </>
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
