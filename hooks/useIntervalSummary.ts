import { DateTime } from 'luxon';

import { type StageKey } from '#data/stages';
import { type SleepStageDatum } from '#types/chart/datum';
import { type Interval } from '#types/sleep-session';

export const useIntervalSummary = (interval: Interval) => {
  const totalDuration = interval.stages.reduce(
    (acc, curr) => curr.duration + acc,
    0
  );

  const stageDurations = interval.stages.reduce<Record<StageKey, number>>(
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

  const start = DateTime.fromISO(interval.ts);
  let end = start;

  const stages: SleepStageDatum[] = interval.stages.map((stage) => {
    const previousEnd = end;
    end = end.plus({ seconds: stage.duration });

    const ratio = stage.duration / totalDuration;

    const { hours, minutes } = end.diff(previousEnd, ['hours', 'minutes']);

    return {
      ...stage,
      ratio,
      range: {
        start: previousEnd.toJSDate(),
        end: end.toJSDate(),
        summary: `${hours.toString(10)}h${minutes.toString(10)}m`,
      },
    };
  });

  const { hours, minutes } = end.diff(start, ['hours', 'minutes']);

  return {
    stages,
    range: {
      start: start.toJSDate(),
      end: end.toJSDate(),
      summary: `${start.toLocaleString({
        dateStyle: 'medium',
        timeStyle: 'short',
      })} - ${end.toLocaleString({
        dateStyle: 'medium',
        timeStyle: 'short',
      })}`,
    },
    duration: {
      stages: stageDurations,
      summary: `${hours.toString(10)} hours, ${minutes.toString(10)} minutes`,
    },
  };
};
