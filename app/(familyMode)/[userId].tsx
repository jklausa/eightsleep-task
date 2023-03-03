import { FontAwesome } from "@expo/vector-icons";
import { Stack, useSearchParams } from "expo-router";

import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableHighlight,
  useColorScheme,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";

import { Text, useThemeColor, View } from "../../components/Themed";
import { useSleepSession } from "../data/sleep-session";
import Colors from "../../constants/Colors";

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

  const isFakeError = true;

  return (
    <>
      <Stack.Screen
        options={{
          title: `${name}`,
        }}
      />
      {isLoading && (
        <View style={styles.spinnerContainer}>
          <ActivityIndicator size={"large"} />
        </View>
      )}
      {!isLoading && (
        <View style={styles.container}>
          {isFakeError && (
            <NetworkLoadingError onTapReload={() => fetchData()} />
          )}
          {!isFakeError && <Text>userString: {name}</Text>}
        </View>
      )}
    </>
  );
}

function NetworkLoadingError({ onTapReload }: { onTapReload: () => void }) {
  const tintColor = useThemeColor({}, "tint");
  const themeTextColor = useThemeColor({}, "text");
  const scheme = useColorScheme() ?? "light";

  const textColor = scheme == "dark" ? Colors.dark.background : themeTextColor;

  return (
    <View style={networErrorStyles.networkErrorContainer}>
      <Text style={networErrorStyles.text}>
        Failed loading data from the network.
      </Text>
      <Text style={networErrorStyles.text}>
        Check that your internet connection is working and retry.
      </Text>
      <View style={networErrorStyles.button}>
        <AntDesign.Button
          name="reload1"
          onPress={({}) => {
            onTapReload();
          }}
          color={textColor}
          backgroundColor={tintColor}
          style={{
            margin: 4,
          }}
        >
          Retry
        </AntDesign.Button>
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 12,
  },
  spinnerContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
});

const networErrorStyles = StyleSheet.create({
  networkErrorContainer: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    margin: 6,
  },
  button: {
    margin: 16,
    alignSelf: "center",
  },
});

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
