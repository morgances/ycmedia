import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://10.0.0.29:8080', // api的base_url
  timeout: 5000 // 请求超时时间
})

// request拦截器
// service.interceptors.request.use(config => {
// })

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log('err' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
