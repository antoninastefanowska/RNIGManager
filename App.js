import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccountsView from './views/AccountsView';
import LoginView from './views/LoginView';
import PostsView from './views/PostsView';
import PostView from './views/PostView';
import OembedView from './views/OembedView';
import CreatePostView from './views/CreatePostView';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Accounts'>
        <Stack.Screen name='Accounts' component={AccountsView} options={{headerShown: false}} />
        <Stack.Screen name='Login' component={LoginView} options={{headerShown: false}} />
        <Stack.Screen name='Posts' component={PostsView} options={{headerShown: false}} />
        <Stack.Screen name='Post' component={PostView} options={{headerShown: false}} />
        <Stack.Screen name='Oembed' component={OembedView} options={{headerShown: false}} />
        <Stack.Screen name='CreatePost' component={CreatePostView} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
