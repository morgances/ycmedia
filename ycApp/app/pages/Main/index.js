/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { ScrollView, StatusBar, View, RefreshControl, Image, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Flex, WingBlank } from 'antd-mobile-rn';
import { Appearance } from 'react-native-appearance';

import isDark from '../../res/Colors'
import Size from '../../res/Fonts/size'
import Styles from '../../res/Styles'

import Carousel from './components/Carousel'
import Modules from './components/Modules'
import Item from '../../components/Item_time'
import Loadmore from '../../components/LoadMore'
import refresh_result from '../../components/Refresh_result'

class Main extends Component<{}> {
  static navigationOptions = {
    title: '银川公共文化',
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
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      loadMore: false,
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    const colorScheme = Appearance.getColorScheme();
    const theme = isDark(colorScheme)
    dispatch({
      type: `theme/set`,
      payload: {
        theme,
      }
    })
  }

  componentDidMount() {
    const { dispatch } = this.props
    // dispatch({
    //   type: `home/get`,
    //   payload: {
    //     page: 1,
    //   }
    // })
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
      const data = await dispatch({
        type: `home/loadMore`,
        payload: {
          nameSpace: 'home'
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
          style={{backgroundColor: this.props.theme.background}}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefreshing.bind(this, [this.props, 'home'])}
              titleColor={this.props.theme.title}
              colors={["#00b9a2"]}
              progressBackgroundColor={this.props.theme.background}
            />
          }
          onScroll={this._onLoadingMore.bind(this)}
          scrollEventThrottle={200}
        >
          <StatusBar  
            animated={true}
            hidden={false}  
            backgroundColor={ this.props.theme.primary } 
            translucent={false}
            barStyle={'light-content'}
          >  
          </StatusBar>
          <View style={{backgroundColor: this.props.theme.background}}>
            <Carousel></Carousel>
            <Modules navigation={this.props.navigation}></Modules>
            <View style={{background: this.props.theme.background, ...styles.news}}>
              <View style={styles.news_header}>
                <Flex wrap='wrap' justify="center">
                  <Text style={{ fontSize: Size.xlarge, color: this.props.theme.title }}>最新资讯</Text>
                </Flex>
              </View>
              <View style={{ backgroundColor: this.props.theme.background, ...styles.news_content_view}}>
                <WingBlank size="lg">
                  {
                    this.props.articleList.length > 0 ? 
                      <View>
                          <Item data={this.props} navigation={this.props.navigation} theme={this.props.theme}></Item>
                      </View>
                      : 
                      <Image source= { require('../../assets/images/th.gif') } style={{backgroundColor: this.props.theme.background, height: Styles.Height(400), width: Styles.Width() - 30 }}></Image>
                    }          
                  { this.state.loadMore ? <Loadmore theme={this.props.theme} data={ this.state.loadMore }></Loadmore> : null }
                </WingBlank>
              </View>
            </View>
          </View> 
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  news: {
    marginTop: Styles.Height(20)
  },
  news_header: {
    alignItems: 'center',
    paddingTop: Styles.Height(10),
    paddingBottom: Styles.Height(15),
  },
  news_content_view: {
    borderRadius: 15,
    paddingTop: Styles.Height(10),
  },
  news_content: {
    borderBottomWidth: 1,
    borderStyle: 'solid',
    paddingTop: Styles.Height(20),
    paddingBottom: Styles.Height(20)
  },
  news_content_image: {
    height: Styles.Height(140),
    width: Styles.Width(200),
    borderRadius: 5
  },
  news_content_time_view: {
    position: 'relative',
    top: 8
  },
  news_content_time: {
    textAlign: 'right',
  }
})

export default connect(({ home, theme }) => ({
  ...home,
  ...theme
}))(Main);
