import { type FC } from 'react';
import { StyleSheet } from 'react-native';

import { TimeSeriesChart } from '#components/chart/TimeSeriesChart';
import { View } from '#components/Themed';
import Colors from '#constants/Colors';
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
    <View style={styles.container}>
      <TimeSeriesChart
        style={styles.chartStyle}
        name="Room Temperature (°C)"
        values={interval.timeseries.tempRoomC}
        {...timeSeriesProps}
      />
      <TimeSeriesChart
        style={styles.chartStyle}
        name="Bed Temperature (°C)"
        values={interval.timeseries.tempBedC}
        {...timeSeriesProps}
      />
      <TimeSeriesChart
        style={styles.chartStyle}
        name="Breathing Rate (breaths/minute)"
        values={interval.timeseries.respiratoryRate}
        {...timeSeriesProps}
      />
      <TimeSeriesChart
        style={styles.chartStyle}
        name="Heart Rate (beats/minute)"
        values={interval.timeseries.heartRate}
        {...timeSeriesProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 6,
  },
  chartStyle: {
    borderRadius: 10,
    margin: 6,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.light.tint,
  },
});
