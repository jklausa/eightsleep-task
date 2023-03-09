export const Stages = {
  awake: {
    label: 'Awake',
    color: '#aaffaa',
    value: 1,
  },
  light: {
    label: 'Light',
    color: '#aaaaff',
    value: 2,
  },
  deep: {
    label: 'Deep',
    color: '#ffaaaa',
    value: 3,
  },
  out: {
    label: 'Out',
    color: '#ffaaff',
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
