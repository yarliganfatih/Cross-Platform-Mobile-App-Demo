import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

const callAPI = async (url) => {
    return fetch(url)
    .then((response) => response.json())
    .then((responseJson) => {
    return responseJson;
    })
    .catch((error) => {
    console.error(error);
    });
}

var DATA = [
    {
      id: '1',
      name: 'First Item',
    },
    {
      id: '2',
      name: 'Second Item',
    },
    {
      id: '3',
      name: 'Third Item',
    },
  ];

(async () => {
    DATA = await callAPI("https://jsonplaceholder.typicode.com/users").then();
})();
  
  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
export default function UserList() {
  const renderItem = ({ item }) => (
    <Item title={item.name} />
  );
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
    },
    item: {
      backgroundColor: '#bbbbbb',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
  });
