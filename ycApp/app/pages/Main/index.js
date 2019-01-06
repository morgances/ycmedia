/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StatusBar, View } from 'react-native';

import Colors from '../../res/Colors'
import Size from '../../res/Fonts/size'

import Carousel from './components/Carousel'
import Modules from './components/Modules'
import News from './components/News'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '银川公共文化',
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0,
      shadowOpacity: 0,
      height: 44
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontSize: Size.large,
      fontWeight: null,
      alignSelf: 'center'
    }
  }
  
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <StatusBar  
          animated={true}
          hidden={false}  
          backgroundColor={Colors.primary} 
          translucent={false}
          barStyle={'light-content'}
        >  
        </StatusBar>
        <View style={{backgroundColor: '#f2f3f5'}}>
          <Carousel></Carousel>
          <Modules navigation={this.props.navigation}></Modules>
          <News navigation={this.props.navigation}></News>
        </View> 
      </ScrollView>
    )
  }
}
