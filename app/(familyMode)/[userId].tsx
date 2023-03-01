import { Stack, usePathname, useSearchParams } from "expo-router";
import { Text } from "react-native";
import { View } from "../../components/Themed";
import { useSleepSession } from "../data/sleep-session";

export default function Details() {
  const { name, sleepDataURL } = useSearchParams();

  return (
    <>
      <Stack.Screen
        options={{
          title: `Sleep - ${name}`,
        }}
      />
      {/* {isValidUser && <Text> This is a valid user</Text>} */}
      <Text>userString: {name}</Text>
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
