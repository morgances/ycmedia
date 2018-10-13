import React from 'react';
import { ScrollView, Image, View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';
import Navigator, { dispatcher } from '../../../helper/navigator';

export default (props) => {
  function Listview() {
    const list = [
      {
        title: '公益培训',
        image: require('../../../assets/images/Activity/module_one.jpg'),
        navigate: 'Training'
      },
      {
        title: '群文活动',
        image: require('../../../assets/images/Activity/module_two.jpg'),
        navigate: 'MassActivity'
      },
      {
        title: '美术展览',
        image: require('../../../assets/images/Activity/module_three.jpg')
      },
      {
        title: '志愿活动',
        image: require('../../../assets/images/Activity/module_four.jpg')
      },
      {
        title: '活动规划',
        image: require('../../../assets/images/Activity/module_five.jpg')
      },
    ]
    const dispatch = dispatcher(props)
    const listView = list.map((item) => 
      <TouchableOpacity onPress={() => dispatch(Navigator.navigate(item.navigate))}>
        <View key={item.title} style={styles.listView}>
          <Image style={styles.image} source={item.image}></Image>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    )
    return listView
  }
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: 5, paddingRight: 20 }}
    >
      <Listview></Listview>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  listView: {
    width: Styles.Width(130),
    height: Styles.Height(130),
    marginLeft: Styles.Width(5),
    marginRight: Styles.Width(5),
    alignItems: 'center'
  },
  image: {
    height: Styles.Height(74),
    width: Styles.Width(74),
    marginTop: Styles.Height(16),
    marginBottom: Styles.Height(5)
  }
})