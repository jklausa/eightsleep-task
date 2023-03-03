import { useCallback } from 'react';

import { useNetworkData } from '#hooks/network/useNetworkData';
import { type SleepSession } from '#types/sleep-session';

export function useSleepSession() {
  const request = useNetworkData<SleepSession>();

  const fetchData = useCallback(
    (path: string, readFromCache?: boolean) => {
      const url = `https://s3.amazonaws.com/eight-public/challenge/${path}`;

      return request.fetchData(url, readFromCache);
    },
    [request]
  );

  return {
    ...request,
    fetchData,
  };
}
