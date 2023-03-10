type StringDate = string; // ISO 8601

export interface SleepSession {
  intervals: Interval[];
}

export interface Interval {
  id: string;
  ts: StringDate;
  stages: SleepStage[];
  score: number; // 0 - 100
  timeseries: TimeSeries;
}

export interface SleepStage {
  stage: 'awake' | 'light' | 'deep' | 'out';
  duration: number; // in seconds
}

interface TimeSeries {
  tnt: TimeSeriesValue[];
  tempRoomC: TimeSeriesValue[]; // Celsius
  tempBedC: TimeSeriesValue[]; // Celsius
  respiratoryRate: TimeSeriesValue[]; // Breaths Per Minute
  heartRate: TimeSeriesValue[]; // BPM
}

export type TimeSeriesValue = [StringDate, number];
