import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { WingBlank, Button } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Styles from '../../res/Styles'
import FontSize from '../../res/Fonts/size'
import Colors from '../../res/Colors'

class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <ImageBackground style={Styles.Width()} source={require('../../assets/images/Main/background.jpg')}>
        <View>
          <Image style={styles.backIcon} source={require('../../assets/images/Total/backicon_black.jpg')}></Image>
        </View>
        <Text style={styles.title}>用户注册</Text>
        <View>
          <WingBlank size='lg'>
          <TextInput
            style={styles.inputItem}
            placeholder='用户名'
            placeholderTextColor='#d9cead'></TextInput>
          <TextInput
            style={styles.inputItem}
            placeholder='密码'
            secureTextEntry={true}
            placeholderTextColor='#d9cead'></TextInput>
          <TextInput
            style={styles.inputItem}
            placeholder='确认密码'
            secureTextEntry={true}
            placeholderTextColor='#d9cead'></TextInput>
          <TextInput
            style={styles.inputItem}
            placeholder='邮箱地址'
            placeholderTextColor='#d9cead'></TextInput>
          <Button style={styles.button} size='large'>
            <Text style={{color: Colors.white}}>立即注册</Text>
          </Button>
          <Text style={styles.confirm}>登录即表示您已同意我们的<Text style={{color: '#f05c57'}}>《使用协议》</Text></Text>
          </WingBlank>
        </View>
      </ImageBackground>
    )
  }
}


const styles = StyleSheet.create({
  backIcon: {
    position: 'absolute',
    top: Styles.Height(30),
    left: Styles.Width(20),
    height: Styles.Height(34),
    width: Styles.Width(34)
  },
  signIn: {
    position: 'absolute',
    top: Styles.Height(30),
    right: Styles.Width(20),
    fontSize: FontSize.medium
  },
  title: {
    width: Styles.Width(),
    height: Styles.Height(300),
    textAlign: 'center',
    fontSize: FontSize.xlarge,
    color: '#000',
    paddingTop: Styles.Height(170)
  },
  inputItem: {
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#d9cead',
    marginBottom: Styles.Height(30)
  },
  forget: {
    textAlign: 'right',
    color: Colors.primary
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    color: Colors.white,
    marginTop: Styles.Height(70),
    marginLeft: Styles.Width(10),
    marginRight: Styles.Width(10)
  },
  confirm: {
    textAlign: 'center',
    color: Colors.gray3,
    marginTop: Styles.Height(100),
    marginBottom: Styles.Height(40)
  }
})


export default connect(({ login }) => ({
  ...login,
}))(Login);