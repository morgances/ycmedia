import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Carousel, SearchBar } from 'antd-mobile-rn';

import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';

export default (props) => {
  return (
    <View>
      <Carousel
        style={styles.wrapper}
        selectedIndex={0}
        autoplay
        infinite
        dotActiveStyle={styles.dotActive}
      >
        <View style={[styles.containerHorizontal, { backgroundColor: '#999' }]}>
          <ImageBackground style={styles.containerHorizontal} source={require('../../../assets/images/Main/spring.jpg')}></ImageBackground>
        </View>
        <View style={[styles.containerHorizontal, { backgroundColor: '#999' }]}>
          <ImageBackground style={styles.containerHorizontal} source={require('../../../assets/images/Main/summer.jpg')}></ImageBackground>
        </View>
        <View style={[styles.containerHorizontal, { backgroundColor: '#999' }]}>
          <ImageBackground style={styles.containerHorizontal} source={require('../../../assets/images/Main/fall.jpg')}></ImageBackground>
        </View>
        <View style={[styles.containerHorizontal, { backgroundColor: '#999' }]}>
          <ImageBackground style={styles.containerHorizontal} source={require('../../../assets/images/Main/winter.jpg')}></ImageBackground>
        </View>
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