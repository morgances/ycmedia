import React from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Item from '../../../../components/Item_time'
import Loadmore from '../../../../components/LoadMore'
import refresh_result from '../../../../components/Refresh_result'

class Service extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loadMore: 0
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: `book_service/get`,
      payload: {
        category: 0,
        tag: 0,
        page: 0,
        nameSpace: 'book_service'
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
        type: `book_service/get`,
        payload: {
          category: 0,
          tag: 0,
          nameSpace: 'book_service'
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
        style={{backgroundColor: Colors.white}}
        refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={this._onRefreshing.bind(this, [this.props, 'book_service'])}
            titleColor="#00ff00"
            colors={[Colors.primary]}
            progressBackgroundColor="#ffffff"
          />
        }
        onScroll={this._onLoadingMore.bind(this)}
        scrollEventThrottle={200}
      >
        {
          this.props.articleList.length > 0 ? 
            <View>
              <WingBlank size="lg">
                <Item data={this.props.articleList} navigation={this.props.navigation}></Item>
              </WingBlank>
            </View>
            : 
            <Image></Image>
        }
        {this.state.loadMore > 0 ? <Loadmore isLoadAll={ this.state.loadMore }></Loadmore> : null }
      </ScrollView>
    )
  }
}

export default connect(({ book_service }) => ({
  ...book_service,
}))(Service);