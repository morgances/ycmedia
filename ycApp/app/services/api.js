import request from '../utils/request'

export function getList({ category, tag, page }) {
  return request({
    url: '/getlist',
    method: 'POST',
    data: {
      category,
      tag,
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

export function getMore({ category, tag, date }) {
  return request({
    url: '/getmore',
    method: 'POST',
    data: {
      category,
      tag,
      date
    }
  })
}
