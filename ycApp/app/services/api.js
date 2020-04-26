import request from '../utils/request'

export function getList({ category, tag, page, label = "" }) {
  return request({
    url: '/article/getlist',
    method: 'POST',
    data: {
      category,
      tag,
      label,
      page
    }
  })
}

export function getBanners() {
  return request({
    url: '/banner/all',
    method: 'POST',
    data: {}
  })
}

export function getNews({ page }) {
  return request({
    url: '/article/news',
    method: 'POST',
    data: {
      page
    }
  })
}


export function getText({ aid }) {
  return request({
    url: '/article/gettext',
    method: 'POST',
    data: {
      aid
    }
  })
}

export function getMore({ category, tag, date, lable }) {
  return request({
    url: '/article/getmore',
    method: 'POST',
    data: {
      category,
      tag,
      date,
      lable
    }
  })
}
