
import React, { Component } from 'react'
import { View } from 'react-native'
import { Tabs } from 'antd-mobile-rn'

import Colors from '../../../res/Colors'
import Size from '../../../res/Fonts/size'
import Cinema from './components/Cinema'
import Theatre from './components/Theatre'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '文化消费',
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
        title: '银川影院'
      },
      {
        title: '艺术剧院'
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
            <Cinema></Cinema>
          </View>
          <View>
            <Theatre></Theatre>
          </View>
        </Tabs>
      </View>
    );
  }
}
