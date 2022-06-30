import React, { Component } from 'react';
import UserListView from '../views/UserListView';
import UserCardView from '../views/UserCardView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    Image,
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
        var axios = require('axios');
        var config = {
            method: 'get',
            url: "https://jsonplaceholder.typicode.com/users",
            headers: {}
        }
        axios(config)
            .then(response => response.data)
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
            //UserCardView
            <TouchableOpacity
                style={{ padding: 10, backgroundColor: '#ffffff', borderRadius: 15, marginBottom: 5 }}
                onPress={() => {

                    console.log('pressed id :', data.item.id);
                    this.props.navigation.navigate('User Detail', {
                        userid: data.item.id,
                    });
                }}
            >
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: "start" }}>
                    <Image source={require('../assets/default_pp.png')} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    <View style={{ flexDirection: 'column', paddingLeft: 10, justifyContent: "start" }}>
                        <Text style={{ fontWeight: 600 }}>{data.item.name}</Text>
                        <Text style={{ textAlign: "left" }}>@{data.item.username}#{data.item.id}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )

    }
    render() {
        const { dataSource, fromFetch, loading } = this.state
        return (
            <View>

                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.title}
                </Text>
                <UserListView
                    goForFetch={this.goForFetch}
                    dataSource={dataSource}
                    loading={loading}
                    fromFetch={fromFetch}
                    FlatListSeparator={this.FlatListSeparator}
                    renderItem={this.renderItem}
                />
            </View>
        );
    }
}

export default UserList;