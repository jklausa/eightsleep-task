import { Duration } from 'luxon';

import { type StageKey, Stages } from '#data/stages';

export const useStageSummaries = (stages: Record<StageKey, number>) =>
  Object.entries(Stages).map(([key, stage]) => {
    const duration = stages[key as StageKey];

    return {
      key: key as StageKey,
      title: stage.label,
      summary:
        stages[key as StageKey] > 0
          ? `${Duration.fromObject({
              seconds: duration,
            })
              .rescale()
              .toHuman({
                listStyle: 'long',
              })}`
          : 'None',
    };
  });
