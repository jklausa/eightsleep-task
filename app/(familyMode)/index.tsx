import { Overpass_700Bold } from "@expo-google-fonts/overpass";
import { Link, Stack, useRouter } from "expo-router";
import {
  ActivityIndicator,
  Image,
  Button,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
} from "react-native";

import { Text, useThemeColor, View, ViewProps } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { FamilyUser, useFamilyUsers } from "../data/family-users";

export default function TabOneScreen(props: ViewProps) {
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
    <View>
      <Stack.Screen
        options={{
          title: "Sleep - Family Mode",
        }}
      />
      <FlatList
        style={styles.list}
        data={data}
        ListHeaderComponent={
          <Text style={styles.listHeader}>Select a family member:</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
        renderItem={({ item }) =>
          SleepListItem(item, () => {
            presentData(item);
          })
        }
      />
    </View>
  );
}

export function SleepListItem(person: FamilyUser, onTouch: () => void) {
  // Adding more data to the seed makes the generated images slightly nicer.
  let avatarSeed = `${person.displayName}${person.relationship}${person.sleepDataURL}`;

  let fakeAvatarURI = `https://api.dicebear.com/5.x/initials/png?seed=${avatarSeed}&backgroundColor=ffdfbf,ffb300,fb8c00,fdd835,e53935,d81b60,d1d4f9,c0ca33,f4511e,ffd5dc,00897b,00acc1,1e88e5&backgroundType=gradientLinear&backgroundRotation=360,-360&radius=50`;

  return (
    <TouchableOpacity onPress={onTouch}>
      <View style={styles.listItemContainer}>
        <Image source={{ uri: fakeAvatarURI }} style={styles.image} />
        <View>
          <Text style={styles.personName}>{person.displayName}</Text>
          {!!person.relationship && (
            <Text style={styles.personRelationship}>{person.relationship}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%",
  },
  listHeader: {
    margin: 6,
    padding: 6,
    fontSize: 20,
  },
  listItemContainer: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,

    minHeight: 44,
    padding: 6,
    margin: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    margin: 6,
    marginEnd: 16,
  },
  personName: {
    fontSize: 20,
    fontFamily: "Overpass_700Bold",
  },
  personRelationship: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: "Overpass_300Light",
  },
});
