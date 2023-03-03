export interface SleepSession {
  intervals: Interval[];
}

interface Interval {
  id: string;
  ts: Date;
  stages: SleepStage[];
  score: number; // 0 - 100
  timeseries: TimeSeries;
}

interface SleepStage {
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

type TimeSeriesValue = [Date, number];
