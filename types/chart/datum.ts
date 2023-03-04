import { type SleepStage } from '#types/sleep-session';

export interface SleepStageDatum extends SleepStage {
  ratio: number;
  range: {
    start: Date;
    end: Date;
    summary: string;
  };
}
