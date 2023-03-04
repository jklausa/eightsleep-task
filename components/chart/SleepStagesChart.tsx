import { type FC } from 'react';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';

import { Bar } from './decorators/Bar';
import { BarLabel } from './decorators/BarLabel';

import { Stages, stageColor, stageValue } from '#data/stages';
import { type SleepStageDatum } from '#types/chart/datum';

export const SleepStagesChart: FC<{
  start: Date;
  end: Date;
  stages: SleepStageDatum[];
}> = ({ start, end, stages }) => {
  // @ts-expect-error: Placeholder, gets correct params at runtime
  const dataComponent = <Bar />;

  // @ts-expect-error: Placeholder, gets correct params at runtime
  const labelComponent = <BarLabel />;

  return (
    <VictoryChart
      theme={VictoryTheme.material}
      domainPadding={{ x: 20 }}
      domain={{ x: [start, end] }}
      defaultAxes={{
        dependent: <VictoryAxis />,
        independent: (
          <VictoryAxis
            dependentAxis
            tickFormat={Object.values(Stages).map((stage) => stage.label)}
          />
        ),
      }}
    >
      <VictoryBar
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
      />
    </VictoryChart>
  );
};
