import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../res/Colors'
import Styles from '../res/Styles'
import Size from '../res/Fonts/size'

export default class Lists extends React.Component {
  render() {
    const data = this.props.data
    const name = this.props.name
    function change(value) {
      const { dispatch } = data
      dispatch({
        type: `${name}/Change`,
        payload: value,
      })
    }
    function List() {
      const TitleList = data.title.map((item, index) =>
        <TouchableOpacity key={index} onPress={() => change(index)}>
          <View style={[
            styles.nav,
            data.focus == index ? styles.navActive : styles.navUnactive,
            item.title.length < 6 ? styles.short : styles.long  
          ]}>
            <Text style={[data.focus == index ? styles.navActive : styles.navUnactive]}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )
      return TitleList
    }
    return (
      <List></List>
    )
  }
}

const styles = StyleSheet.create({
  navActive: {
    backgroundColor: Colors.primary,
    color: Colors.white
  },
  navUnactive: {
    backgroundColor: Colors.gray4,
    color: Colors.gray2,
  },
  short: {
    width: Styles.Width(185)
  },
  long: {
    marginRight: Styles.Width(20),
    paddingLeft: Styles.Width(25),
    paddingRight: Styles.Width(25)
  },
  nav: {
    marginBottom: Styles.Height(14),
    alignItems: 'center',
    fontSize: Size.xmedium,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 4
  }
})