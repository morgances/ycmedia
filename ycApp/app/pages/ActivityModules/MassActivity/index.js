/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'

import Styles from '../../../res/Styles'
import Colors from '../../../res/Colors'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '群文活动',
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerRight: (
      <Image style={{ height: Styles.Height(34), width: Styles.Width(34), marginRight: Styles.Width(30)}} source={require('../../../assets/images/Total/search.jpg')}></Image>
    ),
  }
  render() {
    return (
      <View style={{flex: 1}}>
      </View>
    );
  }
}
