import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Flex, WingBlank } from 'antd-mobile-rn';

import Navigator, { dispatcher } from '../../../helper/navigator';
import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';
import Font from '../../../res/Fonts/size';

export default class Modules extends React.Component {
  render() {
    const dispatch = dispatcher(this.props);
    return (
      <WingBlank size='md' style={{ paddingTop: 6 }}>
        <Flex>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Culture'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_one.png')}></Image>
                <Text style={styles.text}>文化资讯</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Book'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_two.png')}></Image>
                <Text style={styles.text}>书香银川</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Intangible'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_three.png')}></Image>
                <Text style={styles.text}>遗脉相承</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Travel'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_four.png')}></Image>
                <Text style={styles.text}>银川旅游</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Art'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_five.png')}></Image>
                <Text style={styles.text}>艺术空间</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Volunteer'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_six.png')}></Image>
                <Text style={styles.text}>文化消费</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        <Flex>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('School'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_seven.png')}></Image>
                <Text style={styles.text}>文化品牌</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Movie'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_eight.png')}></Image>
                <Text style={styles.text}>凤城演绎</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Movie'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module_nine.png')}></Image>
                <Text style={styles.text}>文化地图</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
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
    backgroundColor: Colors.white,
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