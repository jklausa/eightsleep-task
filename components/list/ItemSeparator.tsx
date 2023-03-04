import { View, useThemeColor } from '#components/Themed';

export const ItemSeparator = () => {
  const tintColor = useThemeColor({}, 'tint');

  return (
    <View
      style={{
        height: 1,
        width: '100%',
        backgroundColor: tintColor,
        marginVertical: 20,
      }}
    />
  );
};
