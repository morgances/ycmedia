import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { WingBlank, Flex } from 'antd-mobile-rn';
import HTMLView from 'react-native-htmlview';
import { Appearance } from 'react-native-appearance';

import Colors from '../../res/Colors'
import Styles from '../../res/Styles'
import Size from '../../res/Fonts/size'


class Detail extends Component<{}> {
  static navigationOptions = {
    title: '文章详情',
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
      isLoading: true,
      isError: false
    }
  }

  async componentDidMount() {
    const { params } = this.props.navigation.state
    const { dispatch } = this.props
    const resp = await dispatch({
      type: `detail/getText`,
      payload: {
        aid: params.aid
      }
    })
    if (resp.length > 0) {
      this.setState({ 'isLoading': false })
    }
    if (!resp) {
      this.setState({
        'isLoading': false,
        'isError': true
      })
    }
  }

  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: this.props.theme.background}}
        >
        {
          this.state.isLoading == false && this.state.isError == false ? 
          <WingBlank size="lg">
            <View style={[styles.container, {flex: 1}]}>
              <Text style={{...styles.title, color: this.props.theme.title}}>{ this.props.article.title }</Text>
              <Flex style={ styles.instruction }>
                <Flex.Item style={[{ flex: 1 }]}>
                  <Text style={{ textAlign: 'left', color: this.props.theme.subTitle }}>{ this.props.article.author }</Text>
                </Flex.Item>
                <Flex.Item style={[{ flex: 1 }]}>
                  <Text style={{ textAlign: 'right', color: this.props.theme.subTitle }}>{ this.props.article.time }</Text>
                </Flex.Item>
              </Flex>
              <HTMLView style={styles.article} stylesheet={{ p: {color: this.props.theme.text, fontSize: Size.medium}, a: {color: this.props.theme.text}}} value={ `${this.props.article.text}` }></HTMLView>
            </View>
          </WingBlank> : 
          null
        }
        {
          this.state.isLoading == true ?
          <Image source= { require('../../assets/images/th.gif') } style={ styles.gif }></Image> :
          null
        }
        {
          this.state.isError == true ?
          <Text>啊偶，好像出了点问题</Text> : 
          null
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Styles.Height(20),
    paddingBottom: Styles.Height(20)
  },
  title: {
    fontSize: Size.large,
  },
  instruction: {
    marginTop: Styles.Height(15),
  },
  article: {
    marginTop: Styles.Height(30),
    // fontSize: Size.medium
  },
  gif: {
    height: Styles.Height(400),
    width: Styles.Width()
  }
})

export default connect(({ detail, theme }) => ({
  ...detail,
  ...theme,
}))(Detail);

