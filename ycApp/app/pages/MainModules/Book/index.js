/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Tabs } from 'antd-mobile-rn'

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'

import Books from './components/Books'
import Web from './components/Web'
import Resources from './components/Resources'
import Service from './components/Service'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '书香银川',
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
        title: '图书借阅'
      },
      {
        title: '服务指南'
      },
      {
        title: '数字资源'
      },
      {
        title: '好书推荐'
      }
    ]
    return (
      <View style={{flex: 1}}>
        <Tabs 
          tabBarBackgroundColor={Colors.primary}
          tabBarPosition='top'
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor={Colors.white}
          tabBarInactiveTextColor={Colors.black}
          tabBarUnderlineStyle={{backgroundColor: Colors.white}}>
          <View>
            <Web></Web>
          </View>
          <View>
            <Service></Service>
          </View>
          <View>
            <Resources></Resources>
          </View>
          <View>
            <Books></Books>
          </View>
        </Tabs>
      </View>
    );
  }
}
