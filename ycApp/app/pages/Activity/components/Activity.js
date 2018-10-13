import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Flex, WingBlank, Button } from 'antd-mobile-rn';

import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';
import FontSize from '../../../res/Fonts/size';

export default (props) => {
  function News() {
    const list = [
      {
        title: '银川市图书馆举办“庆元旦”少儿活动',
        time: '1-02',
        address: '银川市图书馆',
        finish: false,
        image: require('../../../assets/images/Main/news_one.png')
      },
      {
        title: '银川市举办欢聚一堂美术展览少儿活动',
        time: '1-02',
        address: '银川市图书馆',
        finish: true,
        image: require('../../../assets/images/Main/news_one.png')
      },
      {
        title: '银川市图书馆',
        time: '1-02',
        address: '银川市图书馆',
        finish: false,
        image: require('../../../assets/images/Main/news_one.png')
      }
    ]
    const listItems = list.map((item, index) => 
      <Flex key={index} wrap='wrap' justify="center" style={{marginBottom: 4}}>
        <Flex.Item style={[{ flex: 1 }, styles.news_content_text]}>
          <Image style={{height: Styles.Height(150), width: Styles.Width(150), borderRadius: 5}} source={item.image}></Image>
        </Flex.Item>
        <Flex.Item style={[{ flex: 3 }, styles.news_content_text]}>
          <Text style={{paddingLeft: 5, fontSize: FontSize.medium}}>{item.title}</Text>
          <Flex style={{position: 'absolute', bottom: 5, marginLeft: 10}}>
            <Flex.Item style={{flex: 1}}>
              <Flex justify="center">
                <Image style={styles.icon} source={require('../../../assets/images/Activity/date.jpg')}></Image>
                <Text style={{textAlign: 'center', color: '#999'}}>{item.time}</Text>
              </Flex>
            </Flex.Item>
            <Flex.Item style={{flex: 2}}>
              <Flex justify="center">
                <Image style={styles.icon} source={require('../../../assets/images/Activity/address.jpg')}></Image>
                <Text style={{textAlign: 'center', color: '#999'}}>{item.address}</Text>
              </Flex>
            </Flex.Item>
            <Flex.Item style={{flex: 1, marginLeft: 20}}>
              <Text style={[item.finish ? styles.button_finish : styles.button_active, styles.button]} activeStyle={false}>{item.finish ? '已结束' : '进行中'}</Text>
            </Flex.Item>
          </Flex>
        </Flex.Item>
      </Flex>
    )
    return listItems
  }

  return (
    <WingBlank size='md' style={{ marginBottom: 5, paddingTop: 10 }}>
      <Flex style={[{ marginBottom: 4, paddingBottom: 10 }]} wrap='wrap' justify="center">
        <Flex wrap='wrap' justify="center">
          <Image style={styles.activity_header_image} source={require('../../../assets/images/Main/news__title__left.jpg')}></Image>
          <Text style={{ fontSize: FontSize.large, color: '#ac7743' }}>最新活动</Text>
          <Image style={styles.activity_header_image} source={require('../../../assets/images/Main/news__title__right.jpg')}></Image>
        </Flex>
        <News style={styles.news_content}></News>
      </Flex>
    </WingBlank>
  )
}

const styles = StyleSheet.create({
  news_header: {
    alignItems: 'center',
    borderBottomColor: '#999',
    paddingTop: Styles.Height(5),
    paddingBottom: Styles.Height(5)
  },
  news_content: {
    marginTop: Styles.Height(5),
    paddingTop: Styles.Height(10),
    paddingBottom: Styles.Height(6),
  },
  news_content_text: {
    height: Styles.Height(150),
    paddingTop: Styles.Height(6),
    paddingLeft: Styles.Height(6),
    paddingRight: Styles.Height(6),
    paddingBottom: Styles.Height(6),
  },
  button: {
    borderRadius: 24,
    width: Styles.Width(100),
    paddingTop: Styles.Height(4),
    paddingBottom: Styles.Height(4),
    fontSize: FontSize.xmedium,
    textAlign: 'center',
  },
  button_active: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  },
  button_finish: {
    backgroundColor: Colors.white,
    color: Colors.gray1,
  },
  activity_header_image: {
    height: Styles.Height(62),
    width: Styles.Width(62)
  },
  icon: {
    height: Styles.Height(30),
    width: Styles.Width(30)
  }
})