import { useEffect, useState } from 'react';

import { useFamilyUsers } from './useFamilyUsers';
import { useSleepSession } from './useSleepSession';

import { type useNetworkData } from '#hooks/network/useNetworkData';
import { type FamilyUser } from '#types/family-user';
import { type SleepSession } from '#types/sleep-session';

type Request = ReturnType<typeof useNetworkData<any>>;

const lastValidRequest = (requests: Request[]): Request => {
  return requests[0];
};

export const useSleepSessionForUser = (displayName: string) => {
  const familyUsersRequest = useFamilyUsers();
  const sleepSessionRequest = useSleepSession();

  const [user, setUser] = useState<FamilyUser>();
  const [sleepSession, setSleepSession] = useState<SleepSession>();

  useEffect(() => {
    if (familyUsersRequest.data != null) {
      const user = familyUsersRequest.data.find(
        (user) => user.displayName === displayName
      );
      setUser(user);
    } else {
      setUser(undefined);
    }
  }, [displayName, familyUsersRequest.data]);

  useEffect(() => {
    if (
      user?.sleepDataURL != null &&
      sleepSessionRequest.data == null &&
      sleepSessionRequest.error == null
    ) {
      sleepSessionRequest.fetchData(user.sleepDataURL);
    }
  }, [sleepSessionRequest, user]);

  useEffect(() => {
    if (sleepSessionRequest.data != null) {
      setSleepSession(sleepSessionRequest.data);
    } else {
      setSleepSession(undefined);
    }
  }, [sleepSessionRequest.data]);

  const rest: Omit<Request, 'data'> = lastValidRequest([
    familyUsersRequest,
    sleepSessionRequest,
  ]);

  return {
    ...rest,
    user,
    sleepSession,
  };
};
