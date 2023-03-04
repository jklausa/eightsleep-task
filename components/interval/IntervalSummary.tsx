import { type FC } from 'react';

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
    <View>
      <Text>
        Session duration: {duration.summary} ({range.summary})
      </Text>

      <View>
        <Text>Sleep score: {interval.score}</Text>
        {stageSummaries.map((summary) => (
          <Text key={summary.key}>
            {summary.title}: {summary.summary} (
            {Math.round((duration.stages[summary.key] / duration.total) * 100)}
            %)
          </Text>
        ))}
      </View>

      <SleepStagesChart start={range.start} end={range.end} stages={stages} />
    </View>
  );
};
