import request from '../utils/request'

export function getList({ category, tag, page, lable = 0 }) {
  return request({
    url: '/getlist',
    method: 'POST',
    data: {
      category,
      tag,
      lable,
      page
    }
  })
}

export function getNews() {
  return request({
    url: '/news',
    method: 'GET'
  })
}


export function getText({ aid }) {
  return request({
    url: '/gettext',
    method: 'POST',
    data: {
      aid
    }
  })
}

export function getMore({ category, tag, date, lable }) {
  return request({
    url: '/getmore',
    method: 'POST',
    data: {
      category,
      tag,
      date,
      lable
    }
  })
}
