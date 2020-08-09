<template>
  <el-row type="flex" justify="center">
    <el-col :span="18">
        <el-button type="primary" @click="toAdd()">添加用户</el-button>
        <el-table :data="userList">
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="昵称" prop="username"></el-table-column>
          <el-table-column label="创建日期" prop="gmtCreate"></el-table-column>
           <el-table-column label="操作">
               <template v-slot="scope">
                  <el-button icon="el-icon-edit" size="small" type="primary" @click="toEdit(scope.row.id)" circle>
                  </el-button>
                   <el-button icon="el-icon-date" size="small" type="primary" @click="toAssign(scope.row.id)" circle>
                  </el-button>
                  <el-popconfirm
                    @onConfirm="deleteById(scope.row.id)"
                    title="确定删除吗？"
                    >
                    <el-button icon="el-icon-remove" type="danger" slot="reference" size="small" circle></el-button>
                    </el-popconfirm>
              </template>
            </el-table-column>
        </el-table>
    </el-col>
  </el-row>
</template>

<script>
import userApi from '@/api/user'
export default {
    created(){
        this.getUserList();
    },
    data(){
        return {
            userList: [],
        }
    },
    methods: {
        getUserList(){
            userApi.getUserList().then(res=>{
                this.userList = res.data.userList;
            })
        },

        deleteById(id) {
            userApi.deleteUserById(id).then(res=>{
                this.$message.success("删除成功");
                this.getUserList();
            })
            

        },
          toAssign(id){
            this.$router.push({path: "/admin/user/assign/"+id})
        },
        toAdd(){
            this.$router.push({path: "/admin/user/add"})
        },
        toEdit(id){
            this.$router.push({path: "/admin/user/edit/"+id})
        }
    }
}
</script>

<style>

</style>