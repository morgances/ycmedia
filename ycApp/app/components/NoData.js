import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Flex } from 'antd-mobile-rn';

import Colors from '../res/Colors'
import Styles from '../res/Styles'
import FontSize from '../res/Fonts/size'

class NoData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.backGround}>
        <Flex justify="center" style={styles.flex}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/images/Others/noData.jpg')}></Image>
        </Flex>
        <Flex justify="center">
          <Text style={styles.title}>相关数据为空</Text>
        </Flex>
        <Flex justify="center" style={{marginTop: Styles.Height(10)}}>
          <Text style={styles.content}>我们正在努力添加此内容</Text>
        </Flex>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  backGround: {
    backgroundColor: Colors.white,
    height: Styles.Height() - Styles.Height(194),
    width: '100%'
  },
  flex: {
    marginTop: Styles.Height(30)
  },
  image: {
    width: '30%',
  },
  title: {
    fontSize: FontSize.large,
    color: Colors.black,
  },
  content: {
    color: Colors.gray3
  }
})
  
export default NoData