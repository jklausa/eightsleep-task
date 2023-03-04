import { DateTime, Duration } from 'luxon';
import { type FC, useCallback } from 'react';
import { FlatList, type ListRenderItem } from 'react-native';
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTheme,
} from 'victory-native';

import { Bar } from './Bar';
import { BarLabel } from './BarLabel';
import { TimeSeriesChart } from './TimeSeriesChart';

import { Text, View } from '#components/Themed';
import { type StageKey, Stages, stageColor, stageValue } from '#data/stages';
import { type SleepSession } from '#types/sleep-session';

export const SleepSessionChart: FC<{ sleepSession: SleepSession }> = ({
  sleepSession,
}) => {
  const renderItem = useCallback<
    ListRenderItem<(typeof sleepSession.intervals)[number]>
  >(({ item: interval }) => {
    const ts = DateTime.fromISO(interval.ts);

    let marker = ts;

    const totalDuration = interval.stages.reduce((acc, curr) => {
      return curr.duration + acc;
    }, 0);

    const intervalDurations = interval.stages.reduce<Record<StageKey, number>>(
      (acc, curr) => {
        acc[curr.stage] += curr.duration;

        return acc;
      },
      {
        awake: 0,
        light: 0,
        deep: 0,
        out: 0,
      }
    );

    const stages = interval.stages.map((stage) => {
      const range = {
        start: marker,
        end: marker.plus({ seconds: stage.duration }),
      };

      marker = range.end;

      const ratio = stage.duration / totalDuration;

      const { hours, minutes } = range.end.diff(range.start, [
        'hours',
        'minutes',
      ]);
      const duration = `${hours.toString(10)}h${minutes.toString(10)}m`;

      return {
        ...stage,
        ratio,
        range: {
          ...range,
          duration,
        },
        ts,
      };
    });

    const { hours, minutes } = marker.diff(ts, ['hours', 'minutes']);

    const session = {
      start: ts,
      end: marker,
      duration: `${hours.toString(10)} hours, ${minutes.toString(10)} minutes`,
    };

    const timeSeriesProps = {
      domain: {
        x: [session.start.toJSDate(), session.end.toJSDate()] as [Date, Date],
      },
    };

    // @ts-expect-error: Placeholder, gets correct params at runtime
    const dataComponent = <Bar />;

    // @ts-expect-error: Placeholder, gets correct params at runtime
    const labelComponent = <BarLabel />;

    return (
      <View>
        <Text>
          Session duration: {session.duration} (
          {session.start.toLocaleString({
            dateStyle: 'medium',
            timeStyle: 'short',
          })}{' '}
          -{' '}
          {session.end.toLocaleString({
            dateStyle: 'medium',
            timeStyle: 'short',
          })}
          )
        </Text>

        <View>
          <Text>Summary:</Text>
          <Text>Sleep score: {interval.score}</Text>
          {Object.entries(Stages).map(([key, stage]) => (
            <Text key={stage.value}>
              {stage.label}:{' '}
              {Duration.fromObject({
                seconds: intervalDurations[key as StageKey],
              })
                .rescale()
                .toHuman({
                  listStyle: 'long',
                })}{' '}
              (
              {Math.round(
                (intervalDurations[key as StageKey] / totalDuration) * 100
              )}
              %)
            </Text>
          ))}
        </View>

        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 20 }}
          domain={{ x: [ts.toJSDate(), marker.toJSDate()] }}
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
              x: stage.range.start.toJSDate(),
              y: stageValue(stage.stage),
            }))}
            dataComponent={dataComponent}
            labels={({ datum }) => datum.range.duration}
            labelComponent={labelComponent}
            style={{
              data: { fill: ({ datum }) => stageColor(datum.stage) },
            }}
          />
        </VictoryChart>

        <TimeSeriesChart
          name="tempRoomC"
          values={interval.timeseries.tempRoomC}
          {...timeSeriesProps}
        />
        <TimeSeriesChart
          name="tempBedC"
          values={interval.timeseries.tempBedC}
          {...timeSeriesProps}
        />
        <TimeSeriesChart
          name="respiratoryRate"
          values={interval.timeseries.respiratoryRate}
          {...timeSeriesProps}
        />
        <TimeSeriesChart
          name="heartRate"
          values={interval.timeseries.heartRate}
          {...timeSeriesProps}
        />
      </View>
    );
  }, []);

  return <FlatList data={sleepSession.intervals} renderItem={renderItem} />;
};
