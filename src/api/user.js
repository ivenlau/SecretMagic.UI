import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/login/login',
    method: 'post',
    data
  })
}

export function getAllUsers() {
  return request({
    url: '/api/User/AllUsers',
    method: 'get'
  })
}

export function addUser(user) {
  return request({
    url: '/api/User/NewUser',
    method: 'post',
    data: user
  })
}

export function updateUser(user) {
  return request({
    url: `/api/User/UpdateUser`,
    method: 'put',
    data: user
  })
}

export function deleteUser(id) {
  return request({
    url: `/api/User/RemoveUser/${id}`,
    method: 'delete'
  })
}
