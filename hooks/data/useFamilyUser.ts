import { useFamilyUsers } from './useFamilyUsers';

export const useFamilyUser = (displayName: string) => {
  const { data: familyUsers, ...rest } = useFamilyUsers();

  const user = familyUsers?.find((user) => user.displayName === displayName);

  return {
    data: user,
    ...rest,
  };
};
