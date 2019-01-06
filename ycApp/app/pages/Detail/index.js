import React, { Component } from 'react';
import { View, ScrollView, Text } from 'react-native';
import { connect } from 'react-redux';

import Colors from '../../res/Colors';
import Size from '../../res/Fonts/size'


class Detail extends Component<{}> {
  static navigationOptions = {
    title: '',
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
  render() {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{backgroundColor: Colors.white}}
        >       
        <View style={{flex: 1}}>
         <Text>{ this.props.article.title }</Text>
        </View>
      </ScrollView>
    );
  }
}

export default connect(({ detail }) => ({
  ...detail,
}))(Detail);