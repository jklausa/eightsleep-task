import { type FC } from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
} from 'victory-native';

import { Text } from '#components/Themed';
import { type TimeSeriesValue } from '#types/sleep-session';

export const TimeSeriesChart: FC<{
  name: string;
  values: TimeSeriesValue[];
  domain?: { x: [Date, Date] };
}> = ({ name, values, domain }) => {
  return (
    <>
      <Text>{name}</Text>
      <VictoryChart theme={VictoryTheme.material}>
        <VictoryAxis
          dependentAxis
          gridComponent={<></>}
          domain={domain}
          scale={{ x: 'time' }}
        />
        <VictoryAxis
          gridComponent={<></>}
          domain={domain}
          scale={{ x: 'time' }}
        />
        <VictoryLine
          interpolation="basis"
          domain={domain}
          data={values.map(([stringDate, value]) => ({
            x: new Date(stringDate),
            y: value,
          }))}
        />
      </VictoryChart>
    </>
  );
};
