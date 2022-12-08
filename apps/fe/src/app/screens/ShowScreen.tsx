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
    <View>
      <Text>ID: {blogPost?.id}</Text>
      <Text>Title: {blogPost?.title}</Text>
      <Text>Content: {blogPost?.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
