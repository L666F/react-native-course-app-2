import { FontAwesome5 } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { RootStackParamList } from '../App';
import { BlogPost, Context } from '../context/BlogContext';

const ShowScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Show'>;
  route: RouteProp<RootStackParamList, 'Show'>;
}) => {
  const { state } = useContext(Context);
  const blogPost = state.blogPosts.find(
    (bp: BlogPost) => bp.id === route.params.id
  );

  React.useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Edit', { id: blogPost?.id || 0 })}
        >
          <FontAwesome5 name="edit" size={20} />
        </TouchableOpacity>
      ),
    });
  });

  return (
    <View style={styles.view}>
      <Text style={styles.title}>{blogPost?.title}</Text>
      <Text style={styles.content}>{blogPost?.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 5,
  },
  content: {
    margin: 5,
    fontSize: 14,
  },
});

export default ShowScreen;
