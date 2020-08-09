<template>


  <el-row>
    <!-- <script src="https://www.recaptcha.net/recaptcha/api.js" async defer></script>
    	<script>
	  </script> -->
    <el-col :span="10" :offset="7">
      <el-form ref="userForm" :model="member" label-width="80px">
        <el-form-item label="昵称" prop="nickname"  :rules="[{ required: true, message: '请输入你的昵称', trigger: 'blur' }]">
            <el-input type="text" suffix-icon="el-icon-user" placeholder="请输入昵称" v-model="member.nickname"/>
        </el-form-item>

        <el-form-item label="号码" prop="mobile" :rules="[{ required: true, message: '请输入手机号码', trigger: 'blur' },{validator: checkPhone, trigger: 'blur'}]">
          
            <el-input suffix-icon="el-icon-phone" type="text" placeholder="请输入手机号码" v-model="member.mobile"/>
        </el-form-item>

        <el-form-item  label="验证码" prop="code" :rules="[{ required: true, message: '请输入验证码', trigger: 'blur' }]">
            <el-input type="text" placeholder="验证码" v-model="member.code">
                 <el-button slot="append"  @click="getCode">{{codeTest}}</el-button>
            </el-input>
        </el-form-item>

        <el-form-item label="密码" class="input-prepend" prop="password" :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
            
            <el-input suffix-icon="el-icon-lock" type="password" placeholder="请输入密码" v-model="member.password"/>
          
        </el-form-item>
        <!-- <el-form-item label="人机验证">
          <div class="g-recaptcha" data-sitekey="6LdEobgZAAAAADKa4nDJ-gXBR5PFODj1izf68pev" data-callback="onSuccess"></div>
        </el-form-item> -->
        <el-form-item>
            <el-button type="primary"  @click="register">注册</el-button>
        </el-form-item>
        <p class="sign-up-msg">
          点击 “注册” 即表示您同意并愿意遵守协议
          <br>
          <a target="_blank" href="javascript:;">用户协议</a>
          和
          <a target="_blank" href="javascript:;">隐私政策</a> 。
        </p>
      </el-form>
      <!-- 更多注册方式 -->
      <!-- <div class="more-sign">
        <h6>社交帐号直接注册</h6>
        <ul>
          <li><a id="weixin" class="weixin" target="_blank" href="http://huaan.free.idcfengye.com/api/ucenter/wx/login"><i
            class="iconfont icon-weixin"/></a></li>
          <li><a id="qq" class="qq" target="_blank" href="#"><i class="iconfont icon-qq"/></a></li>
        </ul>
      </div> -->
    </el-col>
  </el-row>
 

 

</template>

<script>

// import 'https://www.recaptcha.net/recaptcha/api.js" async defer'
  import memberApi from '~/api/member';

  export default {
    layout: 'index',
    data() {
      return {
        member: { //封装注册输入数据
          mobile: '',
          code: '',  //验证码
          nickname: '',
          password: ''
        },
        sending: true,      //是否发送验证码
        second: 60,        //倒计时间
        codeTest: '获取验证码'
      }
    },
    methods: {
        getCode(){
          this.$refs.userForm.validateField("mobile",(valid)=>{
            console.log(this.sending);
              if (!valid ){
                if (this.sending) {
                 this.sending = false;
                memberApi.getCode(this.member.mobile).then(res=>{
                    this.countDown();
                });
                }
         
            }

          })
     
        },
         onSuccess(token){
          console.log(token);
        },


        register(){
            this.$refs.userForm.validate((valid)=>{
                if (valid) {
                    memberApi.register(this.member).then(res=>{
                        this.$message.success("注册成功！");
                        this.$router.push({path: "/login"});
                    });
                } else {
                    this.$message.error("请检查是否填写正确");
                }
            });

        },

        countDown(){
            let time = setInterval(()=>{
                this.second--;
                if (this.second === 0) {
                    clearInterval(time);
                    this.sending = true;
                    this.codeTest = "获取验证码";
                    this.second = 60;
                } else {
                    this.codeTest = `${this.second}秒后重新获取`;
                }
            },1000);
        },
        checkPhone(rule, value, callback){
             let reg = /^1[356789]\d{9}$/;
             if (reg.test(value)) {
                 return callback();
             } else {
                 this.sending = false;
                 return callback(new Error("号码格式不正确"));
             }

        },

    }
  }
</script>
