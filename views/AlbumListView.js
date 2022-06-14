import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
const AlbumListView = (props) => {
    const { goForFetch, fromFetch, renderItem, FlatListItemSeparator, dataSource, loading } = props;

    return (
        <View>
            <View style={{ margin: 18, display: 'none' }}>
                <Button
                    title={'Get Album List'}
                    onPress={goForFetch}
                    color='blue'
                />
            </View>

            <View style={{ margin: 18, textAlign: 'center' }}>
                {fromFetch ?
                    <FlatList
                        data={dataSource}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        renderItem={item => renderItem(item)}
                        keyExtractor={item => item.id}
                    /> : "no data yet"
                }
                {loading &&
                    <View>
                        <ActivityIndicator size="large" color="#0c9" />
                        <Text>Fetching Data</Text>
                    </View>
                }
            </View>
        </View>
    )
}
export default AlbumListView;