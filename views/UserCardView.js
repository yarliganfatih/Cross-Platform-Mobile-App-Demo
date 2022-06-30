import React, { Component } from 'react'
import { View, Text, Button, Image, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
const UserCardView = (props) => {
  const { dataSource, loading } = props
  return (
    <TouchableOpacity
      style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 15, marginBottom: 5 }}
      onPress={() => {

        console.log('pressed id :', dataSource.id);
        this.props.navigation.navigate('User Detail', {
          userid: dataSource.id,
        });
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: "start" }}>
        <Image source={require('../assets/default_pp.png')} style={{ width: 40, height: 40, borderRadius: 20 }} />
        <View style={{ flexDirection: 'column', paddingLeft: 10, justifyContent: "start" }}>
          <Text style={{ fontWeight: 600 }}>{dataSource.name}</Text>
          <Text style={{ textAlign: "left" }}>@{dataSource.username}#{dataSource.id}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default UserCardView;