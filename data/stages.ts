export const Stages = {
  awake: {
    label: 'Awake',
    color: 'rgb(79, 161, 67)',
    value: 1,
  },
  light: {
    label: 'Light',
    color: 'rgb(69,129, 162)',
    value: 2,
  },
  deep: {
    label: 'Deep',
    color: 'rgb(82, 62, 170)',
    value: 3,
  },
  out: {
    label: 'Out',
    color: 'rgb(222, 48, 84)',
    value: 4,
  },
} as const;

export type StageKey = keyof typeof Stages;
export type Stage = (typeof Stages)[StageKey];

export const stageColor = (stage: StageKey): Stage['color'] => {
  return Stages[stage].color;
};

export const stageValue = (stage: StageKey): Stage['value'] => {
  return Stages[stage].value;
};

export const stageLabel = (stage: StageKey): Stage['label'] => {
  return Stages[stage].label;
};
