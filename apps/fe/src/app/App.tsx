import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import { BlogProvider } from './context/BlogContext';
import IndexScreen from './screens/IndexScreen';

const Stack = createNativeStackNavigator();

export const App = () => {
  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Index"
          defaultScreenOptions={{ title: 'Blogs' }}
        >
          <Stack.Screen name="Index" component={IndexScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  );
};
const styles = StyleSheet.create({});

export default App;
