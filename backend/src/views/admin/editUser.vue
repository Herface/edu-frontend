<template>
  <el-row>
    <el-col :span="18" :offset="3">
        <el-form ref="form" :model="user" :rules="rules" label-width="80px">
            <el-form-item label="昵称">
              <el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
          </el-form-item>
          <el-form-item label="用户名">
              <el-input v-model="user.username" placeholder="请输入用户名"></el-input>
          </el-form-item>
         <el-form-item label="密码">
              <el-input v-model="user.password" placeholder="请输入用户名"></el-input>
          </el-form-item>
         <el-form-item >
              <el-button type="primary" @click="saveOrUpdate()">保存</el-button>
          </el-form-item>
        </el-form>
    </el-col>
  </el-row>
</template>

<script>
import userApi from '@/api/user';
import { valid } from 'mockjs';
export default {

    created(){
        if (this.editMode) {
            userApi.getUserById(this.editMode).then(res=>{
                this.user = res.data.user;
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
            user: {
                username: "",
                password: "",
                nickname: "",
            },
            rules: {
          nickname: [
            {validator: notBlank("昵称不能为空"), trigger: 'blur'}
          ],
          username: [
            { validator: notBlank("用户名不能为空"), trigger: 'blur' }
          ],
          password: [
            { validator: notBlank("密码不能为空"), trigger: 'blur' }
          ]
        }
        }
    },
    methods: {
        saveOrUpdate(){

            this.$refs.form.validate(valid=>{
                if (valid) {
                     if (this.editMode) {
                         userApi.updateUserById(this.editMode,this.user).then(res=>{
                             this.$message.success("保存成功");
                             this.$router.back();
                         });
                    }else {
                         userApi.addUser(this.user).then(res=>{
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