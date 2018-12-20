/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Tabs } from 'antd-mobile-rn';

import Size from '../../../res/Fonts/size';
import Colors from '../../../res/Colors'
import Display from './components/Display'

// import News from  './components/New'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '艺术空间',
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
        title: '艺术资讯'
      },
      {
        title: '名家介绍'
      },
      {
        title: '艺术展示'
      },
      {
        title: '艺术场馆'
      }
    ]
    return (
      <View style={{ flex: 1, backgroundColor: Colors.white }}>
        <Tabs 
          tabBarBackgroundColor={Colors.primary}
          tabBarPosition='top'
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor={Colors.white}
          tabBarInactiveTextColor={Colors.black}
          tabBarUnderlineStyle={{backgroundColor: Colors.white}}>
          <View>
            <Text>Content of First Tab</Text>
          </View>
          <View>
            <Text>Content of First Tab</Text>
          </View>
          <View>
            <Display></Display>
          </View>
          <View>
            <Text>Content of First Tab</Text>
          </View>
        </Tabs>
      </View>
    );
  }
}
