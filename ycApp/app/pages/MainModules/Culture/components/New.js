import React from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Styles from '../../../../res/Styles'
import Item from '../../../../components/Item_time'
import Loadmore from '../../../../components/LoadMore'
import refresh_result from '../../../../components/Refresh_result'
import NoData from '../../../../components/NoData'

class News extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loadMore: false,
      isLoading: true
    }
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: `culture_news/get`,
      payload: {
        category: '文化资讯',
        tag: '文化动态',
        page: 1,
        lable: "",
        nameSpace: 'culture_news'
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
        loadMore: true
      });
      const { dispatch } = this.props
      const data  = await dispatch({
        type: `culture_news/loadMore`,
        payload: {
          category: '文化资讯',
          tag: '文化动态',
          nameSpace: 'culture_news'
        }
      })
      this.setState({
        loadMore: data
      })
    } else {
      this.setState({
        loadMore: false
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
            onRefresh={this._onRefreshing.bind(this, [this.props, 'culture_news'])}
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
            <Image source= { require('../../../../assets/images/th.gif') } style={{ height: Styles.Height(400), width: Styles.Width() - 30 }}></Image>
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
        { this.state.loadMore  ? <Loadmore data={ this.state.loadMore }></Loadmore> : null }
      </ScrollView>
    )
  }
}

export default connect(({ culture_news, theme }) => ({
  ...culture_news,
  ...theme,
}))(News);
