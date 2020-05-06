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

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'

import Memory from './components/Memory'
import Culture from './components/Culture'

class Main extends Component {
  static navigationOptions = {
    title: '凤城演绎',
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
        title: '群众文化'
      },
      {
        title: '银川记忆'
      }
    ]
    return (
      <View style={{flex: 1, backgroundColor: this.props.theme.background }}>
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
            <Memory navigation={this.props.navigation}></Memory>
          </View>
        </Tabs>
      </View>
    );
  }
}

export default connect(({ theme }) => ({
  ...theme
}))(Main);