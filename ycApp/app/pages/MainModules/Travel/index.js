/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'
import Item from '../../../components/Item_instruction'

class Main extends Component<{}> {
  static navigationOptions = {
    title: '银川旅游',
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
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}>
        <View>
          <WingBlank size="lg">
            <Item data={this.props.show}></Item>
          </WingBlank>
        </View>
      </ScrollView>
    );
  }
}

export default connect(({ travel }) => ({
  ...travel,
}))(Main);
