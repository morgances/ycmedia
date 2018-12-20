import React from 'react';
import { WebView, View } from 'react-native';

import Styles from '../../../../res/Styles'

export default class Web extends React.Component {
  render() {
    return (
      <View style={{width:Styles.Width(), height:Styles.Height()}}>
        <WebView bounces={false}
          scalesPageToFit={true}
          source={{uri: 'http://222.75.151.206:9002/InDigLib/phone/brower/index.jsp'}}
          >
        </WebView>
      </View>
    )
  }
}
