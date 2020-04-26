/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { View, ScrollView, RefreshControl, Image } from 'react-native'
import { WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Styles from '../../../../res/Styles'
import Item from '../../../../components/Item_instruction'
import Loadmore from '../../../../components/LoadMore'
import refresh_result from '../../../../components/Refresh_result'
import NoData from '../../../../components/NoData'

class Exhibition extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loadMore: 0,
      isLoading: true
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: `art_venues/get`,
      payload: {
        category: '艺术空间',
        tag: '艺术场馆',
        page: 1,
        nameSpace: 'art_venues'
      }
    })
    this.setState(() => {
      return {
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
    if (this.state.loadMore == 1 || this.state.loadMore == 2) return
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 30) {
      this.setState({
        loadMore: 1
      });
      const { dispatch } = this.props
      const { data } = await dispatch({
        type: `art_venues/loadMore`,
        payload: {
          category: '艺术空间',
          tag: '艺术场馆',
          nameSpace: 'art_venues'
        }
      })
      if (data.length == 0) {
        this.setState({
          loadMore: 2
        })
      } else {
        this.setState({
          loadMore: 0
        })
      }
    } else {
      this.setState({
        loadMore: 0
      });
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
            onRefresh={this._onRefreshing.bind(this, [this.props, 'art_venues'])}
            titleColor="#00ff00"
            colors={[this.props.theme.primary]}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={this._onLoadingMore.bind(this)}
        scrollEventThrottle={200}
      >
        { 
          this.state.isLoading == true ? 
            <Image source= { require('../../../../assets/images/th.gif') } style={{ height: Styles.Height(400), width: Styles.Width() }}></Image>
            :
            null
        }
        {
          this.props.articleList.length > 0 && this.state.isLoading === false ? 
            <View>
              <WingBlank size="lg">
                <Item theme={this.props.theme} data={this.props} navigation={this.props.navigation}></Item>
              </WingBlank>
            </View>
            : 
            null
        }
        {
          this.props.articleList.length === 0 && this.state.isLoading === false ? 
            <NoData></NoData>
            : 
            null
        }
        { this.state.loadMore > 0 ? <Loadmore data={ this.state.loadMore }></Loadmore> : null }
      </ScrollView>
    );
  }
}

export default connect(({ art_venues, theme }) => ({
  ...art_venues,
  ...theme,
}))(Exhibition);
