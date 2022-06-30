import React, { Component } from 'react';
import { View, Text, Button, ActivityIndicator, StyleSheet, TouchableOpacity, Image } from 'react-native';
import UserCardView from '../views/UserCardView'

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displayExtra: (typeof this.props.displayExtra !== 'undefined') ? this.props.displayExtra : true,
      loading: false,
      fromFetch: false,
      dataSource: [],
    };
  }

  static getDerivedStateFromProps(props, state) {
    let _userid = state.userid;
    if (typeof props.route !== 'undefined') {
      _userid = props.route.params.userid
    } else if (typeof props.userid !== 'undefined') {
      _userid = props.userid
    }
    if (_userid != state.userid) {
      console.log('changed userid in getDerivedStateFromProps : ', _userid);
      //this.goForFetch() // Error, so =>componentDidUpdate(prevProps)
    }
    return { userid: _userid };
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.userid !== this.state.userid) {
      console.log('change detected userid in componentDidUpdate : ', this.state.userid);
      this.goForFetch(); //example calling redux action
    }
  }

  //componentWillMount is unnecessary
  componentDidMount() {
    this.goForFetch()
  }
  goForFetch = () => {
    this.setState({
      fromFetch: true,
      loading: true,
    })
    var axios = require('axios');
    var config = {
      method: 'get',
      url: "https://jsonplaceholder.typicode.com/users/" + this.state.userid,
      headers: {}
    }
    axios(config)
      .then(response => response.data)
      .then((responseJson) => {
        console.log('getting data from api', responseJson)
        this.setState({
          loading: false,
          dataSource: responseJson
        })
      })
      .catch(error => console.log(error))
  }

  render() {
    const { dataSource, fromFetch, loading, displayExtra } = this.state
    return (
      <View>

        <Text style={{ fontWeight: 'bold', textAlign: 'center' }}>
          {this.props.title}
        </Text>
        <View>
          <View style={{ margin: 18, display: 'none' }}>
            <Button
              title={'Get User Detail'}
              onPress={this.goForFetch}
              color='blue'
            />
          </View>

          <View style={{ margin: 18, textAlign: 'center' }}>
            {fromFetch ?
              <UserCardView
                dataSource={dataSource}
                navigation={this.props.navigation}
              >
              </UserCardView> :
              <Text>no data yet</Text>
            }
            {loading &&
              <View>
                <ActivityIndicator size="large" color="#0c9" />
                <Text>Fetching Data</Text>
              </View>
            }
          </View>
        </View>
      </View>
    );
  }
}

export default UserCard;