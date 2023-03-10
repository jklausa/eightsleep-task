import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import { type StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { type ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';

import { Text, View, useThemeColor } from '#components/Themed';
import { type TimeSeriesValue } from '#types/sleep-session';

export const TimeSeriesChart: FC<{
  name: string;
  values: TimeSeriesValue[];
  domain?: { x: [Date, Date] };
  style?: StyleProp<ViewStyle> | undefined;
}> = ({ name, values, domain, style }) => {
  const foregroundColor = useThemeColor({}, 'text');

  return (
    <View style={style}>
      <Text style={styles.header}>{name}</Text>
      <VictoryChart theme={VictoryTheme.material} height={200}>
        <VictoryAxis
          dependentAxis
          gridComponent={<></>}
          domain={domain}
          scale={'time'}
          style={{
            axis: { stroke: foregroundColor },
            axisLabel: { stroke: foregroundColor },
            ticks: { stroke: foregroundColor },
            tickLabels: { fill: foregroundColor },
          }}
        />
        <VictoryAxis
          gridComponent={<></>}
          domain={domain}
          scale={'time'}
          fixLabelOverlap
          style={{
            axis: { stroke: foregroundColor },
            axisLabel: { stroke: foregroundColor },
            ticks: { stroke: foregroundColor },
            tickLabels: { fill: foregroundColor },
          }}
        />
        <VictoryLine
          style={{
            data: {
              stroke: foregroundColor,
            },
            labels: {
              fill: foregroundColor,
            },
          }}
          interpolation="basis"
          domain={domain}
          data={values.map(([stringDate, value]) => ({
            x: new Date(stringDate),
            y: value,
          }))}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginStart: 10,
    marginTop: 10,
    marginBottom: -30,
    fontSize: 20,
    fontFamily: 'Overpass_700Bold',
  },
});
