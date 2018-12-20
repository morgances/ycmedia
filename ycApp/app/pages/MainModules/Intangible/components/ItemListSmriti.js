import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Flex } from 'antd-mobile-rn';
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
        type: 'intangible_smriti/change',
        payload: value,
      })
    }
    function List() {
      const TitleList = data.title.map((item, index) =>
          <TouchableOpacity key={index} onPress={() => change(index)}>
            <View style={[styles.nav, data.focus == index ? styles.navActive : styles.navUnactive]} dddd d>
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
    backgroundColor: Colors.gray1,
    color: Colors.gray3,
  },
  nav: {
    marginLeft: Styles.Width(8),
    marginRight: Styles.Width(8),
    marginBottom: Styles.Height(14),
    alignItems: 'center',
    fontSize: Size.xmedium,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 5,
    width: Styles.Width(170)
  }
})

export default connect(({ intangible_smriti }) => ({
  ...intangible_smriti,
}))(Lists);