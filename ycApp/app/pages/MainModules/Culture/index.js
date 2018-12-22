/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Tabs } from 'antd-mobile-rn';

import Colors from '../../../res/Colors';
import Size from '../../../res/Fonts/size'

import News from  './components/New'
import Inform from './components/Inform'
import Policies from './components/Policies'
import Free from './components/Free'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '文化资讯',
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
        title: '文化动态'
      },
      {
        title: '通知公告'
      },
      {
        title: '政策法规'
      },
      {
        title: '免费开放'
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
            <News></News>
          </View>
          <View>
            <Inform></Inform>
          </View>
          <View>
            <Policies></Policies>
          </View>
          <View>
            <Free></Free>
          </View>
        </Tabs>
      </View>
    );
  }
}
