import axios from 'axios'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://39.98.162.91:9573/api/v1/article', // api的base_url
  timeout: 4000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  console.log(config, 'request')
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
