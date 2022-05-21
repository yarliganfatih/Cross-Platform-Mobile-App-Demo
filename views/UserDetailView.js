import React, { Component } from 'react'
import { View, Text, Button, FlatList, ActivityIndicator, ScrollView } from 'react-native';
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
    let DataTable = ObjToArr(dataSource)
    //let DataTable = Object.values(dataSource).slice(0,4) // [5] error
    return (
        <View>
            <View style={{ margin: 18 }}>
                <Button
                    title={'Get User Detail'}
                    onPress={goForFetch}
                    color='blue'
                />
            </View>

<View style={{ margin: 18, textAlign: 'center' }}>
            {fromFetch ?
              <ScrollView horizontal={true}>
                <Table borderStyle={{borderWidth: 1, borderColor: 'blue'}}>
                  <TableWrapper>
                    <Row data={HeadTable} />
                    <Rows data={[DataTable]} />
                    { /* //TODO Horizontal table
                    <Cols data={DataTable.map(a => [a])} />
                    */ }
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
export default UserDetailView;