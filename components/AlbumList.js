import React, { Component } from 'react';
import AlbumListView from '../views/AlbumListView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class AlbumList extends Component {
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
            console.log('changed userid in Albumlist : ', _userid);
            //this.goForFetch() // Error, so =>componentDidUpdate(prevProps)
        }
        return { userid: _userid };
    }
    componentDidUpdate(prevProps, prevState) { // does not detecting
        if (prevState.userid !== this.state.userid) {
            console.log('change detected userid in Albumlist : ', this.state.userid);
            let fetchUrl = "https://jsonplaceholder.typicode.com/albums?userId=" + this.state.userid;
            console.log(fetchUrl);
            this.goForFetch(fetchUrl);
        }
    }
    componentDidMount() {
        this.goForFetch();
    }
    goForFetch = (fetchUrl = "https://jsonplaceholder.typicode.com/albums") => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        console.log(fetchUrl);
        if (typeof this.state.userid !== 'undefined') {
            fetchUrl = fetchUrl + "?userId=" + this.state.userid;
        }
        console.log(fetchUrl);

        fetch(fetchUrl)
            .then(response => response.json())
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
                style={[{ padding: 5 }, data.item.id % 2 && { backgroundColor: '#ffffff' }]}
                onPress={() => {

                    console.log('pressed id :', data.item.id); //TODO Router PostDetail
                    this.props.navigation.navigate('Photo List', {
                        albumid: data.item.id,
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
            <View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.title}
                </Text>
                <AlbumListView
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

export default AlbumList;