import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AccountsView from './views/AccountsView';
import LoginView from './views/LoginView';
import PostsView from './views/PostsView';
import PostView from './views/PostView';
import CommentsView from './views/CommentsView';
import CreatePostView from './views/CreatePostView';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Accounts'>
        <Stack.Screen name='Accounts' component={AccountsView} />
        <Stack.Screen name='Login' component={LoginView} />
        <Stack.Screen name='Posts' component={PostsView} />
        <Stack.Screen name='Post' component={PostView} />
        <Stack.Screen name='Comments' component={CommentsView} />
        <Stack.Screen name='CreatePost' component={CreatePostView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
