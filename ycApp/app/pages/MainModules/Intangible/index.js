/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import { Tabs } from 'antd-mobile-rn'
import { connect } from 'react-redux';
import { Appearance } from 'react-native-appearance';

import Colors from '../../../res/Colors'
import Size from '../../../res/Fonts/size'
import Culture from './components/Culture'
import Smriti from './components/Smriti'

class Main extends Component {
  static navigationOptions = {
    title: '遗脉相承',
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
        title: '文化遗产'
      },
      {
        title: '非遗传承'
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

export default connect(({ theme }) => ({
  ...theme
}))(Main);