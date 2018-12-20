import React from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Styles from '../../../../res/Styles'

import Item from '../../../../components/Item'
import Lists from './ItemListCulture'

class Culture extends React.Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}>
        <View>
          <WingBlank size="lg">
            <Flex style={{marginTop: Styles.Height(20)}} justify="around" wrap="wrap">
              <Lists data={'intangible_culture'}></Lists>
            </Flex>
            <Item data={this.props.show}></Item>
          </WingBlank>
        </View>
      </ScrollView>
    )
  }
}

export default connect(({ intangible_culture }) => ({
  ...intangible_culture,
}))(Culture);