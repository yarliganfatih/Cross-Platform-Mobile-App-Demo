import React, { Component } from 'react';
import UserListView from '../views/UserListView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            dataSource: [],
        };
    }
  componentDidMount() {
      this.goForFetch()
   }
    goForFetch = () => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from api', responseJson)
                this.setState({
                    loading: false,
                    dataSource: responseJson
                })
            })
            .catch(error => console.log(error))
    }
    FlatListSeparator = () => {
        return (
            <View style={{
                height: .5,
                width: "100%",
                backgroundColor: "rgba(0,0,0,0.5)",
            }}
            />
        );
    } 
    renderItem = (data) => {
        return (
            <TouchableOpacity
            onPress={() => {
              
          console.log('pressed id :',data.item.id); //TODO Router UserDetail
          this.props.navigation.navigate('User Detail', {
                userid: data.item.id,
              });
        }}
            >
                <Text>{data.item.name}</Text>
            </TouchableOpacity>
        )

    }
    render() {
        const { dataSource, fromFetch, loading } = this.state
        return ( 
            <UserListView
                goForFetch={this.goForFetch}
                dataSource={dataSource}
                loading={loading}
                fromFetch={fromFetch}
                FlatListSeparator={this.FlatListSeparator}
                renderItem={this.renderItem}
            />
        );
    }
}

export default UserList;