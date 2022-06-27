import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator } from 'react-native';
const UserListView = (props) => {
    const { goForFetch, fromFetch, renderItem, FlatListItemSeparator, dataSource, loading } = props
    return (
        <View>
            <View style={{ margin: 18, display: 'none' }}>
                <Button
                    title={'Get User List'}
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
                    /> : <Text>no data yet</Text>
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
export default UserListView;