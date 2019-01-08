import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { MapView } from 'react-native-amap3d'

import Colors from '../../../res/Colors';
import Size from '../../../res/Fonts/size'

export default class Map extends Component<{}> {
  static navigationOptions = {
    title: '文化地图',
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0,
      shadowOpacity: 0,
      height: 44
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontSize: Size.large,
      fontWeight: null,
      alignSelf: 'center'
    },
    headerRight: <View />
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <MapView
          style={StyleSheet.absoluteFill}
          zoomLevel={13}
          coordinate={{
            latitude: 38.4874,
            longitude: 106.2308,
          }}
        />
      </View>
    );
  }
}
