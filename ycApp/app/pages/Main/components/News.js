import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Image } from 'react-native';
import { Flex, WingBlank } from 'antd-mobile-rn';

import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';
import FontSize from '../../../res/Fonts/size';

export default (props) => {
  function News() {
    const list = [
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        image: require('../../../assets/images/Main/news_one.png'),
        time: '2018-10-25'
      },
      {
        title: '银川市第三届旅游交流大会正式启动',
        image: require('../../../assets/images/Main/news_two.jpg'),
        time: '2017-11-06'
      },
      {
        title: '银川市委常委、宣传部部长李虹一行到银川市图书馆调研',
        image: require('../../../assets/images/Main/news_two.jpg'),
        time: '2017-11-06'
      }
    ]
    const listItems = list.map((item, index) => 
      <Flex style={styles.news_content} key={index} wrap='wrap' justify="center">
        <Flex.Item style={[{ flex: 2 }]}>
          <Image style={styles.news_content_image} source={item.image}></Image>
        </Flex.Item>
        <Flex.Item style={{ flex: 3.5, paddingLeft: 10 }}>
          <Text style={{ fontSize: FontSize.medium }}>{item.title}</Text>
          <View style={ styles.news_content_time_view}>
            <Text style={ styles.news_content_time }>{item.time}</Text>
          </View>
        </Flex.Item>
      </Flex>
    )
    return listItems
  }

  return (
    <View style={styles.news}>
      <View style={styles.news_header}>
        <Flex wrap='wrap' justify="center">
          <Text style={{ fontSize: FontSize.xlarge }}>最新资讯</Text>
        </Flex>
      </View>
      <View style={styles.news_content_view}>
        <WingBlank size="lg">
          <News></News>
        </WingBlank>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  news: {
    marginTop: Styles.Height(20)
  },
  news_header: {
    alignItems: 'center',
    paddingTop: Styles.Height(10),
    paddingBottom: Styles.Height(15),
  },
  news_content_view: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    paddingTop: Styles.Height(10),
  },
  news_content: {
    borderBottomColor: Colors.gray,
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingTop: Styles.Height(20),
    paddingBottom: Styles.Height(20)
  },
  news_content_image: {
    height: Styles.Height(140),
    width: Styles.Width(200),
    borderRadius: 5
  },
  news_content_time_view: {
    position: 'relative',
    top: 8
  },
  news_content_time: {
    textAlign: 'right',
    color: Colors.gray3
  }
})