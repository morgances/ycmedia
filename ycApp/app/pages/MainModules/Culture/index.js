/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { Tabs } from 'antd-mobile-rn';

import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors'

import News from  './components/New'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '文化资讯',
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0,
      shadowOpacity: 0,
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      alignSelf: 'center'
    },
    headerRight: (
      <Image style={{ height: Styles.Height(34), width: Styles.Width(34), marginRight: Styles.Width(30)}} source={require('../../../assets/images/Total/search.jpg')}></Image>
    ),
  }
  render() {
    const tabs = [
      {
        title: '新闻资讯'
      },
      {
        title: '通知公告'
      },
      {
        title: '文化政策'
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
          tabBarInactiveTextColor={Colors.white}
          tabBarUnderlineStyle={{backgroundColor: Colors.white}}>
          <View>
            <News></News>
          </View>
          <View>
            <Text>Content of First Tab</Text>
          </View>
          <View>
            <Text>Content of First Tab</Text>
          </View>
        </Tabs>
      </View>
    );
  }
}
