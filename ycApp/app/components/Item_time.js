import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import Navigator, { dispatcher } from '../helper/navigator';

import Colors from '../res/Colors'
import Styles from '../res/Styles'
import FontSize from '../res/Fonts/size'

export default (props) => {
  const dispatch = dispatcher(props);
  function List() {
    const list = props.data.articleList || props.data
    const listItems = list.map((item, index) => 
      <TouchableOpacity key={`${item.title}${index}`} onPress={() => dispatch(Navigator.navigate('Detail', { aid: item.aid }))}>
        <Flex style={styles.news_content}  wrap='wrap' justify="center">
          <Flex.Item style={[{ flex: 2 }]}>
            <Image style={styles.news_content_image} source={{ uri: `${item.image}`, cache: 'force-cache' }}></Image>
          </Flex.Item>
          <Flex.Item style={{ flex: 3.5, paddingLeft: 10 }}>
            <Text style={{ fontSize: FontSize.medium, color: Colors.black }}>{item.title}</Text>
            <View style={ styles.news_content_time_view}>
              <Text style={ styles.news_content_time }>{item.time}</Text>
            </View>
          </Flex.Item>
        </Flex>
      </TouchableOpacity>
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