<template>
   <el-row style="padding-top:30px">
     <el-col :span="18" :offset="3">
<!--                  
      <el-upload
  style="padding-left:40px"
  class="avatar-uploader"
  :action="process.env.VUE_APP_BASE_API+'/oss/avatar'"
  :show-file-list="false"
  :on-success="showImage"
  :before-upload="beforeAvatarUpload"
  >
  <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar"
  style="width:100px;height:100px;"
  >
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload> -->
        <el-form ref="form" :model="seckill" label-width="80px">
  <el-form-item label="原价">
      <el-input v-model="oldPrice" readonly></el-input>
  </el-form-item>
    <el-form-item label="秒杀价">
      <el-input-number v-model="seckill.newPrice" :min="0"></el-input-number>
  </el-form-item>


    <el-form-item label="课程">
        <el-select v-model="seckill.courseId" filterable placeholder="请选择">
    <el-option
      v-for="course in courseList"
      :key="course.id"
      :label="course.title"
      :value="course.id">
    </el-option>
  </el-select>



    </el-form-item>
        <el-form-item label="名额">
      <el-input-number v-model="seckill.stock" :min="1"></el-input-number>
  </el-form-item>
        <el-form-item label="开始日期">
       <el-date-picker
       value-format="yyyy-MM-dd HH:mm:ss"
      v-model="seckill.startTime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>


  <el-form-item>
    <el-button type="primary" @click="saveOrUpdate">保存</el-button>
  </el-form-item>
</el-form>
     </el-col>
   </el-row>
</template>

<script>
import seckillApi from '@/api/seckill';
import {listCourses} from '@/api/course';
export default {
  name: "SeckillAdd",
  components: {

  },
  data(){
    return {
      seckill: {
        seckillId: "",
        title: 1,
        oldPrice: 0,
        newPrice: 0,
        stock: 0,
        career: "",
        startTime: "",
        courseId: "",
      },
      courseList: [],
      
    }
  },


created(){
    listCourses().then(res=>{
        this.courseList = res.data.courseList;
    });

},

  methods: {
      saveOrUpdate(){
         
          if(this.isEditMode){
              seckillApi.update(this.seckill).then(res=>{
                 this.$message.success("修改成功");
              this.$router.push({path: "/seckill/list"});
              });
          }else{
            seckillApi.add(this.seckill).then(res=>{
              this.$message.success("添加成功");
              this.$router.push({path: "/seckill/list"});
            });
          }
      },
      getSeckillById(id){
        seckillApi.getById(id).then(res=>{
          let {seckill} = res.data;
          this.seckill = seckill;
        });
      },
  },

 beforeRouteUpdate (to, from, next) {
    console.log(to);
   
  },
    beforeRouteEnter (to, from, next) {
     console.log(to);
     next(vm=>{
       if(to.params && to.params.id){
         let {id} = to.params;
        vm.getSeckillById(id);
    }else{
      vm.teacher = {
        name: "",
        level: 1,
        sort: 0,
        career: "",
        intro: "",
        avatar: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3359668377,2739778631&fm=26&gp=0.jpg",
      };
    }
     });
  },
  // watch: {
  //   $route(to,from){
  //     // if (this.$route && this.$route.params.id){
  //     //   let {id} = this.$route.params;

  //     console.log(to);

  //     // }
  //     if(this.isEditMode){
  //       let {id} = this.$route.params;
        
  //     }else{
  //       this.teacher = {};
  //     }


  //   }
  // },
  computed: {
      isEditMode(){
        return this.$route && this.$route.params.id;
      },
          oldPrice(){
      let price = 0;
      this.courseList.forEach(item=>{
        if (item.id === this.seckill.courseId) {
          price = item.price;
        }
      })
      return price;
    }
  },

}
</script>

<style>

</style>