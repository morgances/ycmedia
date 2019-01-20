import React from 'react';
import { View, ScrollView, RefreshControl, Image } from 'react-native';
import { WingBlank, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Styles from '../../../../res/Styles'
import Colors from '../../../../res/Colors'

import Item from '../../../../components/Item_time'
import Lists from '../../../../components/ItemList'
import Loadmore from '../../../../components/LoadMore'
import refresh_result from '../../../../components/Refresh_result'
import NoData from '../../../../components/NoData'

class Culture extends React.Component {
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
      type: `city_culture/get`,
      payload: {
        category: 0,
        index: 0,
        nameSpace: 'city_culture',
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
        type: `city_culture/loadMore`,
        payload: {
          category: focusData.category,
          tag: focusData.tag,
          nameSpace: 'city_culture',
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
            onRefresh={this._onRefreshing.bind(this, [this.props, 'city_culture'])}
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
            <Flex style={{marginTop: Styles.Height(20)}} justify="between" wrap="wrap">
              <Lists callbackParent={this._onChildChanged.bind(this)} data={this.props} name={'city_culture'}></Lists>
            </Flex>
            { 
              this.state.isLoading == true ? 
                <Image source= { require('../../../../assets/images/th.gif') } style={{ height: Styles.Height(400), width: Styles.Width() }}></Image>
                :
                null
            }
            {
              this.props.articleList.length > 0 ? 
                <Item data={this.props} navigation={this.props.navigation}></Item>
                : 
                <NoData></NoData>
              }
          </WingBlank>
        </View>
        { this.state.isLoadingMore ? <Loadmore data={ this.state.focusModel }></Loadmore> : null }
      </ScrollView>
    )
  }
}

export default connect(({ city_culture }) => ({
  ...city_culture,
}))(Culture);