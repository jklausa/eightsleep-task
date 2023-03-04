import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { type FC, useCallback, useMemo } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  type ListRenderItem,
  StyleSheet,
} from 'react-native';

import { NetworkLoadingError } from '#components/error/NetworkLoadingError';
import { IntervalSummary } from '#components/interval/IntervalSummary';
import { ItemSeparator } from '#components/list/ItemSeparator';
import { ErrorScreen } from '#components/screens/ErrorScreen';
import { Text, View } from '#components/Themed';
import { useSleepSessionForUser } from '#hooks/data/useSleepSessionForUser';
import { type FamilyUser } from '#types/family-user';
import { type Interval } from '#types/sleep-session';

const hrefForInterval = (user: FamilyUser, interval: Interval) => {
  return {
    pathname: '/user/[displayName]/interval/[intervalId]',
    params: {
      displayName: user.displayName,
      intervalId: interval.id,
    },
  };
};

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
      if (user == null) {
        return null;
      }

      return (
        <>
          <IntervalSummary interval={interval} />

          <Link href={hrefForInterval(user, interval)} asChild>
            <Button title="More details..." />
          </Link>
        </>
      );
    },
    [user]
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
      {!isLoading && user != null && intervals != null && (
        <View style={styles.container}>
          {error != null && <NetworkLoadingError onTapReload={refetch} />}
          {error == null && (
            <>
              <Text>
                Sleep data for {user.displayName}. Total sleep intervals:{' '}
                {intervals.length}
              </Text>
              <FlatList
                data={intervals}
                renderItem={renderItem}
                ItemSeparatorComponent={ItemSeparator}
              />
            </>
          )}
        </View>
      )}
    </>
  );
};

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
