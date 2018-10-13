import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { Flex } from 'antd-mobile-rn';

import Colors from '../../../../res/Colors'
import Styles from '../../../../res/Styles'
import FontSize from '../../../../res/Fonts/size'

export default (props) => {
  function List() {
    const list = props.data
    const listItems = list.map((item, index) => 
      <Flex style={styles.news_content} key={index} wrap='wrap' justify="center">
        <Flex.Item style={[styles.news_content_text, { flex: 3.5}]}>
          <Text style={{fontSize: FontSize.medium}}>{item.title}</Text>
          <Text style={{fontSize: FontSize.small, color: Colors.gray3, position: 'absolute', bottom: 3, left: 5 }}>{item.time}</Text>
        </Flex.Item>
        <Flex.Item style={[{ flex: 2 }, styles.news_content_text]}>
          <Image style={{height: Styles.Height(140), width: Styles.Width(200), borderRadius: 5}} source={item.image}></Image>
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