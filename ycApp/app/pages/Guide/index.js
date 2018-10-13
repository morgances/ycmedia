/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import Styles from '../../res/Styles';

export default class Main extends Component<{}> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '导航',
    tabBarIcon: ({ focused }) => (
      <Image 
        source={focused ? require('../../assets/images/Navigation/guide__active.jpg'): require('../../assets/images/Navigation/guide.jpg')}
        style={styles.iconSize}
      >
      </Image>
    )
  }
  render() {
    return (
      <View>
        <Text style={styles.fontFamily}>原谅我这一生不羁放荡爱自由</Text>
        <Text>原谅我这一生不羁放荡爱自由</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconSize: {
    height: Styles.Height(48),
    width: Styles.Width(48),
    marginBottom: Styles.Height(-10)
  },
  fontFamily: {
    fontFamily: 'Kaiti'
  }
})
