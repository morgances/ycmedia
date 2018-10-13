/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Tabs } from 'antd-mobile-rn'

import Styles from '../../../res/Styles'
import Colors from '../../../res/Colors'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '书香银川',
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
      <Text style={{ height: Styles.Height(34), width: Styles.Width(34), marginRight: Styles.Width(30)}}></Text>
    ),
  }
  render() {
    return (
      <View style={{flex: 1}}>
      </View>
    );
  }
}
