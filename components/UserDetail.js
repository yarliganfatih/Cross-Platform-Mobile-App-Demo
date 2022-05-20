import React, { Component } from 'react';
import UserDetailView from '../views/UserDetailView';
import {
    StyleSheet,
    View,
    Text
} from "react-native";

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            dataSource: [],
        };
    }
    goForFetch = () => {
        this.setState({
            fromFetch: true,
            loading: true,

        })
        fetch("https://jsonplaceholder.typicode.com/users/"+this.props.id)
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

    render() {
        const { dataSource, fromFetch, loading } = this.state
        return ( 
            <UserDetailView
                goForFetch={this.goForFetch}
                dataSource={dataSource}
                loading={loading}
                fromFetch={fromFetch}
            />
        );
    }
}

export default UserDetail;