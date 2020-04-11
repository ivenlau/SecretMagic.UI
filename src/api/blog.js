import request from '@/utils/request'

export function getAllBlogs() {
  return request({
    url: '/api/Blog/AllBlogs',
    method: 'get'
  })
}

export function getCount() {
  return request({
    url: '/api/Blog/GetCount',
    method: 'get'
  })
}

export function getBlogs(params) {
  return request({
    url: '/api/Blog/GetBlogs',
    method: 'get',
    params: params
  })
}

export function getDetailBlogs(params) {
  return request({
    url: '/api/Blog/GetDetailBlogs',
    method: 'get',
    params: params
  })
}

export function getBlogsByCategoryId(id) {
  return request({
    url: `/api/Blog/CategoryBlogs/${id}`,
    method: 'get'
  })
}

export function addBlog(blog) {
  return request({
    url: '/api/Blog/NewBlog',
    method: 'post',
    data: blog
  })
}

export function updateBlog(blog) {
  return request({
    url: `/api/Blog/UpdateBlog`,
    method: 'put',
    data: blog
  })
}

export function deleteBlog(id) {
  return request({
    url: `/api/Blog/RemoveBlog/${id}`,
    method: 'delete'
  })
}

export function getAllCatetories() {
  return request({
    url: '/api/Blog/AllCategories',
    method: 'get'
  })
}

export function addCategory(category) {
  return request({
    url: '/api/Blog/NewCategory',
    method: 'post',
    data: category
  })
}

export function deleteCategory(id) {
  return request({
    url: `/api/Blog/RemoveCategory/${id}`,
    method: 'delete'
  })
}

export function getBlog(id) {
  return request({
    url: `/api/Blog/BlogDetail/${id}`,
    method: 'get'
  })
}
