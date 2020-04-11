import request from '@/utils/request'

export function getOssStsToken() {
  return request({
    url: '/api/Oss/GetOssStsToken',
    method: 'get'
  })
}

export function RedirectOssResource(key) {
  return request({
    url: `/api/Oss/RedirectOssResource/${key}`,
    method: 'get'
  })
}
