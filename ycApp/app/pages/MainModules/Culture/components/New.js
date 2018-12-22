import React from 'react';
import { View, ScrollView, RefreshControl } from 'react-native';
import { WingBlank, Toast } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'

import Item from '../../../../components/Item_time'
import Loadmore from '../../../../components/LoadMore'
import refresh_result from '../../../../components/Refresh_result'

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loadMore: 0
    }
  }

  _onRefreshing(data) {
    this.setState(() => {
      return {
        isRefreshing: true
      }
    })
    const { dispatch } = data[0]
    const result = dispatch({
      type: `${data[1]}/refresh`,
    })
    refresh_result(result)
    this.setState(() => {
      return {
        isRefreshing: false
      }
    })
  }

  _onLoadingMore(event) {
    if (this.state.loadMore == 1 || this.state.loadMore == 2) return
    let y = event.nativeEvent.contentOffset.y;
    let height = event.nativeEvent.layoutMeasurement.height;
    let contentHeight = event.nativeEvent.contentSize.height;
    if (y + height >= contentHeight - 30) {
      this.setState({
        loadMore: 1
      });
      const { dispatch } = this.props
      dispatch({
        type: `culture_news/loadMore`,
      })
      if (Response.state) {
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
        style={{backgroundColor: Colors.white}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefreshing.bind(this, [this.props, 'culture_news'])}
            titleColor="#00ff00"
            colors={[Colors.primary]}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={this._onLoadingMore.bind(this)}
        scrollEventThrottle={100}
      >
        <View>
          <WingBlank size="lg">
            <Item data={this.props.culture}></Item>
          </WingBlank>
        </View>
        {this.state.loadMore > 0 ? <Loadmore isLoadAll={ this.state.loadMore }></Loadmore> : null }
      </ScrollView>
    )
  }
}

export default connect(({ culture_news }) => ({
  ...culture_news,
}))(News);