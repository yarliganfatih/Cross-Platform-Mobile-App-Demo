import React, { Component } from 'react';
import CommentListView from '../views/CommentListView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            fromFetch: false,
            dataSource: [],
            displayBody: []
        };
    }
    static getDerivedStateFromProps(props, state) {
        let _postid = state.postid;
        if (typeof props.postid !== 'undefined') {
            _postid = props.postid
        }
        if (_postid != state.postid) {
            console.log('changed postid in CommentList : ', _postid);
            //this.goForFetch() // Error, so =>componentDidUpdate(prevProps)
        }
        return { postid: _postid };
    }
    componentDidUpdate(prevProps, prevState) { // does not detecting
        if (prevState.postid !== this.state.postid) {
            console.log('change detected postid in CommentList : ', this.state.postid);
            let fetchUrl = "https://jsonplaceholder.typicode.com/posts/" + this.state.postid + "/comments";
            console.log(fetchUrl);
            this.goForFetch(fetchUrl);
        }
    }
    componentDidMount() {
        this.goForFetch();
    }
    goForFetch = (fetchUrl = "https://jsonplaceholder.typicode.com/comments") => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        console.log(fetchUrl);
        if (typeof this.state.postid !== 'undefined') {
            fetchUrl = "https://jsonplaceholder.typicode.com/posts/" + this.state.postid + "/comments";
        }
        console.log(fetchUrl);
        var axios = require('axios');
        var config = {
            method: 'get',
            url: fetchUrl,
            headers: {}
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
                style={[{ padding: 10 }, data.item.id % 2 && { backgroundColor: '#ffffff' }]}
                onPress={() => {
                    // may be dropdown
                    let blankArr = []
                    blankArr[data.item.id] = 1;
                    this.setState({
                        displayBody: blankArr,
                    })
                }}
            >
                <Text style={{ fontWeight: 'bold', textAlign: 'left' }}>{data.item.name}</Text>
                <Text style={{ paddingLeft: 10, paddingRight: 10, textAlign: 'left' }}> {this.state.displayBody[data.item.id] ? data.item.body : ''} </Text>
                <Text style={{ color: 'gray', fontStyle: 'italic', textAlign: 'right' }}>{data.item.email}</Text>
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
                <Text style={{ color: 'gray', fontStyle: 'italic', textAlign: 'center' }}>
                    (Click for bodies)
                </Text>
                <CommentListView
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

export default CommentList;