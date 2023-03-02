import { Overpass_700Bold } from "@expo-google-fonts/overpass";
import { Stack, usePathname, useSearchParams } from "expo-router";

import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useSleepSession } from "../data/sleep-session";

export default function Details() {
  const { name, sleepDataURL } = useSearchParams();

  if (typeof sleepDataURL !== "string") {
    return (
      <ErrorScreen errorMessage="Couldn't parse URL for the users sleep data." />
    );
  }

  if (typeof name !== "string") {
    return (
      <ErrorScreen errorMessage="Couldn't parse the name for the users sleep data." />
    );
  }

  return <DetailsScreen sleepDataURL={sleepDataURL} name={name} />;
}

function DetailsScreen({
  sleepDataURL,
  name,
}: {
  sleepDataURL: string;
  name: string;
}) {
  const { isLoading, data, error, fetchData } = useSleepSession(sleepDataURL);

  return (
    <View>
      <Stack.Screen
        options={{
          title: `${name}`,
        }}
      />
      {/* {isValidUser && <Text> This is a valid user</Text>} */}
      <Text>userString: {name}</Text>
    </View>
  );
}

function ErrorScreen({ errorMessage }: { errorMessage?: string }) {
  return (
    <View style={errorStyles.container}>
      <Text style={errorStyles.header}>An unrecoverable error occured.</Text>
      <Text style={errorStyles.subHeader}>
        Please return to the previous screen.
      </Text>
      {!!errorMessage && (
        <>
          <Text style={errorStyles.subHeader}>Error description:</Text>
          <Text style={errorStyles.errorMessage}>{errorMessage}</Text>
        </>
      )}
    </View>
  );
}

const errorStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  header: {
    fontSize: 30,
    fontFamily: "Overpass_700Bold",
  },
  subHeader: {
    fontSize: 20,
    fontFamily: "Overpass_400Regular",
  },
  errorMessage: {
    padding: 4,
    fontFamily: "SpaceMono",
    fontSize: 16,
    backgroundColor: "#e5e5e5",
  },
});
