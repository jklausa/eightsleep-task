import { Stack, useSearchParams } from "expo-router";

import { StyleSheet } from "react-native";

import { Text, View } from "../../components/Themed";
import { useSleepSession } from "../data/sleep-session";

export default function Details() {
  const { name, sleepDataURL } = useSearchParams();

  // I know the error handling here is probably an overkill and unidiomatic, but
  // because of how the expo-router works (and because we don't have a global-state-of-truth like Redux, which seems
  // like an overkill for this assignment?), I'm sorta... uneasy? about passing the data?
  // Because these could be missing, or mistyped, or anything, so I wanted to handle the errors explicitly here.
  //
  // AIUI, the "blessed" way of doing it would be to have a global store of some sort with a list of all users,
  // and passing an unique identifier, and then fetching an item via that identifier locally within the component.

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
