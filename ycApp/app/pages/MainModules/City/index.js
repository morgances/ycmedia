/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Tabs } from 'antd-mobile-rn'

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'

import Memory from './components/Memory'
import Culture from './components/Culture'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '凤城演绎',
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
        title: '群众文化'
      },
      {
        title: '银川记忆'
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
            <Culture></Culture>
          </View>
          <View>
            <Memory></Memory>
          </View>
        </Tabs>
      </View>
    );
  }
}
