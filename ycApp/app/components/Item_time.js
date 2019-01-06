import React from 'react';
import { Text, StyleSheet, Image, View } from 'react-native';
import { Flex } from 'antd-mobile-rn';

import Colors from '../res/Colors'
import Styles from '../res/Styles'
import FontSize from '../res/Fonts/size'

export default (props) => {
  function List() {
    const list = props.data
    const listItems = list.map((item, index) => 
      <Flex style={styles.news_content} key={index} wrap='wrap' justify="center">
        <Flex.Item style={[{ flex: 2 }]}>
          <Image style={styles.news_content_image} source={item.image}></Image>
        </Flex.Item>
        <Flex.Item style={{ flex: 3.5, paddingLeft: 10 }}>
          <Text style={{ fontSize: FontSize.medium, color: Colors.black }}>{item.title}</Text>
          <View style={ styles.news_content_time_view}>
            <Text style={ styles.news_content_time }>{item.time}</Text>
          </View>
        </Flex.Item>
      </Flex>
    )
    return listItems
  }
  return (
    <List></List>
  )
}

const styles = StyleSheet.create({
  news_content: {
    borderBottomColor: '#ebebeb',
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