<template>
  <div style="margin-top: 30px" v-loading="loading">
      <el-row>
<el-col :span="6" v-for="(seckill, index) in seckillList" :key="index" :offset="index % 3 > 0 ? 2 : 1">
    <el-card :body-style="{ padding: '0px' }">
      <img style="width: 100%;height: 200px" :src="seckill.cover">
      <div style="padding: 14px;">
        <span>{{seckill.title}}</span>
        <div class="bottom clearfix">
           <div>
          <del>￥{{seckill.oldPrice}}</del>
          <span style="color: red;font-size: 20pt;font-weight: bolder">￥{{seckill.newPrice}}</span>
           </div>
           <p>剩余：<span style="color: red;font-size: 15pt;">{{seckill.stock}}</span></p>
           <div>
            <time style="padding-right: 15px">{{seckill.startTime}}开始</time>
            <el-button type="danger" class="button" @click="doSeckill(seckill)">立即秒杀</el-button>
           </div>
        </div>
      </div>
    </el-card>
  </el-col>
      </el-row>
                <section class="no-data-wrap" v-if="seckillList.length === 0">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>

  </div>
</template>

<script>
import seckillApi from '~/api/seckill';
export default {
    layout: "index",

    created(){
     this.listSeckills();
    },
    data(){
        return {
            seckillList: [],
            loading: false,   
        }
    },

    methods: {
        listSeckills(){
               seckillApi.listSeckills().then(res=>{
                this.seckillList = res.data.seckillList;
        });
        },
        doSeckill(seckill){
            let userInfo = this.$store.getters['user/userInfo'];
            if (!userInfo){
                this.$router.push({path: '/login?redirect=/seckill'})
                return;
            } 
            if (new Date(seckill.startTime).getTime() > Date.now()) {
                this.$message.error("秒杀还未开始");
                return;
            }
            this.loading = true;
            seckillApi.doSeckill(seckill.seckillId).then(res=>{
                this.$message.success("秒杀成功 可以到个人中心查看");
                this.loading = false;
            }).catch(err=>{
                this.loading = false;
            });
        }
    }

}
</script>

<style>

</style>