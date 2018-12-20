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

import MainScreen from './pages/Main';
import CultureScreen from './pages/MainModules/Culture'
import ArtScreen from './pages/MainModules/Art'
import IntangibleScreen from './pages/MainModules/Intangible'
import TravelScreen from './pages/MainModules/Travel'
import BookScreen from './pages/MainModules/Book'
import SpendingScreen from './pages/MainModules/Spending'
import BrandScreen from './pages/MainModules/Brand'
import CityScreen from './pages/MainModules/City'

const Navigations = {
  Basic: { 
    screen: MainScreen
  },
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
  Spending: {
    screen: SpendingScreen
  },
  Brand: {
    screen: BrandScreen
  },
  City: {
    screen: CityScreen
  },
};

export default Navigations;
