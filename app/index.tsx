import { Link, Stack } from 'expo-router';
import { useCallback } from 'react';
import {
  FlatList,
  Image,
  type ListRenderItem,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Text, View } from '#components/Themed';
import Colors from '#constants/Colors';
import { useFamilyUsers } from '#hooks/data/useFamilyUsers';
import { type FamilyUser } from '#types/family-user';

const hrefForUser = (user: FamilyUser) => ({
  pathname: '/user/[displayName]',
  params: {
    displayName: user.displayName,
  },
});

export default function Index() {
  const { isLoading, data, refetch } = useFamilyUsers();

  // TODO: show errors

  const renderItem = useCallback<ListRenderItem<FamilyUser>>(
    ({ item: user }) => {
      // Adding more data to the seed makes the generated images slightly nicer.
      const avatarSeed = `${user.displayName}${
        user.relationship ?? ''
      }${user.sleepDataURL.toString()}`;

      const fakeAvatarURI = `https://api.dicebear.com/5.x/initials/png?seed=${avatarSeed}&backgroundColor=ffdfbf,ffb300,fb8c00,fdd835,e53935,d81b60,d1d4f9,c0ca33,f4511e,ffd5dc,00897b,00acc1,1e88e5&backgroundType=gradientLinear&backgroundRotation=360,-360&radius=50`;

      return (
        <Link href={hrefForUser(user)} asChild>
          <TouchableOpacity>
            <View style={styles.listItemContainer}>
              <Image source={{ uri: fakeAvatarURI }} style={styles.image} />
              <View>
                <Text style={styles.personName}>{user.displayName}</Text>
                {user.relationship != null && (
                  <Text style={styles.personRelationship}>
                    {user.relationship}
                  </Text>
                )}
              </View>
            </View>
          </TouchableOpacity>
        </Link>
      );
    },
    []
  );

  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Sleep - Family Mode',
        }}
      />
      <FlatList
        style={styles.list}
        data={data}
        ListHeaderComponent={
          <Text style={styles.listHeader}>Select a family member:</Text>
        }
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
  },
  listHeader: {
    margin: 6,
    padding: 6,
    fontSize: 20,
  },
  listItemContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Colors.light.tint,

    minHeight: 44,
    padding: 6,
    margin: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    margin: 6,
    marginEnd: 16,
  },
  personName: {
    fontSize: 20,
    fontFamily: 'Overpass_700Bold',
  },
  personRelationship: {
    fontSize: 16,
    marginTop: 4,
    fontFamily: 'Overpass_300Light',
  },
});
