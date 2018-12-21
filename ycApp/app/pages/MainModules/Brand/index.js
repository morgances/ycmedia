/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { WingBlank, Flex } from 'antd-mobile-rn'
import { connect } from 'react-redux';

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'
import Styles from '../../../res/Styles'

import Item from '../../../components/Item_instruction'
import Lists from '../../../components/ItemList'

class Brand extends Component<{}> {
  static navigationOptions = {
    title: '文化品牌',
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
            <Flex style={{marginTop: Styles.Height(20)}} justify="start" wrap="wrap">
              <Lists data={this.props} name={'brand'}></Lists>
            </Flex>
            <Flex style={{marginTop: Styles.Height(5)}} justify="between" wrap="wrap">
              <Item data={this.props.show}></Item>
            </Flex>
          </WingBlank>
        </View>
      </ScrollView>
    );
  }
}

export default connect(({ brand }) => ({
  ...brand,
}))(Brand);
