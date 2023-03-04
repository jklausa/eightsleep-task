import { type FC } from 'react';

import { stageColor } from '#data/stages';
import { type SleepSessionDatum } from '#types/chart/datum';

export const Bar: FC<{
  x: number;
  y: number;
  y0: number;
  datum: SleepSessionDatum;
}> = ({ x, y, y0, datum }) => {
  const renderWidth = 1280 - 140;
  const width = datum.ratio * renderWidth;
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
