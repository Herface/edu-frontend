import request from '@/utils/request'

const BASE_URL = "http://localhost/api";

export default  {
  getRoleList(){
    return request({
      url: "/acl/admin/role",
      method: "get",
      baseURL: BASE_URL,
    });
  },
  getRoleListByUserId(userId){
    return request({
      url: `/acl/admin/role/user/${userId}`,
      method: "get",
      baseURL: BASE_URL,
    });
  },
  assignRoleForUser(userId,roleIds){

    return request({
      url: `/acl/admin/role/user/${userId}`,
      method: "post",
      baseURL: BASE_URL,
      data: roleIds
    });
  },

  getRoleById(id){
    return request({
      url: "/acl/admin/role/"+id,
      method: "get",
      baseURL: BASE_URL,
    });
  },

  addRole(role){
    return request({
      baseURL: BASE_URL,
      url: "/acl/admin/role",
      method: "post",
      data: role,
    })
  },

  updateRoleById(id,role){
    return request({
      baseURL: BASE_URL,
      url: "/acl/admin/role/"+id,
      method: "put",
      data: role,
    })
  },

  
  deleteRoleById(id){
    return request({
      baseURL: BASE_URL,
      url: "/acl/admin/role/"+id,
      method: "delete",
    })
  },


}