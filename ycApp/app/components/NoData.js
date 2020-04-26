import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Styles from '../res/Styles'
import FontSize from '../res/Fonts/size'

class NoData extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{backgroundColor: this.props.theme.background, ...styles.backGround}}>
        <Flex justify="center" style={styles.flex}>
          <Image style={styles.image} resizeMode='contain' source={require('../assets/images/Others/noData.jpg')}></Image>
        </Flex>
        <Flex justify="center">
          <Text style={{color: this.props.theme.title ,...styles.title}}>相关数据为空</Text>
        </Flex>
        <Flex justify="center" style={{marginTop: Styles.Height(10)}}>
          <Text style={{color: this.props.theme.subTitle}}>我们正在努力添加此内容</Text>
        </Flex>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  backGround: {
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
  }
})
  
export default connect(({ theme }) => ({
  ...theme
}))(NoData);