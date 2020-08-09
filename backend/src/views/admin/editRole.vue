<template>
  <el-row>
    <el-col :span="18" :offset="3">
        <el-form ref="form" :model="role" :rules="rules" label-width="80px">
            <el-form-item label="名称">
              <el-input v-model="role.roleName" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="备注">
              <el-input v-model="role.remark" placeholder="请输入备注"></el-input>
          </el-form-item>
         <el-form-item >
              <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
              <el-button type="default" @click="$router.back()">返回</el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script>

import roleApi from '@/api/role';
export default {

    created(){
        if (this.editMode) {
            roleApi.getRoleById(this.editMode).then(res=>{
                this.role = res.data.role;
            });
        } 
    },

    data(){
         var notBlank = (msg) => {
             return function(rule, value, cb) {
                  if (value.trim().length > 0) {
                       cb();
                    }
                    cb(new Error(msg));
             }
         };
        return {
            role: {
                roleName: "",
                remark: "",
            },
            rules: {
          roleName: [
            {validator: notBlank("角色名称不能为空"), trigger: 'blur'}
          ],
          remark: [
            { validator: notBlank("备注不能为空"), trigger: 'blur' }
          ]
        }
        }
    },
    methods: {
        saveOrUpdate(){

            this.$refs.form.validate(valid=>{
                if (valid) {
                     if (this.editMode) {
                         roleApi.updateRoleById(this.editMode,this.role).then(res=>{
                             this.$message.success("保存成功");
                             this.$router.back();
                         });
                    }else {
                         roleApi.addRole(this.role).then(res=>{
                             this.$message.success("保存成功");
                              this.$router.back();
                         });
                    }

                }
            })
           
        }
    },
    computed: {
        editMode(){
            return this.$route.params.id;
        }
    }
}
</script>

<style>

</style>