import { type FC } from 'react';
import { StyleSheet } from 'react-native';

import { SleepStagesChart } from '#components/chart/SleepStagesChart';
import { Text, View } from '#components/Themed';
import { useIntervalSummary } from '#hooks/useIntervalSummary';
import { useStageSummaries } from '#hooks/useStageSummaries';
import { type Interval } from '#types/sleep-session';

export const IntervalSummary: FC<{
  interval: Interval;
}> = ({ interval }) => {
  const { duration, range, stages } = useIntervalSummary(interval);
  const stageSummaries = useStageSummaries(duration.stages);

  return (
    <View style={styles.chartStyle}>
      <Text style={styles.header}>Session duration</Text>
      <Text style={styles.value}>
        {duration.summary} ({range.summary})
      </Text>

      <Text style={styles.header}>Sleep score</Text>
      <Text style={styles.value}>{interval.score}</Text>

      {stageSummaries.map((summary) => (
        <>
          <Text key={`${summary.key}-header`} style={styles.header}>
            {summary.title}
          </Text>
          <Text key={`${summary.key}-value`} style={styles.value}>
            {summary.summary} (
            {Math.round((duration.stages[summary.key] / duration.total) * 100)}
            %)
          </Text>
        </>
      ))}

      <SleepStagesChart start={range.start} end={range.end} stages={stages} />
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontFamily: 'Overpass_700Bold',
    marginVertical: 10,
  },
  value: {
    fontSize: 14,
    fontFamily: 'Overpass_300Light',
  },
  chartStyle: {
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
