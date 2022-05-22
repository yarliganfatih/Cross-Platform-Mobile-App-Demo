import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <Button
      style={{ width: "50%" }}
      title={`           ${screenName}           `}
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
        <Stack.Screen name="Post List" component={PostList} />
        <Stack.Screen name="Post Detail" component={PostDetail} />
      </Stack.Navigator>
      <View style={{ flexDirection: "row", width: "100%" }}>
        <GoToButton screenName="User List" />
        <GoToButton screenName="Post List" />
      </View>
    </NavigationContainer>
  );
}

export default App;
