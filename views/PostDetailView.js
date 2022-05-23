import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

function ObjToArr(Obj){
  if(typeof(Obj)=="object"){
    let Arr = Object.keys(Obj).map(function(key) {
      return " "+ObjToArr(Obj[key])
    });
    return Arr;
  }else{
    return Obj;
  }
}
const UserDetailView = (props) => {
    const { goForFetch, fromFetch, dataSource, loading } = props
    let HeadTable = Object.keys(dataSource)
    let DataTable = ObjToArr(dataSource).map(a => [a])
    let DataHeights = [28,28,56,224] //can be rendered by data length
    //let DataTable = Object.values(dataSource).slice(0,4) // [5] error
    return (
        <View>
            <View style={{ margin: 18 }}>
                <Button
                    title={'Get Post Detail'}
                    onPress={goForFetch}
                    color='blue'
                />
            </View>

            <View style={{ margin: 18, textAlign: 'center' }}>
            {fromFetch ?
              <ScrollView vertical={true}>
                <Table borderStyle={{borderWidth: 1}}>
                  <TableWrapper style={styles.wrapper}>
                    <Col data={HeadTable} style={styles.title} heightArr={DataHeights} textStyle={styles.text}/>
                    <Rows data={DataTable} flexArr={[2, 1]} heightArr={DataHeights} textStyle={styles.text}/>
                  </TableWrapper>
                </Table>
              </ScrollView> :
              "no data yet"
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

const styles = StyleSheet.create({
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa', width: 70 },
  text: { textAlign: 'center' }
});

export default UserDetailView;