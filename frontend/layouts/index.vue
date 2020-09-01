<template>
<el-container>
  <el-header>
<el-row type="flex" justify="center" align="middle">
  <el-col :span="4">
            <logo style="width:80px;height: 80px"></logo>
  </el-col>
  <el-col :span="10">
    <el-menu background-color="#ffffff00" 	  :default-active="activeIndex" class="el-menu-demo" mode="horizontal"  router >
  <el-menu-item index="/" >首页</el-menu-item>
  <el-menu-item index="/course">课程</el-menu-item>
  <el-menu-item index="/teacher" >名师</el-menu-item>
  <el-menu-item index="/seckill">
    <el-badge value="new" >限时秒杀</el-badge>
  </el-menu-item>
  <el-menu-item index="/ucenter/center">个人中心</el-menu-item>
</el-menu>
  </el-col>
  <el-col :span="4">
     <el-input size="mini" v-model="keyword" placeholder="输入关键字搜索">
             <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
           </el-input>
  </el-col>
  <el-col :span="4">
          
           <ul class="h-r-login">
            <li v-if="$store.getters['user/userInfo']===null" id="no-login">
              <a href="javascript:;" @click="$router.push('/login')" title="登录">
                <span class="vam ml5 el-icon-user">登录</span>
              </a>
              |
              <a href="javascript:;" @click="$router.push('/register')" title="注册" class="">
                <span class="vam ml5 el-icon-magic-stick">注册</span>
              </a>
            </li>
            <li v-else>
            <div  class="mr10 undis" id="is-login-one">
              <a href="#" title="消息" id="headerMsgCountId">
                <em class="icon18 news-icon">&nbsp;</em>
              </a>
              <q class="red-point" style="display: none">&nbsp;</q>
            </div>
              <a href="#" title>
                <img
                  :src="$store.getters['user/userInfo'].avatar"
                  width="30"
                  height="30"
                  style="border-radius: 50%"
                  class="vam picImg"
                  alt
                >
                <span class="vam disIb" id="userName">{{$store.getters["user/userInfo"].nickname}}</span>
              </a>
              <a href="javascript:;" title="退出" @click="logout">退出</a>
            </li>
            <!-- /未登录显示第1 li；登录后显示第2，3 li -->
          </ul>
  </el-col>
</el-row>
</el-header>
<el-main>
  <nuxt></nuxt>
</el-main>
<el-footer>


</el-footer>


</el-container>



    
</template>
<script>
import '~/assets/css/reset.css'
import '~/assets/css/theme.css'
import '~/assets/css/global.css'
import '~/assets/css/web.css'
import '~/assets/css/base.css'
import '~/assets/css/activity_tab.css'
import '~/assets/css/bottom_rec.css'
import '~/assets/css/nice_select.css'
import '~/assets/css/order.css'
import '~/assets/css/swiper-3.3.1.min.css'
import "~/assets/css/pages-weixinpay.css"
import Logo from '~/components/Logo';
import {removeToken,getToken} from '~/utils/auth';
export default {
  data(){
    return {
      activeIndex: "/",
      keyword: "",
    }
  },
    created(){
      this.getUserInfoByToken();
    },
    components: {
        Logo,
    },
    methods: {
      logout(){
        this.$store.dispatch("user/logout");
        removeToken();
        this.$router.replace("/");
      },
      getUserInfoByToken(){
        let  token  = getToken() || this.$route.query.token;// || window.localStorage.getItem("token");
        if (token) {
            this.$store.dispatch("user/getUserInfoByToken",token);
        } 
      },
      search(){
        if (this.keyword.trim().length > 0) {
          this.$router.push(`/search?keyword=${this.keyword}`)
        }
      }
    }
}
</script>

<style>

</style>