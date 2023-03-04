import { type FC } from 'react';

import { RENDER_WIDTH } from './utils';

import { stageColor } from '#data/stages';
import { type SleepStageDatum } from '#types/chart/datum';

export const Bar: FC<{
  x: number;
  y: number;
  y0: number;
  datum: SleepStageDatum;
}> = ({ x, y, y0, datum }) => {
  const width = datum.ratio * RENDER_WIDTH;

  return (
    <rect
      x={x}
      y={y}
      width={width}
      height={y0 - y}
      stroke="black"
      fill={stageColor(datum.stage)}
      strokeWidth="0.5"
    />
  );
};
