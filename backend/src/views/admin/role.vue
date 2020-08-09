<template>
  <el-row type="flex" justify="center">
    <el-col :span="18">
        <el-button type="primary" @click="toAdd()">添加角色</el-button>
        <el-table :data="roleList">
          <el-table-column label="名称" prop="roleName"></el-table-column>
         <el-table-column label="备注" prop="remark"></el-table-column>
         <el-table-column label="创建时间" prop="gmtCreate"></el-table-column>
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
                    <el-button type="danger" icon="el-icon-remove" size="small" slot="reference" circle></el-button>
                    </el-popconfirm>
              </template>
              </el-table-column>
        </el-table>
    </el-col>
  </el-row>
</template>

<script>
import roleApi from '@/api/role';
export default {
    created(){
        this.getRoleList();
    },

    data(){

        return {
            roleList: [

            ]
        }
    },
    methods: {
        deleteById(id) {
            roleApi.deleteRoleById(id).then(res=>{
                this.$message.success("删除成功");
                this.getRoleList();
            })
        },
        getRoleList(){
            roleApi.getRoleList().then(res=>{
                this.roleList = res.data.roleList;
            })
        },
        toAssign(id){
            this.$router.push({path: "/admin/role/assign/"+id})

        },
        toAdd(){
            this.$router.push({path: "/admin/role/add"})
        },
        toEdit(id){
            this.$router.push({path: "/admin/role/edit/"+id})
        }
    }

}
</script>

<style>

</style>