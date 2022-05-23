import React, { Component } from 'react';
import PostDetailView from '../views/PostDetailView';
import UserDetail from './UserDetail';

import {
    StyleSheet,
    View,
    Text
} from "react-native";

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            dataSource: [],
        };
    }
    componentWillMount() {
        let _postid = this.state.postid;
        if (typeof this.props.route !== 'undefined') {
            _postid = this.props.route.params.postid
        } else if (typeof this.props.postid !== 'undefined') {
            _postid = this.props.postid
        } else {
            //_postid = 1
        }
        this.setState({
            postid: _postid,
        })
    }
    componentDidMount() {
        this.goForFetch()
    }
    goForFetch = () => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        fetch("https://jsonplaceholder.typicode.com/posts/" + this.state.postid)
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from api', responseJson)
                this.setState({
                    loading: false,
                    dataSource: responseJson,
                    creatorUserId: responseJson.userId
                })
            })
            .catch(error => console.log(error))
    }

    renderUser = () => {
        return (
            <UserDetail userid={this.state.creatorUserId} />
        )
    }

    render() {
        const { dataSource, fromFetch, loading, creatorUserId } = this.state
        return (
            <View>
                <PostDetailView
                    goForFetch={this.goForFetch}
                    dataSource={dataSource}
                    loading={loading}
                    fromFetch={fromFetch}
                />
                <UserDetail userid={creatorUserId} />
            </View>
        );
    }
}

export default PostDetail;