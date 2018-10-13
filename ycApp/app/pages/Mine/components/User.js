import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground } from 'react-native';
import { connect } from 'react-redux';

import Navigator, { dispatcher } from '../../../helper/navigator';
import Styles from '../../../res/Styles'
import Colors from '../../../res/Colors'
import Size from '../../../res/Fonts/size'

class User extends React.Component {
  login(IsLogin) {
    if (IsLogin) return;
    const dispatch = dispatcher(this.props);
    dispatch(Navigator.navigate('Sign'))
  }
  render() {
    return (
      <View>
        <ImageBackground style={styles.image} source={require('../../../assets/images/user.jpg')}>
          <Image style={styles.avatar}></Image>
          <Text onPress={() => this.login(this.props.IsLogin)} style={styles.userName}>{this.props.IsLogin ? '银川文化迷' : '请登录'}</Text>
        </ImageBackground>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  image: {
		height: Styles.Height(300),
	},
	avatar: {
		backgroundColor: Colors.white,
		height: Styles.Height(120),
		width: Styles.Width(120),
		borderRadius: 150,
		position: 'absolute',
		top: Styles.Height(70),
		left: Styles.Width(30)
	},
	userName: {
		color: Colors.white,
		fontSize: Size.large,
		position: 'absolute',
		top: Styles.Height(100),
		left: Styles.Width(180)
	}
})

export default connect(({ login }) => ({
  ...login,
}))(User);