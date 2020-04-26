/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, ScrollView, RefreshControl, Image } from 'react-native'
import { WingBlank, Flex } from 'antd-mobile-rn'
import { connect } from 'react-redux';
import { Appearance } from 'react-native-appearance';

import Size from '../../../res/Fonts/size'
import Colors from '../../../res/Colors'
import Styles from '../../../res/Styles'

import Item from '../../../components/Item_instruction'
import Lists from '../../../components/ItemList'
import Loadmore from '../../../components/LoadMore'
import refresh_result from '../../../components/Refresh_result'
import NoData from '../../../components/NoData'

class Brand extends Component<{}> {
  static navigationOptions = {
    title: '文化品牌',
    headerStyle: {
      backgroundColor: Appearance.getColorScheme() == 'dark' ? '#333' : "#00b9a2",
      elevation: 0,
      shadowOpacity: 0,
      height: 44
    },
    headerTintColor: '#fff',
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
      isLoadingMore: false,
      isLoading: true
    }
  }

  async componentDidMount() {
    const { dispatch } = this.props
    const { focusModel } = await dispatch({
      type: `brand/get`,
      payload: {
        category: '文化品牌',
        index: 0,
        tag: '',
        label: '公益性文化产品',
        nameSpace: 'brand',
      }
    })
    this.setState(() => {
      return {
        focusModel: {...focusModel},
        isLoading: false
      }
    })
  }

  _onChildChanged(index, data) {
    this.setState(() => {
      return {
        isLoading: true,
      }
    })
    const focusModel = data.title[index]
    this.setState(() => {
      return {
        focusModel: {
          ...focusModel
        },
        isLoading: false
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
          isLoadingMore: true
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
        style={{backgroundColor: this.props.theme.background, marginTop: Styles.Height(10)}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefreshing.bind(this, [this.props, 'brand'])}
            titleColor="#00ff00"
            colors={[this.props.theme.primary]}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={this._onLoadingMore.bind(this)}
        scrollEventThrottle={200}
      >
        <View>
          <WingBlank size="lg">
            <Flex style={{marginTop: Styles.Height(20)}} justify="start" wrap="wrap">
              <Lists theme={this.props.theme} callbackParent={this._onChildChanged.bind(this)} data={this.props} name={'brand'}></Lists>
            </Flex>
            { 
              this.state.isLoading == true ? 
                <Image source= { require('../../../assets/images/th.gif') } style={{ height: Styles.Height(400), width: Styles.Width() - 30 }}></Image>
                :
                null
            }
            {
              this.props.articleList.length > 0 ? 
                <Item theme={this.props.theme} data={this.props} navigation={this.props.navigation}></Item>
                :
                null
            }
            {
              this.props.articleList.length === 0 && this.state.isLoading === false ? 
                <NoData></NoData>
                : 
                null
            }
          </WingBlank>
        </View>
        { this.state.isLoadingMore ? <Loadmore data={ this.state.focusModel }></Loadmore> : null }
      </ScrollView>
    );
  }
}

export default connect(({ brand, theme }) => ({
  ...brand,
  ...theme,
}))(Brand);
