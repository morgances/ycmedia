import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
class LoadMoreFooter extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { data } = this.props
    if (data) {
      return (
        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            { data === 'noMore' ? '已经滑到底啦' : '正在加载更多……' }
          </Text>
        </View>
      )
    } else {
      return null
    }
  }
}
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
  },
  footerTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray'
  }
})
  
export default LoadMoreFooter