import React, { Component } from 'react';
import UserDetailView from '../views/UserDetailView';
import PostList from './PostList';

import {
    StyleSheet,
    View,
    Text
} from "react-native";

class UserDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayExtra: (typeof this.props.displayExtra !== 'undefined') ? this.props.displayExtra : true,
            loading: false,
            fromFetch: false,
            dataSource: [],
        };
    }

    static getDerivedStateFromProps(props, state) {
        let _userid = state.userid;
        if (typeof props.route !== 'undefined') {
            _userid = props.route.params.userid
        } else if (typeof props.userid !== 'undefined') {
            _userid = props.userid
        }
        if (_userid != state.userid) {
            console.log('changed userid in getDerivedStateFromProps : ', _userid);
            //this.goForFetch() // Error, so =>componentDidUpdate(prevProps)
        }
        return { userid: _userid };
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.userid !== this.state.userid) {
            console.log('change detected userid in componentDidUpdate : ', this.state.userid);
            this.goForFetch(); //example calling redux action
        }
    }

    //componentWillMount is unnecessary
    componentDidMount() {
        this.goForFetch()
    }
    goForFetch = () => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        fetch("https://jsonplaceholder.typicode.com/users/" + this.state.userid)
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
        const { dataSource, fromFetch, loading, displayExtra } = this.state
        return (
            <View>

                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.title}
                </Text>
                <UserDetailView
                    goForFetch={this.goForFetch}
                    dataSource={dataSource}
                    loading={loading}
                    fromFetch={fromFetch}
                />

                {
                    displayExtra ?
                        <PostList userid={this.state.userid} title="Created Posts" navigation={this.props.navigation} route={this.props.route} />
                        :
                        ""
                }
            </View>
        );
    }
}

export default UserDetail;