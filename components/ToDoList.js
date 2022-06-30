import React, { Component } from 'react';
import ToDoListView from '../views/ToDoListView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class ToDoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            dataSource: [],
        };
    }
    static getDerivedStateFromProps(props, state) {
        let _userid = state.userid;
        if (typeof props.userid !== 'undefined') {
            _userid = props.userid
        }
        if (_userid != state.userid) {
            console.log('changed userid in ToDolist : ', _userid);
            //this.goForFetch() // Error, so =>componentDidUpdate(prevProps)
        }
        return { userid: _userid };
    }
    componentDidUpdate(prevProps, prevState) { // does not detecting
        if (prevState.userid !== this.state.userid) {
            console.log('change detected userid in ToDolist : ', this.state.userid);
            let fetchUrl = "https://jsonplaceholder.typicode.com/todos?userId=" + this.state.userid;
            console.log(fetchUrl);
            this.goForFetch(fetchUrl);
        }
    }
    componentDidMount() {
        this.goForFetch();
    }
    goForFetch = (fetchUrl = "https://jsonplaceholder.typicode.com/todos") => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        console.log(fetchUrl);
        if (typeof this.state.userid !== 'undefined') {
            fetchUrl = fetchUrl + "?userId=" + this.state.userid;
        }
        console.log(fetchUrl);
        var axios = require('axios');
        var config = {
          method: 'get',
          url: fetchUrl,
          headers: { }
        }
        axios(config)
            .then(response => response.data)
            .then((responseJson) => {
                console.log('getting data from api', responseJson)
                this.setState({
                    loading: false,
                    dataSource: responseJson.slice(0, 20),
                })
            })
            .catch(error => console.log(error))
    }
    render() {
        const { dataSource, fromFetch, loading } = this.state
        return (
            <View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.title}
                </Text>
                <ToDoListView
                    dataSource={dataSource}
                    loading={loading}
                    fromFetch={fromFetch}
                />
            </View>
        );
    }
}

export default ToDoList;