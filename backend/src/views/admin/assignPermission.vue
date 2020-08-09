<template>
  <el-row type="flex" justify="center">
    <el-col :span="18">
          <el-transfer
           v-model="assigned" 
           :data="unassigned" 
           :props="{key: 'id',label:'name'}"
             :titles="['未授权', '已授权']"
           >

          </el-transfer>
          <el-button type="primary" @click="savePermission()">保存</el-button>
          <el-button type="default" @click="$router.back()">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import permissionApi from '@/api/permission';
export default {
    created(){
        this.getPermissionForRole();
    },
    data(){
        return {
            unassigned: [],
            assigned: [],
            roleId: "",
        }
    },
    methods: {
        savePermission(){
            permissionApi.assignPermissionForRole(this.roleId,this.assigned).then(res=>{
                this.$message.success("保存成功");
                this.$router.back();
            });
        },
        getPermissionForRole(){
            let { id } = this.$route.params;
            this.roleId = id;
            permissionApi.getPermissionListByRoleId(id).then(res=>{
                let {assigned, unassigned } = res.data;
                console.log(assigned);
                this.unassigned = unassigned;
                this.assigned = assigned.map(item=>item.id);
                console.log(this.assigned);
            });
        }
    }

}
</script>

<style>

</style>