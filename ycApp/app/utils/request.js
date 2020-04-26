import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://39.105.141.168:9573/api/v1', // api的base_url
  timeout: 4000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
