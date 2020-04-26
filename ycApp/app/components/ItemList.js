import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

import Colors from '../res/Colors'
import Styles from '../res/Styles'
import Size from '../res/Fonts/size'

export default class Lists extends React.Component {
  render() {
    const data = this.props.data
    const name = this.props.name
    const theme = this.props.theme
    const callbackParent = this.props.callbackParent || null
    function change(index) {
      if (callbackParent) callbackParent(index, data)
      const { dispatch } = data
      dispatch({
        type: `${name}/change`,
        payload: {
          index,
          name
        },
      })
    }
    function List() {
      const TitleList = data.title.map((item, index) =>
        <TouchableOpacity key={`${item.title}${index}`} onPress={() => change(index)}>
          <View style={[
            styles.nav,
            data.focus == index ? {backgroundColor: theme.listBoxActive } : { backgroundColor: theme.containerbg},
            item.title.length < 6 ? styles.short : styles.long  
          ]}>
            <Text style={[data.focus == index ? {...styles.navActive, color: theme.textActive} : {...styles.navUnactive, color: theme.textInactive}]}>{item.title}</Text>
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