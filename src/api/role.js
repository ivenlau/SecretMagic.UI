import request from '@/utils/request'

export function getAllRoles() {
  return request({
    url: '/api/Role/AllRoles',
    method: 'get'
  })
}

export function getAllResources() {
  return request({
    url: '/api/Role/AllResources',
    method: 'get'
  })
}

export function addRole(role) {
  return request({
    url: '/api/Role/NewRole',
    method: 'post',
    data: role
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/Role/RemoveRole/${id}`,
    method: 'delete'
  })
}

export function addPermission(permission) {
  return request({
    url: '/api/Role/NewPermission',
    method: 'post',
    data: permission
  })
}

export function deletePermission(permission) {
  return request({
    url: `/api/Role/RemovePermission`,
    method: 'delete',
    data: permission
  })
}
