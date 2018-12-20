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

import init from './init';
import router from './router';
import culture_news from './Culture/news'
import book_books from './Book/books'
import intangible_culture from './Intangible/culture'
import intangible_smriti from './Intangible/smriti'
import travel from './Travel/index'
import art_display from './Art/display'
import spending_cinema from './Spending/cinema'
import spending_theatre from './Spending/theatre'
import brand from './Brand/index'
import city_culture from './City/culture'
import city_memory from './City/memory'

export const Models = [
  init,
  router,
  culture_news,
  book_books,
  intangible_culture,
  intangible_smriti,
  travel,
  art_display,
  spending_cinema,
  spending_theatre,
  brand,
  city_culture,
  city_memory
];
