import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Styles from '../../../../res/Styles'
import Size from '../../../../res/Fonts/size'

class Lists extends React.Component {
  render() {
    const data = this.props
    function change(value) {
      const { dispatch } = data
      dispatch({
        type: 'intangible_culture/change',
        payload: value,
      })
    }
    function List() {
      const TitleList = data.title.map((item, index) =>
        <TouchableOpacity key={index} onPress={() => change(index)}>
          <View>
            <Text style={[styles.nav, data.focus == index ? styles.navActive : styles.navUnactive]}>{item.title}</Text>
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
    backgroundColor: Colors.gray1,
    color: Colors.gray3,
  },
  nav: {
    marginLeft: Styles.Width(8),
    marginRight: Styles.Width(8),
    alignSelf: 'center',
    fontSize: Size.xmedium,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  }
})

export default connect(({ intangible_culture }) => ({
  ...intangible_culture,
}))(Lists);