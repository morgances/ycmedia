import { Dimensions } from 'react-native';

const _width = 640;
const _height = 1138;

const Styles = {
  ScreenWidth: Dimensions.get('window').width,
  ScreenHeight: Dimensions.get('window').height,

  VirtualWidth: _width,
  VirtualHeight: _height,

  Width: (y = 640) => {
    return (y * Dimensions.get('window').width / _width); // eslint-disable-line
  },
  Height: (x = 1138) => {
    return x * Dimensions.get('window').height / _height; //eslint-disable-line
  },
};

export default Styles;