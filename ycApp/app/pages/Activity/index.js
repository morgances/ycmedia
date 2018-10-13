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

import Carousel from './components/Carousel';
import Modules from './components/Modules';
import Activity from './components/Activity'

export default class Main extends Component<{}> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '活动',
    tabBarIcon: ({ focused }) => (
      <Image 
        source={focused ? require('../../assets/images/Navigation/activity__active.jpg'): require('../../assets/images/Navigation/activity.jpg')}
        style={styles.iconSize}
      >
      </Image>
    )
  }
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.header_title}>活动</Text>
        </View>
        <ImageBackground style={styles.background} source={require('../../assets/images/Main/background.jpg')}>
          <Carousel></Carousel>
          <ImageBackground style={{height: Styles.Height(26)}} source={require('../../assets/images/Main/border__top.jpg')}></ImageBackground>
          <Modules navigation={this.props.navigation}></Modules>
          <Activity></Activity>
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
