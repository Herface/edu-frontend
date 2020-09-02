import request from '@/utils/request'


export default  {
  getRoleList(){
    return request({
      url: "/acl/admin/role",
      method: "get",
    });
  },
  getRoleListByUserId(userId){
    return request({
      url: `/acl/admin/role/user/${userId}`,
      method: "get",
    });
  },
  assignRoleForUser(userId,roleIds){

    return request({
      url: `/acl/admin/role/user/${userId}`,
      method: "post",
      data: roleIds
    });
  },

  getRoleById(id){
    return request({
      url: "/acl/admin/role/"+id,
      method: "get",
    });
  },

  addRole(role){
    return request({
      url: "/acl/admin/role",
      method: "post",
      data: role,
    })
  },

  updateRoleById(id,role){
    return request({
      url: "/acl/admin/role/"+id,
      method: "put",
      data: role,
    })
  },

  
  deleteRoleById(id){
    return request({
      url: "/acl/admin/role/"+id,
      method: "delete",
    })
  },


}