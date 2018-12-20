import React from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'

import Item from '../../../../components/Item_time'

class Books extends React.Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}>
        <View>
          <WingBlank size="lg">
            <Item data={this.props.culture}></Item>
          </WingBlank>
        </View>
      </ScrollView>
    )
  }
}

export default connect(({ book_books }) => ({
  ...book_books,
}))(Books);