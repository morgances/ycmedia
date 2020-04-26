import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
import { Flex } from 'antd-mobile-rn';
import Navigator, { dispatcher } from '../helper/navigator';

import Colors from '../res/Colors'
import Styles from '../res/Styles'
import FontSize from '../res/Fonts/size'

export default (props) => {
  const dispatch = dispatcher(props);
  const theme = props.theme
  function List() {
    const list = props.data.articleList || props.data
    const listItems = list.map((item, index) => 
      <TouchableOpacity key={`${item.title}${index}`} onPress={() => dispatch(Navigator.navigate('Detail', { aid: item.aid }))}>
        <Flex style={{...styles.news_content, backgroundColor: theme.containerbg}}  wrap='wrap' justify="center">
          { 
            item.image != '' ? 
              <Flex.Item style={[{ flex: 2 }]}>
                <Image style={{...styles.news_content_image, backgroundColor: theme.subTitle}} source={{ uri: `${item.image}`, cache: 'force-cache' }}></Image>
              </Flex.Item>
              :
              null
          }
          {
            item.image != '' ? 
              <Flex.Item style={{ flex: 3.5, paddingLeft: 20 }}>
                <View>
                  <Text numberOfLines={2} style={{ fontSize: FontSize.medium, color: theme.text }}>{item.title}</Text>
                </View>
                <View style={ styles.news_content_time_view}>
                  <Text style={{ ...styles.news_content_time, color: theme.text }}>{item.time}</Text>
                </View>
              </Flex.Item>
              :
              <Flex.Item style={{ flex: 3.5, paddingLeft: 10, height: Styles.Height(90) }}>
                <Text numberOfLines={2} style={{ fontSize: FontSize.medium, color: theme.text,  }}>{item.title}</Text>
                <View style={ styles.news_content_time_view}>
                  <Text style={{...styles.news_content_time, color: theme.subTitle}}>{item.time}</Text>
                </View>
              </Flex.Item>
          }
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
    paddingTop: Styles.Height(20),
    paddingBottom: Styles.Height(20),
    borderRadius: 5,
    marginBottom: Styles.Height(8)
  },
  news_content_image: {
    height: Styles.Height(140),
    width: Styles.Width(200),
    marginLeft: Styles.Width(16),
    borderRadius: 5,
  },
  news_content_time_view: {
    position: "relative",
    top: Styles.Height(36)
  },
})