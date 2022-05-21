import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      title={`Go to ${screenName}`}
      onPress={() => navigation.navigate(screenName)}
    />
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="User List" component={UserList} />
        <Stack.Screen name="User Detail" component={UserDetail} />
      </Stack.Navigator>
    <GoToButton screenName="User List" />
    <GoToButton screenName="User Detail" />
    </NavigationContainer>
  );
}

export default App;