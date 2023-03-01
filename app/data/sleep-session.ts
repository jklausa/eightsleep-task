// Generated with help of https://app.quicktype.io, and cleaned up by hand.

import { useEffect, useState } from "react";
import { FamilyUser } from "./family-users";

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

export type StageEnum = "awake" | "light" | "deep" | "out";

export interface TimeSeries {
  tnt: TimeSeriesValue[];
  tempRoomC: TimeSeriesValue[]; // Celsius
  tempBedC: TimeSeriesValue[]; // Celsius
  respiratoryRate: TimeSeriesValue[]; // Breaths Per Minute
  heartRate: TimeSeriesValue[]; // BPM
}

export type TimeSeriesValue = [Date, number];

export function useSleepSession(user: FamilyUser) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<SleepData>();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let fetchedData = await fetch(
        "https://s3.amazonaws.com/eight-public/challenge/" + user.sleepDataURL
      );
      setData(await fetchedData.json());
    } catch (e) {
      setError(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { isLoading, data, error, fetchData };
}
