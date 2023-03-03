import { useNetworkData } from '#hooks/network/useNetworkData';
import { type FamilyUser } from '#types/family-user';

const DATA_URL =
  'https://gist.githubusercontent.com/jklausa/1a8c06f2e9c48706846244319cd407d1/raw/6da8ce0c569bb28f5d9f126eee234275230a9f5d/family-data.json';

export function useFamilyUsers() {
  return useNetworkData<FamilyUser[]>(DATA_URL);
}
