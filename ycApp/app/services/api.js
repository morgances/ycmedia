import request from '../utils/request'

export function getList({ category, tag, page, label = "" }) {
  return request({
    url: '/getlist',
    method: 'POST',
    data: {
      category,
      tag,
      label,
      page
    }
  })
}

export function getNews({ page }) {
  return request({
    url: '/news',
    method: 'POST',
    data: {
      page
    }
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
