import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Carousel, SearchBar } from 'antd-mobile-rn';

import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';

export default (props) => {
  const { banners } = props
  function List() {
    const BannerList = banners.map((item) =>
      <View style={[styles.containerHorizontal, { backgroundColor: '#999' }]}>
        <ImageBackground style={styles.containerHorizontal} source={{uri: item.ImagePath}}></ImageBackground>
      </View>
    )
    return BannerList
  }
  return (
    <View>
      <Carousel
        style={styles.wrapper}
        selectedIndex={0}
        autoplay
        infinite
        dotActiveStyle={styles.dotActive}
      >
        <List></List>
      </Carousel>
    </View>
  )
}

const styles = StyleSheet.create({
  containerHorizontal: {
    height: Styles.Height(300)
  },
  dotActive: {
    backgroundColor: Colors.primary
  }
})