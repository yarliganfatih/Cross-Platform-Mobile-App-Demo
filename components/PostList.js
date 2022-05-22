import React, { Component } from 'react';
import PostListView from '../views/PostListView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class PostList extends Component {
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
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from api', responseJson)
                this.setState({
                    loading: false,
                    dataSource: responseJson.slice(0, 20)
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

                    console.log('pressed id :', data.item.id); //TODO Router PostDetail
                    this.props.navigation.navigate('Post Detail', {
                        postid: data.item.id,
                    });
                }}
            >
                <Text>{data.item.title}</Text>
            </TouchableOpacity>
        )

    }
    render() {
        const { dataSource, fromFetch, loading } = this.state
        return (
            <PostListView
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

export default PostList;