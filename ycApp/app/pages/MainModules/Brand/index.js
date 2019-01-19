/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, ScrollView, RefreshControl, Image } from 'react-native'
import { WingBlank, Flex } from 'antd-mobile-rn'
import { connect } from 'react-redux';

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'
import Styles from '../../../res/Styles'

import Item from '../../../components/Item_instruction'
import Lists from '../../../components/ItemList'
import Loadmore from '../../../components/LoadMore'
import refresh_result from '../../../components/Refresh_result'

class Brand extends Component<{}> {
  static navigationOptions = {
    title: '文化品牌',
    headerStyle: {
      backgroundColor: Colors.primary,
      elevation: 0,
      shadowOpacity: 0,
      height: 44
    },
    headerTintColor: Colors.white,
    headerTitleStyle: {
      fontSize: Size.large,
      fontWeight: null,
      alignSelf: 'center'
    },
    headerRight: <View />
  }

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      focusModel: {},
      isLoading: false
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props
    const { focusModel } = await dispatch({
      type: `brand/get`,
      payload: {
        category: 0,
        index: 0,
        nameSpace: 'brand',
      }
    })
    this.setState(() => {
      return {
        focusModel: {...focusModel}
      }
    })
  }

  _onChildChanged(index, data) {
    const focusModel = data.title[index]
    this.setState(() => {
      return {
        focusModel: {
          ...focusModel
        }
      }
    })
  }

  async _onRefreshing(data) {
    this.setState(() => {
      return {
        isRefreshing: true
      }
    })
    const { dispatch } = data[0]
    const result = await dispatch({
      type: `${data[1]}/refresh`,
      payload: {
        nameSpace: `${data[1]}`
      }
    })
    refresh_result(result)
    this.setState(() => {
      return {
        isRefreshing: false
      }
    })
  }

  async _onLoadingMore(event) {
    if (this.props.title[this.props.focus].isLoad == 1 || this.props.title[this.props.focus].isLoad == 2) return
    const focusData = this.props.title[this.props.focus]
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 30) {
      this.setState(() => {
        return {
          isLoading: true
        }
      })
      const { dispatch } = this.props
      const { focusModel } = await dispatch({
        type: `brand/loadMore`,
        payload: {
          category: focusData.category,
          tag: focusData.tag,
          nameSpace: 'brand',
        }
      })
      this.setState(() => {
        return {
          focusModel: {...focusModel}
        }
      })
    }
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefreshing.bind(this, [this.props, 'intangible_smriti'])}
            titleColor="#00ff00"
            colors={[Colors.primary]}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={this._onLoadingMore.bind(this)}
        scrollEventThrottle={200}
      >
        <View>
          <WingBlank size="lg">
            <Flex style={{marginTop: Styles.Height(20)}} justify="start" wrap="wrap">
              <Lists callbackParent={this._onChildChanged.bind(this)} data={this.props} name={'brand'}></Lists>
            </Flex>
            {
              this.props.articleList.length > 0 ? 
                <Item data={this.props} navigation={this.props.navigation}></Item>
                : 
                <Image source= { require('../../../assets/images/th.gif') } style={{ height: Styles.Height(400), width: Styles.Width() }}></Image>
              }
          </WingBlank>
        </View>
        { this.state.isLoading ? <Loadmore data={ this.state.focusModel }></Loadmore> : null }
      </ScrollView>
    );
  }
}

export default connect(({ brand }) => ({
  ...brand,
}))(Brand);
