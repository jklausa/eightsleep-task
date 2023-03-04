import { type FC } from 'react';
import { VictoryLabel } from 'victory-native';

import { RENDER_WIDTH } from './utils';

import { type SleepStageDatum } from '#types/chart/datum';

export const BarLabel: FC<{ datum: SleepStageDatum }> = (props) => {
  const width = props.datum.ratio * RENDER_WIDTH;

  return <VictoryLabel {...props} dx={width / 2} />;
};
