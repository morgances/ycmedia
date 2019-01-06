import { Toast } from 'antd-mobile-rn';

function refresh_result(result) {
  if (result.length > 0) {
    Toast.success('刷新成功', 1)
  } else if (result.length == 0) {
    Toast.info('无更多信息', 1)
  } else {
    Toast.fail('加载失败', 1)
  }
}

export default refresh_result