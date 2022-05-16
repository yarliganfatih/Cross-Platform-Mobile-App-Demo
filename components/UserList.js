import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';


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

// Calling API is successful but TODO set result to DATA variable
/*
function getFromAPI(url){
  var obj;
  fetch(url)
    .then(res => res.json())
    .then(data => obj = data)
  return obj;
 }

DATA = getFromAPI('https://jsonplaceholder.typicode.com/users');
*/

/*
async function getUserAsync() 
{
  let response = await fetch("https://jsonplaceholder.typicode.com/users");
  let data = await response.json()
  return data;
}

DATA = getUserAsync().then(data => console.log(data));

*/
/*
var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

DATA = fetch("https://jsonplaceholder.typicode.com/users", requestOptions)
  .then(response => response.text())
  .then((result) => {
    //console.log(result)
    return result;
  })
  .catch(error => console.log('error', error));
*/

//var timeout = setTimeout(function(){console.log(DATA)},5000);
  
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
