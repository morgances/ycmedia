/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Tabs } from 'antd-mobile-rn'

import Colors from '../../../res/Colors'
import Size from '../../../res/Fonts/size'
import Culture from './components/Culture'
import Smriti from './components/Smriti'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '遗脉相承',
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
    },
    headerRight: <View />
  }
  render() {
    const tabs = [
      {
        title: '文化遗产'
      },
      {
        title: '非遗传承'
      }
    ]
    return (
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <Tabs 
          tabBarBackgroundColor={Colors.primary}
          tabBarPosition='top'
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor={Colors.white}
          tabBarInactiveTextColor={Colors.black}
          tabBarUnderlineStyle={{backgroundColor: Colors.white}}>
          <View>
            <Culture navigation={this.props.navigation}></Culture> 
          </View>
          <View>
            <Smriti navigation={this.props.navigation}></Smriti>
          </View>
        </Tabs>
      </View>
    );
  }
}
