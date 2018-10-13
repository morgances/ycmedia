/*
 * MIT License
 *
 * Copyright (c) 2018 SmartestEE Co., Ltd.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/*
 * Revision History:
 *     Initial: 2018/01/16        Feng Yifei
 */
import {
  TabNavigator,
} from 'react-navigation';

import FontsSize from './res/Fonts/size';
import Colors from './res/Colors';
import Styles from './res/Styles';

import MainScreen from './pages/Main';
import ActivityScreen from './pages/Activity';
import GuideScreen from './pages/Guide'
import MineScreen from './pages/Mine'
import LoginScreen from './pages/Login'
import SignScreen from './pages/Sign'
import CultureScreen from './pages/MainModules/Culture'
import ArtScreen from './pages/MainModules/Art'
import IntangibleScreen from './pages/MainModules/Intangible'
import TravelScreen from './pages/MainModules/Travel'
import BookScreen from './pages/MainModules/Book'
import VolunteerScreen from './pages/MainModules/Volunteer'
import SchoolScreen from './pages/MainModules/School'
import MovieScreen from './pages/MainModules/Movie'
import MemoryScreen from './pages/MainModules/Memory'
import MassCultureScreen from './pages/MainModules/MassCulture'
import TrainingScreen from './pages/ActivityModules/Training'
import MassActivityScreen from './pages/ActivityModules/MassActivity'

const BasicApp = TabNavigator({
  Main: {
    screen: MainScreen
  },
  Activity: {
    screen: ActivityScreen
  },
  Guide: {
    screen: GuideScreen
  },
  Mine: {
    screen: MineScreen
  },
},{
  initialRouteName: 'Main',
  tabBarPosition: 'bottom',
  animationEnabled: true,
  lazy: true,
  tabBarOptions: {
    showIcon: true,
    activeTintColor: Colors.primary,
    inactiveTintColor: Colors.gray2,
    pressOpacity: 4,
    labelStyle: {
      fontSize: FontsSize.small,
      paddingBottom: Styles.Height(10)
    },
    iconStyle: {
      marginBottom: Styles.Height(-5),
      marginTop: Styles.Height(-5)
    },
    style: {
      backgroundColor: Colors.white,
      height: Styles.Height(98),
    },
    indicatorStyle: {
      height: 0,
    },
  },
})

const Navigations = {
  Basic: { screen: BasicApp },
  Culture: { 
    screen: CultureScreen 
  },
  Art: {
    screen: ArtScreen
  },
  Intangible: {
    screen: IntangibleScreen
  },
  Travel: {
    screen: TravelScreen
  },
  Book: {
    screen: BookScreen
  },
  Volunteer: {
    screen: VolunteerScreen
  },
  School: {
    screen: SchoolScreen
  },
  Movie: {
    screen: MovieScreen
  },
  Memory: {
    screen: MemoryScreen
  },
  MassCulture: {
    screen: MassCultureScreen
  },
  Training: {
    screen: TrainingScreen
  },
  MassActivity: {
    screen: MassActivityScreen
  },
  Login: {
    screen: LoginScreen
  },
  Sign: {
    screen: SignScreen
  }
};

export default Navigations;
