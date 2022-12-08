import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { RootStackParamList } from '../App';
import BlogPostForm from '../components/BlogPostForm';
import { ActionType, BlogPost, Context } from '../context/BlogContext';

const EditScreen = ({
  navigation,
  route,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Edit'>;
  route: RouteProp<RootStackParamList, 'Edit'>;
}) => {
  const { state, actions } = useContext(Context);

  const blogPost = state.blogPosts.find(
    (bp: BlogPost) => bp.id === route.params.id
  );

  return (
    <BlogPostForm
      initialValues={blogPost}
      onSubmit={(title, content) => {
        actions?.[ActionType.EDIT_BLOG_POST]({
          id: blogPost?.id,
          title,
          content,
        });

        navigation.goBack();
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
