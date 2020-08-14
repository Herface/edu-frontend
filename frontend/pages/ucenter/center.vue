<template>
   <el-row style="height:100vh">
       <el-col :span="20" :offset="2" >
            <el-tabs v-model="activeName" type="border-card">
    <el-tab-pane label="我的订单" name="1"  >

          <el-tabs tab-position="left">
            <el-tab-pane label="已支付">
                        <el-row :gutter="50">
            <el-col :span="6" v-for="order in paid" :key="order.id" style="padding-top: 15px">
                 <el-card :body-style="{ padding: '0px' }">
                <img style="width:100%;height: 200px" :src="order.courseCover" class="image">
                <div style="padding: 14px;">
                    <span>{{order.courseTitle}}</span>
                    <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="toStudy(order.courseId)">立即学习</el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col>
                <h3 v-if="paid.length === 0">您还没有购买任何课程
                <el-link type="primary" @click="$router.push('/course')">先去逛逛</el-link></h3>
            </el-col>    
    </el-row>
            </el-tab-pane>
            <el-tab-pane label="未支付">
            <el-row :gutter="50">
            <el-col :span="6" v-for="order in unpaid" :key="order.id" style="padding-top: 15px">
                 <el-card :body-style="{ padding: '0px' }">
                <img style="width:100%;height: 200px" :src="order.courseCover" class="image">
                <div style="padding: 14px;">
                    <span>{{order.courseTitle}}</span>
                    <div class="bottom clearfix">
                    <el-button type="text" class="button" @click="toPay(order.orderNo)">立即支付</el-button>
                    </div>
                </div>
                </el-card>
            </el-col>
            <el-col>
                <h3 v-if="unpaid.length === 0">暂无数据</h3>
            </el-col>    
    </el-row>
            </el-tab-pane>
        </el-tabs>


    </el-tab-pane>
    <el-tab-pane label="我的" name="3">

    <el-tabs tab-position="left" >
        <el-tab-pane label="个人信息">
            <el-form :model="userInfo" label-width="80px">
              <el-form-item label="头像">
                    <el-avatar size="large" :src="userInfo.avatar"></el-avatar>
                    <el-upload
                    :on-success="onSuccess"
                    class="upload-demo"
                    :action="uoloadAvatarUrl">
  <el-button size="small" type="primary">点击上传</el-button>
</el-upload>
              </el-form-item>
            <el-form-item label="昵称">
                    <el-input v-model="userInfo.nickname"></el-input>
              </el-form-item>
              <el-form-item label="签名">
                  <el-input type="textarea" v-model="userInfo.sign" placeholder=""></el-input>
              </el-form-item>
              <el-form-item label="年龄">
                  <el-input-number v-model="userInfo.age" :min="1" placeholder=""></el-input-number>
              </el-form-item>
              <el-form-item label="">
                  <el-button type="primary" @click="updateUserInfo">保存</el-button>
              </el-form-item>
            </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码">
            <el-form label-width="80px">
              <el-form-item label="原始密码">
                  <el-input type="password" v-model="oldPsw" placeholder=""></el-input>
              </el-form-item>
             <el-form-item label="新密码">
                  <el-input type="password" v-model="newPsW" placeholder=""></el-input>
             </el-form-item>
             <el-form-item >
                 <el-button type="primary" @click="updatePsw()">保存</el-button>
             </el-form-item>
            </el-form>
        </el-tab-pane>
    </el-tabs>
    </el-tab-pane>
  </el-tabs>
       </el-col>
   </el-row>
</template>

<script>
import orderApi from '~/api/order';
import memberApi from '~/api/member';
export default {
    layout: "index",
    created(){
        let userInfo = this.$store.getters['user/userInfo'];
        if (!userInfo){
            this.$router.push({path: '/login?redirect=/ucenter/center'})
            return;
        } 
        this.getOrderList();
    },
    data(){
        let userInfo = this.$store.getters['user/userInfo'];
        let copy = {};
        Object.assign(copy,userInfo);
        return {
            activeName: "1",
            userInfo: copy,
            oldPsw: "",
            newPsW: "",
            orderList: [],
            uoloadAvatarUrl: "http://112.124.19.91/api/oss/oss/image",
            paid: [],
            unpaid: []
        }
    },
    methods: {
        getOrderList(){
            let userInfo = this.$store.getters['user/userInfo'];
            console.log(userInfo);
            orderApi.getOrderListByUserId(userInfo.id).then(res=>{
                this.orderList = res.data.orderList;
                this.paid = this.orderList.filter(o=>o.status === 1);
                this.unpaid = this.orderList.filter(o=>o.status === 0);
            })

        },

        updateUserInfo(){
            memberApi.updateUserInfo(this.userInfo).then(res=>{
               this.$store.commit("user/setUser",this.userInfo);
               this.$message.success("保存成功");
            })
        },
        updatePsw(){
            let o = this.oldPsw,n = this.newPsW;
            memberApi.updatePsw(this.userInfo.id,{oldPsw:o,newPsw: n}).then(res=>{
               this.$message.success("保存成功");
            })
        },
        onSuccess(res){
            this.userInfo.avatar = res.data.url;
        },
        toStudy(coureId){
            this.$router.push({path: `/course/${coureId}`});
        },
        toPay(orderNo){
            this.$router.push(`/order/${orderNo}`)
        }
    }

}
</script>

<style>

</style>