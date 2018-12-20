import React from 'react';
import { View, ScrollView } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Styles from '../../../../res/Styles'

import Item from '../../../../components/Item_time'
import Lists from '../../../../components/ItemList'

class Memory extends React.Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View>
          <WingBlank size="lg">
            <Flex style={{marginTop: Styles.Height(20)}} justify="between" wrap="wrap">
              <Lists data={this.props}></Lists>
            </Flex>
            <Flex style={{marginTop: Styles.Height(5)}} justify="between" wrap="wrap">
              <Item data={this.props.show}></Item>
            </Flex>
          </WingBlank>
        </View>
      </ScrollView>
    )
  }
}

export default connect(({ city_memory }) => ({
  ...city_memory,
}))(Memory);