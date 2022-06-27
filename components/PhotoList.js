import React, { Component } from 'react';
import PhotoListView from '../views/PhotoListView';
import Preview from '../views/PhotoListPreview';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    Text,
    TouchableOpacity
} from "react-native";
import {FlatListSlider} from 'react-native-flatlist-slider';

class PhotoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            completed: false,
            fromFetch: false,
            dataSource: [],
            displayBody: [],
        };
    }
    static getDerivedStateFromProps(props, state) {
        let _albumid = state.albumid;
        if (typeof props.route !== 'undefined') {
            _albumid = props.route.params.albumid
        } else if (typeof props.albumid !== 'undefined') {
            _albumid = props.albumid
        }
        if (_albumid != state.albumid) {
            console.log('changed albumid in PhotoList : ', _albumid);
            //this.goForFetch() // Error, so =>componentDidUpdate(prevProps)
        }
        return { albumid: _albumid };
    }
    componentDidUpdate(prevProps, prevState) { // does not detecting
        if (prevState.albumid !== this.state.albumid) {
            console.log('change detected albumid in PhotoList : ', this.state.albumid);
            let fetchUrl = "https://jsonplaceholder.typicode.com/albums/" + this.state.albumid + "/photos";
            console.log(fetchUrl);
            this.goForFetch(fetchUrl);
        }
    }
    componentDidMount() {
        this.goForFetch();
    }
    goForFetch = (fetchUrl = "https://jsonplaceholder.typicode.com/albums/1/photos") => {
        this.setState({
            fromFetch: true,
            loading: true,
        })
        console.log(fetchUrl);
        if (typeof this.state.albumid !== 'undefined') {
            fetchUrl = "https://jsonplaceholder.typicode.com/albums/" + this.state.albumid + "/photos";
        }
        console.log(fetchUrl);

        fetch(fetchUrl)
            .then(response => response.json())
            .then((responseJson) => {
                console.log('getting data from api', responseJson)
                this.setState({
                    loading: false,
                    dataSource: responseJson.slice(0,20).map(({
                      url: image,
                      title: desc,
                      ...rest
                    }) => ({
                      image,
                      desc,
                      ...rest
                    })),
                    completed: true
                });
            })
            .catch(error => console.log(error))
    }

    render() {
        const { dataSource, fromFetch, loading, completed } = this.state
        return (
            <View>
                <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
                    {this.props.title}
                </Text>
                <Text style={{ color: 'gray', fontWeight: 'bold', textAlign: 'center', marginTop: 15 }}>
                    Photo Swiper
                </Text>
                <PhotoListView
                    goForFetch={this.goForFetch}
                    dataSource={dataSource}
                    loading={loading}
                    completed={completed}
                    fromFetch={fromFetch}
                />
            </View>
        );
    }
}

export default PhotoList;