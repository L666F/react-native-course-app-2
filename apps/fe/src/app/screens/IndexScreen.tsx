import React, { useContext } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';

import BlogContext from '../context/BlogContext';

const IndexScreen = () => {
  const { data, addBlogPost } = useContext(BlogContext);

  return (
    <View>
      <Text>IndexScreen</Text>

      <Button title="Add post" onPress={addBlogPost} />

      <FlatList
        keyExtractor={(item) => item.title}
        data={data}
        renderItem={({ item }) => {
          return <Text>{item.title}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default IndexScreen;
