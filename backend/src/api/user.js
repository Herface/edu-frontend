import request from '@/utils/request'
export function login(data) {
  return request({
    url: '/acl/login',
    method: 'post',
    data,
  })
}



export function getInfo(token) {
  return request({
    url: '/acl/user/info/token/'+token,
    method: 'get',
    // params: { token },
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
        url: "/acl/admin/user",
        method: "post",
        data: user,
      })
    },

    updateUserById(id,user){
      return request({
        url: "/acl/admin/user/"+id,
        method: "put",
        data: user,
      })
    },

    
    deleteUserById(id){
      return request({
        url: "/acl/admin/user/"+id,
        method: "delete",
      })
    },
    getUserList(){
      return request({
        url: "/acl/admin/user",
        method: "get",
      })
    },
    getUserById(id){
      return request({
        url: "/acl/admin/user/"+id,
        method: "get",
      })
    },
}
