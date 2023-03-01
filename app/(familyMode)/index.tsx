import { Link, Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

import { Text, View } from "../../components/Themed";
import { FamilyUser, useFamilyUsers } from "../data/family-users";

export default function TabOneScreen() {
  const router = useRouter();
  const { isLoading, data, error, fetchData } = useFamilyUsers();

  function presentData(user: FamilyUser): void {
    router.push({
      pathname: "(familyMode)/",
      params: {
        sleepDataURL: user.sleepDataURL,
        name: user.displayName,
      },
    });
  }

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
          data={data}
          renderItem={({ item }) =>
            SleepListItem(item, () => {
              presentData(item);
            })
          }
        />
        <Text> asdfas whatever man whaaaa t is this</Text>
        <Button onPress={() => fetchData()} title="refetch data" />
      </View>
    </>
  );
}

export function SleepListItem(person: FamilyUser, onTouch: () => void) {
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
