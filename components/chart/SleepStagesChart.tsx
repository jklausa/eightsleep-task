import { type FC } from 'react';
import { Dimensions } from 'react-native';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLegend,
  VictoryPie,
  VictoryTheme,
} from 'victory-native';

import { useThemeColor } from '#components/Themed';
import { type StageKey, Stages, stageColor, stageLabel } from '#data/stages';
import { type SleepStageDatum } from '#types/chart/datum';

export const SleepStagesChart: FC<{
  start: Date;
  end: Date;
  stages: SleepStageDatum[];
}> = ({ start, end, stages }) => {
  const width = Dimensions.get('window').width - 24 * 2;

  const textColor = useThemeColor({}, 'text');

  return (
    <VictoryChart theme={VictoryTheme.material} width={width} height={350}>
      <VictoryAxis
        axisComponent={<></>}
        gridComponent={<></>}
        tickComponent={<></>}
        tickLabelComponent={<></>}
        // Normally the way to disable the axes is to use <VictoryGroup> instead of <VictoryChart>, but that breaks displaying the legend.
      />
      <VictoryPie
        style={{
          data: {
            fill: ({ datum }) => {
              return stageColor(datum.x);
            },
            strokeWidth: 1,
            strokeOpacity: 0.5,
            stroke: textColor,
          },
          labels: {
            fill: textColor,
          },
        }}
        padAngle={4}
        innerRadius={50}
        labelPosition="centroid"
        labels={stages.map((stage) => stage.range.summary)}
        data={stages.map((stage) => ({
          ...stage,
          x: stage.stage,
          y: stage.ratio,
        }))}
      />
      <VictoryLegend
        orientation="horizontal"
        style={{
          border: { stroke: 'black' },
          labels: {
            fill: textColor,
          },
        }}
        data={Object.keys(Stages).map((stage) => ({
          name: stageLabel(stage as StageKey),
          symbol: {
            fill: stageColor(stage as StageKey),
          },
        }))}
        x={60}
        y={325}
      />

      {/* <VictoryBar
        data={stages.map((stage) => ({
          ...stage,
          x: stage.range.start,
          y: stageValue(stage.stage),
        }))}
        dataComponent={dataComponent}
        labels={({ datum }: { datum: SleepStageDatum }) => datum.range.summary}
        labelComponent={labelComponent}
        style={{
          data: { fill: ({ datum }) => stageColor(datum.stage) },
        }}
      /> */}
    </VictoryChart>
  );
};
