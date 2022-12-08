import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';

import { RootStackParamList } from '../App';
import BlogPostForm from '../components/BlogPostForm';
import { ActionType, Context } from '../context/BlogContext';

const CreateScreen = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Create'>;
}) => {
  const { actions } = useContext(Context);

  return (
    <BlogPostForm
      onSubmit={(title, content) => {
        actions?.[ActionType.ADD_BLOG_POST]({ title, content });

        navigation.goBack();
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
