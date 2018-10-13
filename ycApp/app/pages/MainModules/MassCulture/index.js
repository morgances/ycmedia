/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import { Tabs } from 'antd-mobile-rn'

import Styles from '../../../res/Styles'
import Colors from '../../../res/Colors'

export default class Main extends Component<{}> {
  static navigationOptions = {
    title: '群众文化',
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
        title: '免费开放'
      },
      {
        title: '民间团队'
      },
      {
        title: '群文创作'
      },
      {
        title: '群文博览'
      },
      {
        title: '区县文化'
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
            <Text>Content of First Tab</Text>
          </View>
          <View>
            <Text>Content of First Tab</Text>
          </View>
          <View>
            <Text>Content of First Tab</Text>
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
