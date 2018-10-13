/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StyleSheet, ImageBackground, Image } from 'react-native';

import Styles from '../../res/Styles'

import Carousel from './components/Carousel'
import Modules from './components/Modules'
import News from './components/News'

export default class Main extends Component<{}> {
  static navigationOptions = {
    header: null,
    tabBarLabel: '首页',
    tabBarIcon: ({ focused }) => (
      <Image 
        source={focused ? require('../../assets/images/Navigation/home__active.jpg'): require('../../assets/images/Navigation/home.jpg')}
        style={styles.iconSize}
      >
      </Image>
    )
  }
  
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <ImageBackground style={styles.background} source={require('../../assets/images/Main/background.jpg')}>
          <Carousel></Carousel>
          <ImageBackground style={{height: Styles.Height(26)}} source={require('../../assets/images/Main/border__top.jpg')}></ImageBackground>
          <Modules navigation={this.props.navigation}></Modules>
          <News></News>
        </ImageBackground>
      </ScrollView>
    )
  }
}


const styles = StyleSheet.create({
  background: {
    width: Styles.Width()
  },
  iconSize: {
    height: Styles.Height(48),
    width: Styles.Width(48),
    marginBottom: Styles.Height(-10)
  }
})
