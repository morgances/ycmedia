import React from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Colors from '../../../../res/Colors'
import Styles from '../../../../res/Styles'

import Item from '../../../../components/Item_time'
import Lists from '../../../../components/ItemList'
import Loadmore from '../../../../components/LoadMore'
import refresh_result from '../../../../components/Refresh_result'

class Culture extends React.Component {
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
      type: `intangible_culture/get`,
      payload: {
        category: 0,
        index: 0,
        nameSpace: 'intangible_culture'
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
    const result = dispatch({
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
        type: `intangible_culture/get`,
        payload: {
          category: 0,
          tag: 0,
          nameSpace: 'intangible_culture',
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
            onRefresh={this._onRefreshing.bind(this, [this.props, 'intangible_culture'])}
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
            <Flex style={{marginTop: Styles.Height(20)}} wrap="wrap" justify="around">
              <Lists data={this.props} name={'intangible_culture'}></Lists>
            </Flex>
            <Flex style={{marginTop: Styles.Height(5)}} justify="between" wrap="wrap">
              {
                this.props.articleList.length > 0 ? 
                  <Item data={this.props.articleList} navigation={this.props.navigation}></Item>
                  : 
                  <Image></Image>
              }
            </Flex>
          </WingBlank>
        </View>
        {this.state.loadMore > 0 ? <Loadmore isLoadAll={ this.state.loadMore }></Loadmore> : null }
      </ScrollView>
    )
  }
}

export default connect(({ intangible_culture }) => ({
  ...intangible_culture,
}))(Culture);