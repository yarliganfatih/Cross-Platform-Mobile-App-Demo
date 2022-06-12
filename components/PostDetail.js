import React, { Component } from 'react';
import PostDetailView from '../views/PostDetailView';
import UserDetail from './UserDetail';
import CommentList from './CommentList';

import {
    StyleSheet,
    View,
    Text
} from "react-native";

class PostDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayExtra: (typeof this.props.displayExtra !== 'undefined') ? this.props.displayExtra : true,
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
        const { postid, dataSource, fromFetch, loading, creatorUserId, displayExtra } = this.state
        return (
            <View>

                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.title}
                </Text>
                <PostDetailView
                    goForFetch={this.goForFetch}
                    dataSource={dataSource}
                    loading={loading}
                    fromFetch={fromFetch}
                />

                <CommentList postid={postid} title="Comments" displayExtra={false} />

                {
                    displayExtra ?
                        <UserDetail userid={creatorUserId} title="Creator User Details" displayExtra={false} />
                        : ""
                }
            </View>
        );
    }
}

export default PostDetail;