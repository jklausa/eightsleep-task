import { type FC } from 'react';
import { VictoryLabel } from 'victory-native';

export const BarLabel: FC<{ datum: any }> = (props) => {
  const renderWidth = 1280 - 140;
  const width = props.datum.ratio * renderWidth;

  return <VictoryLabel {...props} dx={width / 2} />;
};
