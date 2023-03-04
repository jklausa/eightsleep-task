import { type FC } from 'react';
import { VictoryChart, VictoryScatter, VictoryTheme } from 'victory-native';

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
        <VictoryScatter
          name={name}
          style={{ data: { fill: '#c43a31' } }}
          size={values.length}
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
