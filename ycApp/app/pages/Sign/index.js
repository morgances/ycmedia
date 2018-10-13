import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity, TextInput } from 'react-native';
import { WingBlank, Button, Flex } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Navigator, { dispatcher } from '../../helper/navigator';
import Styles from '../../res/Styles'
import FontSize from '../../res/Fonts/size'
import Colors from '../../res/Colors'

class Login extends React.Component {
  static navigationOptions = {
    header: null
  }
  render() {
    const dispatch = dispatcher(this.props);
    return (
      <ImageBackground style={Styles.Width()} source={require('../../assets/images/Main/background.jpg')}>
        <View>
          <Flex>
            <Flex.Item style={{paddingLeft: Styles.Width(20), paddingTop: Styles.Height(20)}}>
              <Image style={styles.backIcon} source={require('../../assets/images/Total/backicon_black.jpg')}></Image>
            </Flex.Item>
            <Flex.Item style={{paddingRight: Styles.Width(25), paddingTop: Styles.Height(20)}}>
              <TouchableOpacity>
                <Text onPress={() => dispatch(Navigator.navigate('Login'))} style={styles.signIn}>注册</Text>
              </TouchableOpacity>
            </Flex.Item>
          </Flex>
          <Text style={styles.title}>用户登录</Text>
        </View>
        <View>
          <WingBlank size='lg'>
          <TextInput
            style={styles.inputItem}
            placeholder='用户名'
            placeholderTextColor='#d9cead'></TextInput>
          <TextInput
            style={styles.inputItem}
            placeholder='密码'
            type='password'
            placeholderTextColor='#d9cead'></TextInput>
          <TextInput
            style={styles.inputItem}
            placeholder='用户名'
            placeholderTextColor='#d9cead'></TextInput>
          <Text style={styles.forget}>忘记密码？</Text>
          <Button style={styles.button} size='large'>
            <Text style={{color: Colors.white}}>登录</Text>
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
    height: Styles.Height(34),
    width: Styles.Width(34)
  },
  signIn: {
    fontSize: FontSize.medium,
    textAlign: 'right'
  },
  title: {
    width: Styles.Width(),
    height: Styles.Height(300),
    textAlign: 'center',
    paddingTop: Styles.Height(150),
    fontSize: FontSize.xlarge,
    color: '#000',
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
    marginTop: Styles.Height(70),
    marginLeft: Styles.Width(10),
    marginRight: Styles.Width(10)
  },
  confirm: {
    textAlign: 'center',
    color: Colors.gray3,
    marginTop: Styles.Height(130),
    marginBottom: Styles.Height(40)
  }
})


export default connect(({ login }) => ({
  ...login,
}))(Login);