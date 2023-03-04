import { type FC } from 'react';

import { TimeSeriesChart } from '#components/chart/TimeSeriesChart';
import { View } from '#components/Themed';
import { useIntervalSummary } from '#hooks/useIntervalSummary';
import { type Interval } from '#types/sleep-session';

export const IntervalTimeSeriesCharts: FC<{
  interval: Interval;
}> = ({ interval }) => {
  const { range } = useIntervalSummary(interval);

  const timeSeriesProps = {
    domain: {
      x: [range.start, range.end] as [Date, Date],
    },
  };

  return (
    <View>
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
