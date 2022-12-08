import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { Provider as BlogProvider } from './context/BlogContext';
import CreateScreen from './screens/CreateScreen';
import EditScreen from './screens/EditScreen';
import IndexScreen from './screens/IndexScreen';
import ShowScreen from './screens/ShowScreen';

export type RootStackParamList = {
  Index: undefined;
  Show: { id: number };
  Create: undefined;
  Edit: { id: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export const App = () => {
  return (
    <BlogProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Index"
          defaultScreenOptions={{ title: 'Blogs' }}
        >
          <Stack.Screen name="Index" component={IndexScreen} />
          <Stack.Screen name="Show" component={ShowScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BlogProvider>
  );
};

export default App;
