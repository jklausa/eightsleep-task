import { Stack, usePathname, useSearchParams } from "expo-router";
import { Text } from "react-native";
import { View } from "../../components/Themed";
import {
  isSupportedUser,
  SupportedUser,
  useSleepSession,
} from "../data/sleep-session";

export default function Details() {
  const searchParams = useSearchParams();
  const userString = searchParams.user;
  const nameString = searchParams.name;

  let isValidUser =
    typeof userString == "string" ? isSupportedUser(userString) : false;
  // Not sure if being this defensive about the values we accept is usual/common in RN world, but coming from Swift ensuring that we're passed a *valid* object.

  if (!isValidUser) {
    return <ErrorScreen passedValue={userString} />;
  }

  let user = userString as SupportedUser;

  const { isLoading, data, error, fetchData } = useSleepSession(user);

  return (
    <>
      {!!nameString && (
        <Stack.Screen
          options={{
            title: `Sleep - ${nameString}`,
          }}
        />
      )}
      {isValidUser && <Text> This is a valid user</Text>}
      <Text>userString: {userString}</Text>
    </>
  );
}

interface ErrorScreenProps {
  passedValue: string | string[] | undefined;
}

function ErrorScreen({ passedValue }: ErrorScreenProps) {
  return (
    <View>
      <Text>An invalid user object has been passed to this screen.</Text>
      <Text>The passed value was: {passedValue}</Text>
    </View>
  );
}
