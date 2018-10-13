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
        title: '银川市图书馆对银川市公共图书馆总分馆服务工作进行实地督查',
        image: require('../../../assets/images/Main/news_one.png'),
        time: '2017-11-06 17:32'
      },
      {
        title: '银川市图书馆举办“网络书香过大年”、“同筑中国梦·共度书香年”等新春文化活动',
        image: require('../../../assets/images/Main/news_two.jpg'),
        time: '2017-11-06 17:32'
      },
      {
        title: '银川市委常委、宣传部部长李虹一行到银川市图书馆调研',
        image: require('../../../assets/images/Main/news_two.jpg'),
        time: '2017-11-06 17:32'
      }
    ]
    const listItems = list.map((item, index) => 
      <Flex style={styles.news_content} key={index} wrap='wrap' justify="center">
        <Flex.Item style={[styles.news_content_text, { flex: 3.5, paddingLeft: 10 }]}>
          <Text style={{fontSize: FontSize.medium}}>{item.title}</Text>
          <Text style={{fontSize: FontSize.small, color: Colors.gray3}}>{item.time}</Text>
        </Flex.Item>
        <Flex.Item style={[{ flex: 2 }, styles.news_content_text]}>
          <Image style={{height: Styles.Height(140), width: Styles.Width(200), borderRadius: 5}} source={item.image}></Image>
        </Flex.Item>
      </Flex>
    )
    return listItems
  }

  return (
    <WingBlank size='md' style={{ marginBottom: 5, paddingTop: 5 }}>
      <Flex style={[{ marginBottom: 4 }, styles.news]} wrap='wrap' justify="center">
        <View style={styles.news_header}>
          <Flex wrap='wrap' justify="center">
            <Image style={styles.news_header_image} source={require('../../../assets/images/Main/news__title__left.jpg')}></Image>
            <Text style={{ fontSize: FontSize.large, color: '#ac7743' }}>最新资讯</Text>
            <Image style={styles.news_header_image} source={require('../../../assets/images/Main/news__title__right.jpg')}></Image>
          </Flex>
        </View>
        <News></News>
      </Flex>
    </WingBlank>
  )
}

const styles = StyleSheet.create({
  news: {
    marginLeft: Styles.Width(4),
    marginRight: Styles.Width(4)
  },
  news_header: {
    alignItems: 'center',
    paddingTop: Styles.Height(5),
    paddingBottom: Styles.Height(5),
  },
  news_header_image: {
    height: Styles.Height(62),
    width: Styles.Width(62)
  },
  news_content: {
    borderTopColor: Colors.gray,
    borderTopWidth: 1,
    borderStyle: 'solid',
    paddingTop: Styles.Height(12),
    paddingLeft: Styles.Height(6),
    paddingRight: Styles.Height(12),
    paddingBottom: Styles.Height(12),
  },
  news_content_text: {
    height: Styles.Height(150),
    paddingTop: Styles.Height(6),
    paddingLeft: Styles.Height(6),
    paddingRight: Styles.Height(6),
    paddingBottom: Styles.Height(6),
  }
})