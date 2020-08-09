<template>


  <el-row style="margin-top:30px">
    <el-col :span="10" :offset="7">
 <el-form ref="userForm" :model="user" label-width="80px">

        <el-form-item label="手机号码" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          
            <el-input suffix-icon="el-icon-phone-outline" type="text" placeholder="手机号" v-model="user.mobile"/>
           
      
        </el-form-item>

        <el-form-item label="密码" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
         
            <el-input suffix-icon="el-icon-lock" type="password" placeholder="密码" v-model="user.password"/>
            
        </el-form-item>
        <el-form-item label="">
          <el-button style="display:block;width: 100%" type="primary" @click="login">登录</el-button>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-button style="display:block;width: 100%" type="success" @click="wxLogin">微信登录</el-button>
        </el-form-item> -->
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
  import cookie from 'js-cookie'
  import memberApi from '~/api/member';
  import {setToken} from '~/utils/auth'
  export default {
    layout: 'index',

    data () {
      return {
        user:{
          mobile:'',
          password:''
        },
        loginInfo:{}
      }
    },

    methods: {

      checkPhone (rule, value, callback) {
        //debugger
        if (!(/^1[34578]\d{9}$/.test(value))) {
          return callback(new Error('手机号码格式不正确'))
        }
        return callback()
      },
      login(){
        this.$refs.userForm.validate((valid)=>{
          if (valid) {
           memberApi.login(this.user).then(res=>{
          // console.log(res);
          // localStorage.setItem("token",res.data.token);
          setToken(res.data.token);
          this.$store.dispatch("user/getUserInfoByToken",res.data.token).then(()=>{
                  let redirect = this.$route.query.redirect;
                  this.$router.push({path: redirect || '/'});
          });
          
        })
          }
        })
      },
      wxLogin(){
        window.location.href = "http://localhost/api/ucenter/api/ucenter/wx/qrlogin";
      }
    }
  }
</script>
<style>
   .el-form-item__error{
    z-index: 9999999;
  }
</style>