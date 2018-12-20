import React, { Component } from 'react'
import { View, ScrollView } from 'react-native'
import { WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Item from '../../../../components/Item_instruction'

class Cinema extends Component<{}> {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}>
        <View>
          <WingBlank size="lg">
            <Item data={this.props.show}></Item>
          </WingBlank>
        </View>
      </ScrollView>
    );
  }
}

export default connect(({ spending_cinema }) => ({
  ...spending_cinema,
}))(Cinema);
