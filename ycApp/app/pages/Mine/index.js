/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, StyleSheet, View, ScrollView, Image, ImageBackground } from 'react-native';

import Styles from '../../res/Styles';
import Colors from '../../res/Colors';
import FontSize from '../../res/Fonts/size';

import User from './components/User'
import Modules from './components/Modules'


export default class Main extends Component<{}> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '我的',
    tabBarIcon: ({ focused }) => (
      <Image 
        source={focused ? require('../../assets/images/Navigation/user__active.jpg'): require('../../assets/images/Navigation/user.jpg')}
        style={styles.iconSize}
      >
      </Image>
    ),
  }
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.header_title}>我的</Text>
        </View>
        <ImageBackground style={styles.background} source={require('../../assets/images/Main/background.jpg')}>
          <User navigation={this.props.navigation}></User>
          <Modules></Modules>
        </ImageBackground>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    height: Styles.Height(88),
    backgroundColor: Colors.primary,
    alignItems: 'center'
  },
  header_title: {
    color: Colors.white,
    fontSize: FontSize.large,
    marginTop: Styles.Height(18)
  },
  iconSize: {
    height: Styles.Height(48),
    width: Styles.Width(48),
    marginBottom: Styles.Height(-10)
  },
  background: {
    width: Styles.Width()
  }
})
