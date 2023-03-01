import { Link, Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { SupportedUser, useSleepSession } from "../data/sleep-session";

interface SleepListPerson {
  user: SupportedUser;
  displayName: string;
  relationship?: string;
}

export default function TabOneScreen() {
  const MOCKED_DATA: SleepListPerson[] = [
    {
      user: "user1",
      displayName: "Steve",
    },
    {
      user: "user2",
      displayName: "Eve",
      relationship: "Daughter",
    },
    {
      user: "user3",
      displayName: "Harold",
      relationship: "Husband",
    },
  ];

  const router = useRouter();
  const { isLoading, data, error, fetchData } = useSleepSession("user2");

  const presentData = (user: SupportedUser) => {
    router.push({
      pathname: "(familyMode)/",
      params: {
        user: "user1",
      },
    });
    // router.push({"(familyMode)/");
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Sleep - Family Mode",
        }}
      />
      <View style={styles.container}>
        <Text style={styles.title}>fuuuu ck One</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <FlatList
          style={{ width: "100%" }}
          data={MOCKED_DATA}
          renderItem={({ item }) =>
            SleepListItem(item, () => {
              presentData(item.user);
            })
          }
        />
        <Text> asdfas whatever man whaaaa t is this</Text>
        <Button onPress={() => fetchData()} title="refetch data" />
        <EditScreenInfo path="app/(tabs)/index.tsx" />
      </View>
    </>
  );
}

export function SleepListItem(person: SleepListPerson, onTouch: () => void) {
  return (
    <View style={styles.listItemContainer}>
      <Pressable onPress={onTouch}>
        <Text style={styles.title}>{person.displayName}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  listItemContainer: {
    backgroundColor: "purple",
    borderRadius: 20,
    minHeight: 44,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
