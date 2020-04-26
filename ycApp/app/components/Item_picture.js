import React from 'react';
import { Text, StyleSheet, Image, View, TouchableOpacity } from 'react-native';
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
        <View style={{ ...styles.content, backgroundColor: props.theme.containerbg }}>
          <Image style={{ backgroundColor: props.theme.subTitle, ...styles.content_image}} source={{ uri: `${item.image}`, cache: 'force-cache' }}></Image>
          <View style={{marginLeft: Styles.Width(8)}}>
            <Text numberOfLines={1} style={{ fontSize: FontSize.medium, color: props.theme.title}}>
              { item.title.length > 8 ? `${item.title.slice(0, 7)}...` : item.title }
            </Text>
          </View>
          <View style={{...styles.content_time_view}}>
            <Text style={{...styles.content_time, color: props.theme.subTitle}}>{item.time}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
    return listItems
  }
  return (
    <List></List>
  )
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: Styles.Height(10),
    marginBottom: Styles.Height(16),
    borderRadius: 6
  },
  content_image: {
    borderRadius: 6,
    width: Styles.Width(283),
    height: Styles.Height(201),
    marginBottom: Styles.Height(10),
  },
  content_time_view: {
    marginTop: Styles.Height(4),
    marginLeft: Styles.Width(8)
  },
  content_time: {
    fontSize: FontSize.xmedium,
  }
})