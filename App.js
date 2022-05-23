import * as React from 'react';
import { Button, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';

function GoToButton({ screenName }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity style={styles.NavigateBtn}
      onPress={() => navigation.navigate(screenName)}
    >
      <Text style={styles.NavigateBtnTxt}>
        {screenName}
      </Text>
    </TouchableOpacity>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="User List">
        <Stack.Screen name="User List" component={UserList} />
        <Stack.Screen name="User Detail" component={UserDetail} />
        <Stack.Screen name="Post List" component={PostList} />
        <Stack.Screen name="Post Detail" component={PostDetail} />
      </Stack.Navigator>
      <View style={styles.NavigateBtnContainer}>
        <GoToButton screenName="User List" />
        <GoToButton screenName="Post List" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  NavigateBtnContainer: {
    flex: 1,
    flexDirection: 'row',
    position: 'fixed',
    bottom: 0,
    width: "100%",
  },
  NavigateBtn: {
    width: "50%",
  },
  NavigateBtnTxt: {
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
    backgroundColor: "blue",
    padding: 10,
    overflow: "hidden",
  },
});

export default App;
