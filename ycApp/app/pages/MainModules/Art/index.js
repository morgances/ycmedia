/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Tabs } from 'antd-mobile-rn';
import { connect } from 'react-redux';
import { Appearance } from 'react-native-appearance';

import Size from '../../../res/Fonts/size';
import Colors from '../../../res/Colors'
import Display from './components/Display'

import News from  './components/News'
import Artists from './components/Artists'
import Venues from './components/Venues'

class Main extends Component<{}> {
  constructor(props) {
    super(props)
  }
  static navigationOptions = {
    title: '艺术空间',
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
        title: '资讯'
      },
      {
        title: '名家'
      },
      {
        title: '展示'
      },
      {
        title: '场馆'
      }
    ]
    return (
      <View style={{ flex: 1, backgroundColor: this.props.theme.background }}>
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
            <Artists navigation={this.props.navigation}></Artists>
          </View>
          <View>
            <Display navigation={this.props.navigation}></Display>
          </View>
          <View>
            <Venues navigation={this.props.navigation}></Venues>
          </View>
        </Tabs>
      </View>
    );
  }
}

export default connect(({ theme }) => ({
  ...theme
}))(Main);