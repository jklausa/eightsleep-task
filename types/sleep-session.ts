export interface SleepData {
  intervals: Interval[];
}

export interface Interval {
  id: string;
  ts: Date;
  stages: SleepStage[];
  score: number; // 0 - 100
  timeseries: TimeSeries;
}

export interface SleepStage {
  stage: StageEnum;
  duration: number; // in seconds
}

export type StageEnum = 'awake' | 'light' | 'deep' | 'out';

export interface TimeSeries {
  tnt: TimeSeriesValue[];
  tempRoomC: TimeSeriesValue[]; // Celsius
  tempBedC: TimeSeriesValue[]; // Celsius
  respiratoryRate: TimeSeriesValue[]; // Breaths Per Minute
  heartRate: TimeSeriesValue[]; // BPM
}

export type TimeSeriesValue = [Date, number];
