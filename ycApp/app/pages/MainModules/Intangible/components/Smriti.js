import React from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Styles from '../../../../res/Styles'

import Item from '../../../../components/Item_time'
import Lists from '../../../../components/ItemList'

class Culture extends React.Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}>
        <View>
          <WingBlank size="lg">
            <Flex style={{marginTop: Styles.Height(20)}} wrap="wrap" justify="around">
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

export default connect(({ intangible_smriti }) => ({
  ...intangible_smriti,
}))(Culture);