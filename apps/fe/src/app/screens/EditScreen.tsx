import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import { RootStackParamList } from '../App';
import { ActionType, BlogPost, Context } from '../context/BlogContext';

const EditScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Edit'>;
  route: RouteProp<RootStackParamList, 'Edit'>;
}) => {
  const { state } = useContext(Context);

  const blogPost = state.blogPosts.find(
    (bp: BlogPost) => bp.id === route.params.id
  );

  const { actions } = useContext(Context);
  const [title, setTitle] = useState(blogPost?.title || '');
  const [content, setContent] = useState(blogPost?.content || '');

  return (
    <View>
      <Text style={styles.label}>Enter title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
      />
      <Text style={styles.label}>Enter content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={(content) => setContent(content)}
      />
      <Button
        title="Create"
        onPress={() => {
          actions?.[ActionType.EDIT_BLOG_POST]({
            id: blogPost?.id,
            title,
            content,
          });
          navigation.goBack();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    margin: 5,
  },
});

export default EditScreen;
