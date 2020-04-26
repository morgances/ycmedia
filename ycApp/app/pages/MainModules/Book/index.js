/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Tabs } from 'antd-mobile-rn'
import { connect } from 'react-redux';
import { Appearance } from 'react-native-appearance';

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'

import Books from './components/Books'
import Web from './components/Web'
import Resources from './components/Resources'
import Service from './components/Service'

class Main extends Component<{}> {
  static navigationOptions = {
    title: '书香银川',
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
        title: '借阅'
      },
      {
        title: '指南'
      },
      {
        title: '资源'
      },
      {
        title: '荐书'
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
            <Web></Web>
          </View>
          <View>
            <Service navigation={this.props.navigation}></Service>
          </View>
          <View>
            <Resources navigation={this.props.navigation}></Resources>
          </View>
          <View>
            <Books navigation={this.props.navigation}></Books>
          </View>
        </Tabs>
      </View>
    );
  }
}

export default connect(({ theme }) => ({
  ...theme
}))(Main);