import request from '@/utils/request'
// const BASE_URL = "http://192.168.1.3:2333/acl/admin";
const BASE_URL = "http://localhost/api";
export function login(data) {
  return request({
    url: '/acl/login',
    method: 'post',
    data,
    baseURL: BASE_URL
  })
}



export function getInfo(token) {
  return request({
    url: '/acl/user/info/token/'+token,
    method: 'get',
    // params: { token },
    baseURL: BASE_URL,
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}

export default {
    addUser(user){
      return request({
        baseURL: BASE_URL,
        url: "/acl/admin/user",
        method: "post",
        data: user,
      })
    },

    updateUserById(id,user){
      return request({
        baseURL: BASE_URL,
        url: "/acl/admin/user/"+id,
        method: "put",
        data: user,
      })
    },

    
    deleteUserById(id){
      return request({
        baseURL: BASE_URL,
        url: "/acl/admin/user/"+id,
        method: "delete",
      })
    },
    getUserList(){
      return request({
        baseURL: BASE_URL,
        url: "/acl/admin/user",
        method: "get",
      })
    },
    getUserById(id){
      return request({
        baseURL: BASE_URL,
        url: "/acl/admin/user/"+id,
        method: "get",
      })
    },
}
