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
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
        data={data}
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

  console.log(fakeAvatarURI);
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
  listItemContainer: {
    borderWidth: 1,
    borderColor: "red",
    borderRadius: 10,

    minHeight: 44,
    padding: 5,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    margin: 5,
    marginEnd: 16,
  },
  personName: {
    fontSize: 18,
    fontWeight: "900",
  },
  personRelationship: {
    fontSize: 14,
    fontWeight: "300",
    marginTop: 4,
  },
});
