import { FontAwesome5 } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../App';
import { ActionType, Context as BlogContext } from '../context/BlogContext';

const IndexScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Index'>;
}) => {
  const { state, actions } = useContext(BlogContext);

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Create')}>
          <FontAwesome5 name="plus" size={20} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id + ''}
        data={state.blogPosts}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Show', { id: item.id || 0 })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    actions?.[ActionType.DELETE_BLOG_POST]({ id: item.id || 0 })
                  }
                >
                  <FontAwesome5 style={styles.icon} name={'trash'} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
