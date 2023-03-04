import { Duration } from 'luxon';

import { type StageKey, Stages } from '#data/stages';

export const useStageSummaries = (stages: Record<StageKey, number>) =>
  Object.entries(Stages).map(([key, stage]) => ({
    key,
    title: stage.label,
    summary:
      stages[key as StageKey] > 0
        ? `${Duration.fromObject({
            seconds: stages[key as StageKey],
          })
            .rescale()
            .toHuman({
              listStyle: 'long',
            })}`
        : 'None',
  }));
