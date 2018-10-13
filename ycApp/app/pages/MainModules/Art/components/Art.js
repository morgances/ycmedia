import React from 'react';
import { View, ScrollView, ImageBackground } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Styles from '../../../../res/Styles'

import Item from './Item'
import Lists from './ItemList'

class Art extends React.Component {
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View>
          <ImageBackground style={{height: Styles.Height(26)}} source={require('../../../../assets/images/Main/border__top.jpg')}></ImageBackground>
          <ImageBackground style={{width: Styles.Width()}} source={require('../../../../assets/images/Main/background.jpg')}>
            <WingBlank size="lg">
              <Flex style={{marginTop: Styles.Height(20)}}>
                <Lists></Lists>
              </Flex>
              <Item data={this.props.show}></Item>
            </WingBlank>
          </ImageBackground>
        </View>
      </ScrollView>
    )
  }
}

export default connect(({ culture_news }) => ({
  ...culture_news,
}))(Art);