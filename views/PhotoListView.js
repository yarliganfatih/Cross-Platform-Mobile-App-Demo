import React, { Component } from 'react'
import { View, Text, Button, ActivityIndicator } from 'react-native';
import {FlatListSlider} from 'react-native-flatlist-slider';
import Preview from '../views/PhotoListPreview';

const PhotoListView = (props) => {
    const { goForFetch, fromFetch, renderItem, FlatListItemSeparator, dataSource, loading, completed } = props;
    console.log("dataSource :");
    console.log(dataSource);
    return (
        <View>
            <View style={{ margin: 18, display: 'none' }}>
                <Button
                    title={'Get Photo List'}
                    onPress={goForFetch}
                    color='blue'
                />
            </View>

            <View style={{ margin: 18, textAlign: 'center' }}>
                {
                  completed ?
                  <View>
                    {console.log("completed dataSource")}
                    <FlatListSlider
                      data={dataSource}
                      width={275}
                      timer={5000}
                      component={<Preview />}
                      contentContainerStyle={{paddingHorizontal: 16}}
                    />
                  </View> : 'no data yet'
                }
                {
                  loading &&
                    <View>
                        <ActivityIndicator size="large" color="#0c9" />
                        <Text>Fetching Data</Text>
                    </View>
                }
            </View>
        </View>
    )
}
export default PhotoListView;