<template>
<div>
  <h1 v-if="!order">Loading....</h1>
  <div v-else class="Page Confirm" v-loading="loading">
    <div class="Title">
      <h1 class="fl f18">订单确认</h1>
      <img src="~/assets/img/cart_setp2.png" class="fr">
      <div class="clear"></div>
    </div>
    <form name="flowForm" id="flowForm" method="post" action="">
      <table class="GoodList">
        <tbody>
        <tr>
          <th class="name">商品</th>
          <th class="price">原价</th>
          <th class="priceNew">价格</th>
        </tr>
        </tbody>
        <tbody>
        <!-- <tr>
          <td colspan="3" class="Title red f18 fb"><p>限时折扣</p></td>
        </tr> -->
        <tr>
          <td colspan="3" class="teacher">讲师：{{order.teacherName}}</td>
        </tr>
        <tr class="good">
          <td class="name First">
            <a target="_blank" :href="'https://localhost:3000/course/'+order.courseId">
              <img :src="order.courseCover"></a>
            <div class="goodInfo">
              <input type="hidden" class="ids ids_14502" value="14502">
              <a target="_blank" :href="'https://localhost:3000/course/'+ order.courseId">{{order.courseTitle}}</a>
            </div>
          </td>
          <td class="price">
            <p>￥<strong>{{order.totalFee}}</strong></p>
            <!-- <span class="discName red">限时8折</span> -->
          </td>
          <td class="red priceNew Last">￥<strong>{{order.totalFee}}</strong></td>
        </tr>
        <tr>
          <td class="Billing tr" colspan="3">
            <div class="tr">
              <p>共 <strong class="red">1</strong> 件商品，合计<span
                class="red f20">￥<strong>{{order.totalFee}}</strong></span></p>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="Finish">
        <div class="fr" id="AgreeDiv">
          
          <label for="Agree"><p class="on"><input type="checkbox" checked="checked">我已阅读并同意<a href="javascript:;">《xxx协议》</a></p></label>
        </div>
        <div class="clear"></div>
        <div class="Main fl">
          <div class="fl">
            <a :href="'/course/'+order.courseId">返回课程详情页</a>
          </div>
          <div class="fr">
            <p>共 <strong class="red">1</strong> 件商品，合计<span class="red f20">￥<strong
              id="AllPrice">{{order.totalFee}}</strong></span></p>
          </div>
        </div>
        <input name="score" value="0" type="hidden" id="usedScore">
        <button v-if="order.status === 0" class="fr redb" type="button" id="submitPay" @click="getQrCodeByOrderId">去支付</button>
        <button v-else class="fr redb" type="button" id="submitPay" style="background: green">已支付</button>
        <div class="clear"></div>
      </div>
    </form>
  </div>
  <el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <el-row>
    <el-col :span="10" :offset="7">
      打开微信扫描二维码完成支付
      <qriously :value="url" :size="200"></qriously>
    </el-col>
  </el-row>
  
</el-dialog>
  </div>
</template>

<script>
import orderApi from '~/api/order';
export default {
  layout: "index",

  components: {
  },

    created(){
        this.getOrderById();
    },
    data(){
        return {
            order: undefined,
            orderId: "",
            url: "",
            dialogVisible: false,
            loading: false,
			id: null,
        }
    },
    methods: {
        getOrderById(){
            let { id } = this.$route.params;
            this.orderId = id;
            orderApi.getOrderById(id).then(res=>{
                this.order = res.data.order;
                // console.log(order);
            });
        },
        getQrCodeByOrderId(){
          this.loading = true;
          orderApi.getQRCodeByOrderId(this.order.id).then(res=>{
            this.url = res.data.url;
            this.dialogVisible = true;
             this.id = setInterval(()=>{
               orderApi.getOrderStatusByOrderNo(this.order.orderNo).then(res=>{
                 if (res.data.success === 1) {
                   clearInterval(this.id);
                   
                   this.$message.success("支付成功");
                   this.order.status = 1;
                   this.dialogVisible = false;
                   this.$router.push({path: `/video/${this.order.courseId}`});
                 }
               })
              //  .catch(err =>{
              //    this.$message.error("订单异常！");
              //    this.dialogVisible = false;
              //  });
            }, 3000);
          })
        },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
		  this.loading = false;
		  clearInterval(this.id);
		  this.$message.error("取消支付");
            done();
          })
          .catch(_ => {});
      },



    }


}
</script>

<style>

</style>