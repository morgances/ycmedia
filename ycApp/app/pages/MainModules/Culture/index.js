/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { Tabs } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { Appearance } from 'react-native-appearance';

import Colors from '../../../res/Colors';
import Size from '../../../res/Fonts/size'

import News from  './components/New'
import Inform from './components/Inform'
import Policies from './components/Policies'
import Free from './components/Free'

class Main extends Component<{}> {
  static navigationOptions = {
    title: '文化资讯',
    headerStyle: {
      backgroundColor: Appearance.getColorScheme() == 'dark' ? '#333' : "#00b9a2",
      elevation: 0,
      shadowOpacity: 0,
      height: 44
    },
    headerTintColor: '#fff',
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
        title: '动态'
      },
      {
        title: '公告'
      },
      {
        title: '政策'
      },
      {
        title: '公益'
      }
    ]
    return (
      <View style={{flex: 1, backgroundColor: this.props.theme.background}}>
        <Tabs 
          tabBarBackgroundColor={this.props.theme.primary}
          tabBarPosition='top'
          tabs={tabs}
          initialPage={0}
          tabBarActiveTextColor={this.props.theme.textActive}
          tabBarInactiveTextColor={this.props.theme.textInactive}
          tabBarUnderlineStyle={{backgroundColor: this.props.theme.containerbg}}>
          <View>
            <News navigation={this.props.navigation}></News>
          </View>
          <View>
            <Inform navigation={this.props.navigation}></Inform>
          </View>
          <View>
            <Policies navigation={this.props.navigation}></Policies>
          </View>
          <View>
            <Free navigation={this.props.navigation}></Free>
          </View>
        </Tabs>
      </View>
    );
  }
}

export default connect(({ theme }) => ({
  ...theme
}))(Main);