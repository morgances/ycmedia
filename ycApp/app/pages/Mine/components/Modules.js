import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Flex } from 'antd-mobile-rn';

import Styles from '../../../res/Styles'
import Colors from '../../../res/Colors'
import Size from '../../../res/Fonts/size'

export default (props) => {
  function List() {
    const list = [
      {
        title: '个人信息',
        image: require('../../../assets/images/Mine/information.jpg')
      },
      {
        title: '账号安全',
        image: require('../../../assets/images/Mine/account.jpg')
      },
      {
        title: '我的读者沙龙',
        image: require('../../../assets/images/Mine/reader.jpg')
      },
      {
        title: '软件下载',
        image: require('../../../assets/images/Mine/download.jpg')
      },
      {
        title: '活动预约',
        image: require('../../../assets/images/Mine/activity.jpg')
      },
      {
        title: '文化微博',
        image: require('../../../assets/images/Mine/weibo.jpg')
      },
      {
        title: '文化共享',
        image: require('../../../assets/images/Mine/share.jpg')
      }
    ]
    const listItems = list.map((element) => 
      <View key={element.title} style={[styles.item, {marginLeft: 15}]}>
        <Flex style={{marginLeft: 5}}>
          <Image style={styles.icon} source={element.image}></Image>
          <Text style={styles.container}>{element.title}</Text>
          <Image style={styles.arrow} source={require('../../../assets/images/Mine/arrow.jpg')}></Image>
        </Flex>
      </View>
    )
    return listItems
  }
  return (
		<View>
      <List></List>
		</View>
	)
}


const styles = StyleSheet.create({
  icon: {
    height: Styles.Height(35),
    width: Styles.Width(35)
  },
  container: {
    fontSize: Size.medium,
    marginLeft: Styles.Width(15)
  },
  item: {
    height: Styles.Height(100),
    paddingTop: Styles.Height(30),
    paddingBottom: Styles.Height(30),
    borderBottomColor: Colors.borderColor,
    borderStyle: 'solid',
    borderBottomWidth: 1
  },
  arrow: {
    position: 'absolute',
    right: 15,
    height: Styles.Height(24),
    width: Styles.Width(24)
  }
})