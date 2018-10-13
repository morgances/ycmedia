import React from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { Flex, WingBlank } from 'antd-mobile-rn';

import Navigator, { dispatcher } from '../../../helper/navigator';
import Styles from '../../../res/Styles';
import Colors from '../../../res/Colors';
import Font from '../../../res/Fonts/size';
import Weight from '../../../res/Fonts/weight'

export default class Modules extends React.Component {
  render() {
    const dispatch = dispatcher(this.props);
    return (
      <WingBlank size='md' style={{ marginBottom: 5, paddingTop: 10 }}>
        <Flex style={{ marginBottom: 4}} wrap='wrap' justify="center">
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Culture'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__one.png')}></Image>
                <Text style={styles.fontSize}>文化资讯</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Art'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__two.png')}></Image>
                <Text style={styles.fontSize}>艺术鉴赏</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Intangible'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__three.png')}></Image>
                <Text style={styles.fontSize}>非遗传承</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Travel'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__four.png')}></Image>
                <Text style={styles.fontSize}>银川旅游</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        <Flex style={{ marginBottom: 4 }} wrap='wrap' justify="center">
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Book'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__five.png')}></Image>
                <Text style={styles.fontSize}>书香银川</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Volunteer'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__six.png')}></Image>
                <Text style={styles.fontSize}>文化志愿</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('School'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__seven.png')}></Image>
                <Text style={styles.fontSize}>百姓学堂</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Movie'))}>
              <View style={styles.viewFlex}>
                <Image style={styles.image} source={require('../../../assets/images/Main/module__eight.png')}></Image>
                <Text style={styles.fontSize}>影剧院</Text>
              </View>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
        <Flex style={{ marginTop: 6 }} wrap='wrap' justify="center">
          <Flex.Item style={styles.module__bottom}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('Memory'))}>
              <ImageBackground style={styles.image__bottom} source={require('../../../assets/images/Main/yc__memory.jpg')}>
                <Text style={styles.text__bottom}>银川记忆</Text>
                <Text>Yinchuan Memory</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Flex.Item>
          <Flex.Item style={styles.module__bottom}>
            <TouchableOpacity onPress={() => dispatch(Navigator.navigate('MassCulture'))}>
              <ImageBackground style={styles.image__bottom} source={require('../../../assets/images/Main/yc__culture.jpg')}>
                <Text style={styles.text__bottom}>群众文化</Text>
                <Text>Mass Culture</Text>
              </ImageBackground>
            </TouchableOpacity>
          </Flex.Item>
        </Flex>
      </WingBlank>
    )
  }
}

const styles = StyleSheet.create({
  module: {
    height: Styles.Height(140),
    alignItems: 'center',
  },
  image: {
    height: Styles.Height(70),
    width: Styles.Width(70),
    marginTop: Styles.Height(16),
    marginBottom: Styles.Height(5)
  },
  viewFlex: {
    alignItems: 'center'
  },
  fontSize: {
    fontSize: Font.small
  },
  module__bottom: {
    height: Styles.Height(140),
    backgroundColor: Colors.white,
    marginLeft: Styles.Width(5),
    marginRight: Styles.Width(5)
  },
  image__bottom: {
    height: Styles.Height(140),
    alignItems: 'center'
  },
  text__bottom: {
    fontSize: Font.medium,
    marginTop: Styles.Height(30),
    fontWeight: Weight.blod
  }
})