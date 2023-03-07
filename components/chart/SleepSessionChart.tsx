import { type FC } from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import { Text, View } from '#components/Themed';
import { type SleepSession } from '#types/sleep-session';

export const SleepSessionChart: FC<{ sleepSession: SleepSession }> = ({
  sleepSession,
}) => {
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width - 60}
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
