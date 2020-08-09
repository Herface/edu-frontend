import request from '@/utils/request'


export default  {
  // getRoleList(){
  //   return request({
  //     url: "/role",
  //     method: "get",
  //     baseURL: BASE_URL,
  //   });
  // },
  getPermissionListByRoleId(roleId){
    return request({
      url: `/acl/admin/permission/role/${roleId}`,
      method: "get",
    });
  },
  assignPermissionForRole(roleId,permissionIds){
    return request({
      url: `/acl/admin/permission/role/${roleId}`,
      method: "post",
      data: permissionIds
    });
  }



}