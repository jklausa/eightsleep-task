import { useNetworkData } from '#hooks/network/useNetworkData';
import { type SleepData } from '#types/sleep-session';

export function useSleepSession(path: string) {
  const url = `https://s3.amazonaws.com/eight-public/challenge/${path}`;

  return useNetworkData<SleepData>(url);
}
