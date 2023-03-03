// Generated with help of https://app.quicktype.io, and cleaned up by hand.

import { useCallback, useEffect, useState } from 'react';

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

export function useSleepSession(url: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<SleepData>();

  const fetchData = useCallback(() => {
    const run = async () => {
      setIsLoading(true);

      try {
        const fetchedData = await fetch(
          'https://s3.amazonaws.com/eight-public/challenge/' + url
        );
        setData(await fetchedData.json());
      } catch (e) {
        if (e instanceof Error) {
          setError(e);
        } else {
          setError(new Error(`Unknown error`));
        }
      }

      setIsLoading(false);
    };

    run().catch((e) => {
      setError(e);
    });
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { isLoading, data, error, fetchData };
}
