import { type FC } from 'react';

import { TimeSeriesChart } from '../chart/TimeSeriesChart';

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

  const timeSeriesProps = {
    domain: {
      x: [range.start, range.end] as [Date, Date],
    },
  };

  return (
    <View>
      <Text>
        Session duration: {duration.summary} ({range.summary})
      </Text>

      <View>
        <Text>Sleep score: {interval.score}</Text>
        {stageSummaries.map((summary) => (
          <Text key={summary.key}>
            {summary.title}: {summary.summary}
          </Text>
        ))}
      </View>

      <SleepStagesChart start={range.start} end={range.end} stages={stages} />

      <TimeSeriesChart
        name="Room Temperature (°C)"
        values={interval.timeseries.tempRoomC}
        {...timeSeriesProps}
      />
      <TimeSeriesChart
        name="Bed Temperature (°C)"
        values={interval.timeseries.tempBedC}
        {...timeSeriesProps}
      />
      <TimeSeriesChart
        name="Breathing Rate (beats/minute)"
        values={interval.timeseries.respiratoryRate}
        {...timeSeriesProps}
      />
      <TimeSeriesChart
        name="Heart Rate (beats/minute)"
        values={interval.timeseries.heartRate}
        {...timeSeriesProps}
      />
    </View>
  );
};
