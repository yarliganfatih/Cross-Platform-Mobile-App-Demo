import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
 
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        React Native Project
      </Text>
      <Card>
        <UserList />
      </Card>
      <Card>
        <UserDetail id="5" />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
