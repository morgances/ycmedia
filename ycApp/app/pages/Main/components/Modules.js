import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Flex, WingBlank } from 'antd-mobile-rn';
import { connect } from 'react-redux';

import Navigator, { dispatcher } from '../../../helper/navigator';
import Styles from '../../../res/Styles';
import Font from '../../../res/Fonts/size';

class Modules extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const dispatch = dispatcher(this.props);
    return (
      <WingBlank size='md' style={{ paddingTop: 6 }}>
        <Flex>
          <Flex.Item style={{backgroundColor: this.props.theme.containerbg, ...styles.module}}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Culture'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_one.png')}></Image>
                <Text style={styles.text, { color: this.props.theme.text }}>文化资讯</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={{backgroundColor: this.props.theme.containerbg, ...styles.module}}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Book'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_two.png')}></Image>
                <Text style={styles.text, { color: this.props.theme.text }}>书香银川</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={{backgroundColor: this.props.theme.containerbg, ...styles.module}}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Intangible'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_three.png')}></Image>
                <Text style={styles.text, { color: this.props.theme.text }}>遗脉相承</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={{backgroundColor: this.props.theme.containerbg, ...styles.module}}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Art'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_five.png')}></Image>
                <Text style={styles.text, { color: this.props.theme.text }}>艺术空间</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={{backgroundColor: this.props.theme.containerbg, ...styles.module}}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Brand'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_seven.png')}></Image>
                <Text style={styles.text, { color: this.props.theme.text }}>文化品牌</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={{backgroundColor: this.props.theme.containerbg, ...styles.module}}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('City'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_eight.png')}></Image>
                <Text style={styles.text, { color: this.props.theme.text }}>凤城演绎</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        <Flex>
          {/* <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Spending'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_six.png')}></Image>
                <Text style={styles.text}>文化消费</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item> */}
          {/* <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Travel'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_four.png')}></Image>
                <Text style={styles.text}>银川旅游</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item> */}
          {/* <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Map'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_nine.png')}></Image>
                <Text style={styles.text}>文化地图</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item> */}
        </Flex>
      </WingBlank>
    )
  }
}

const styles = StyleSheet.create({
  module: {
    alignItems: 'center',
    marginLeft: Styles.Width(6),
    marginRight: Styles.Width(6),
    marginBottom: Styles.Width(6),
    marginTop: Styles.Width(6),
    borderRadius: 6,
    padding: Styles.Width(12)
  },
  image: {
    marginBottom: Styles.Height(15),
    marginTop: Styles.Height(10),
    height: Styles.Height(80),
    width: Styles.Height(80)
  },
  viewFlex: {
    alignItems: 'center',
  },
  text: {
    fontSize: Font.xmedium,
    marginBottom: Styles.Height(10),
  }
})

export default connect(({ home, theme }) => ({
  ...home,
  ...theme
}))(Modules);