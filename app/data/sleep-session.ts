// Generated with help of https://app.quicktype.io, and cleaned up by hand.

import { useEffect, useState } from "react";

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

// This code is both amazing and terrifying. The flexibility of the typesystem here is amazing, but having to jump trough
// that many hoops to get simple "hey does this value belong in this type" is not ideal.
// I will readily admit that this code was inspired by https://stackoverflow.com/a/50085718 and with help of my friend.

export const SupportedUsers = ["user1", "user2", "user3"] as const;
export type SupportedUser = typeof SupportedUsers[number];

export function isSupportedUser(value: string): value is SupportedUser {
  return SupportedUsers.includes(value as SupportedUser);
}


export function useSleepSession(user: SupportedUser) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState<SleepData>();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      let fetchedData = await fetch(urlForUser(user));
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


function urlForUser(user: SupportedUser) {
  switch (user) {
    case "user1":
      return "https://s3.amazonaws.com/eight-public/challenge/2228b530e055401f81ba37b51ff6f81d.json";
    case "user2":
      return "https://s3.amazonaws.com/eight-public/challenge/d6c1355e38194139b8d0c870baf86365.json";
    case "user3":
      return "https://s3.amazonaws.com/eight-public/challenge/f9bf229fd19e4c799e8c19a962d73449.json";
  }
}
