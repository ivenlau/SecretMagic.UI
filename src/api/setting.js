import request from '@/utils/request'

export function getSetting() {
  return request({
    url: '/api/SiteSetting/GetSetting',
    method: 'get'
  })
}

export function updateBasicSetting(setting) {
  return request({
    url: `/api/SiteSetting/UpdateBasicSetting`,
    method: 'post',
    data: setting
  })
}

export function updateUiSetting(setting) {
  return request({
    url: `/api/SiteSetting/UpdateUiSetting`,
    method: 'post',
    data: setting
  })
}
