import { ActivityIndicator, Button, FlatList, StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import { useSleepSession } from "../data/sleep-session";

export default function TabOneScreen() {
  const sleepData = useSleepSession("user2");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Taaaa b One</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {sleepData.isLoading && <ActivityIndicator />}
      {!!sleepData.data && (
        <FlatList
          data={sleepData.data.intervals[0].stages}
          renderItem={(item) => (
            <Text>
              Stage: {item.item.stage}, duration: {item.item.duration}
            </Text>
          )}
        />
      )}
      <Text> asdfas whatever man whaaaa t is this</Text>
      <Button onPress={() => sleepData.fetchData()} title="refetch data" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
