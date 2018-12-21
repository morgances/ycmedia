import React from 'react';
import { View, ScrollView } from 'react-native';
import { WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'

import Item from '../../../../components/Item_time'

class News extends React.Component {
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

export default connect(({ culture_news }) => ({
  ...culture_news,
}))(News);