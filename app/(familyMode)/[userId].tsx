import { usePathname, useSearchParams } from "expo-router";
import { useRouter } from "expo-router/src/link/useRouter";
import { Text } from "react-native";
import { isSupportedUser, SupportedUser } from "../data/sleep-session";

export default function Details() {
  const router = useRouter();
  const userString = useSearchParams().user;
  const pathname = usePathname();

  let isValidUser =
    typeof userString == "string" ? isSupportedUser(userString) : false;
  let user = userString as SupportedUser;

  return (
    <>
      {isValidUser && <Text> This is a valid user</Text>}
      <Text>pathname: {pathname} </Text>
      <Text>userString: {userString}</Text>
      <Text onPress={() => router.back()}>Go Back I guess {user}</Text>
    </>
  );
}
