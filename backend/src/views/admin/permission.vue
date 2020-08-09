<template>
  <el-row type="flex" justify="center">
    <el-col :span="18">
          <el-transfer v-model="assigned" :data="unassigned" :props="{key: 'id',label:'roleName'}"></el-transfer>
          <el-button type="primary" @click="save()">保存</el-button>
          <el-button type="default" @click="$router.back()">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import roleApi from '@/api/role';
export default {
    data(){
        return {
            unassigned: [],
            assigned: [],
            userId: "",
        }
    },
    methods: {
        saveRole(){
            roleApi.assignRoleForUser(this.userId,this.assigned).then(res=>{
                this.$message.success("保存成功");
                this.$router.back();
            });
        },
        getRoleForId(){
            let { userId } = this.$route.params;
            this.userId = userId;
            roleApi.getRoleListByUserId(userId).then(res=>{
                let {assigned, unassigned } = res.data;
                this.unassigned = unassigned;
                this.assigned = assigned;
            });
        }
    }

}
</script>

<style>

</style>