import { Stack, useLocalSearchParams } from 'expo-router';
import { type FC, useMemo } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import { NetworkLoadingError } from '#components/error/NetworkLoadingError';
import { IntervalSummary } from '#components/interval/IntervalSummary';
import { IntervalTimeSeriesCharts } from '#components/interval/IntervalTimeSeriesCharts';
import { ErrorScreen } from '#components/screens/ErrorScreen';
import { Text, View } from '#components/Themed';
import { useSleepSessionForUser } from '#hooks/data/useSleepSessionForUser';

interface IntervalShowParamList extends Record<string, string> {
  displayName: string;
  intervalId: string;
}

export default function IntervalShow() {
  const { displayName, intervalId } =
    useLocalSearchParams<IntervalShowParamList>();

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

  if (typeof intervalId !== 'string') {
    return (
      <ErrorScreen errorMessage="Missing required parameter: intervalId" />
    );
  }

  return (
    <IntervalShowScreen displayName={displayName} intervalId={intervalId} />
  );
}

const IntervalShowScreen: FC<{
  displayName: string;
  intervalId: string;
}> = ({ displayName, intervalId }) => {
  const { isLoading, user, sleepSession, error, refetch } =
    useSleepSessionForUser(displayName);

  // sort intervals by date
  const interval = useMemo(
    () =>
      sleepSession?.intervals.find((interval) => interval.id === intervalId),
    [intervalId, sleepSession?.intervals]
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
      {!isLoading && user != null && interval != null && (
        <ScrollView style={styles.container}>
          {error != null && <NetworkLoadingError onTapReload={refetch} />}
          {error == null && (
            <>
              <Text>Sleep data for {user.displayName}.</Text>
              <IntervalSummary interval={interval} />
              <IntervalTimeSeriesCharts interval={interval} />
            </>
          )}
        </ScrollView>
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
