import React, { Component } from 'react';
import PhotoListView from '../views/PhotoListView';
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    TouchableOpacity
} from "react-native";

class PhotoList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <PhotoListView>
            </PhotoListView>
        );
    }
}

export default PhotoList;