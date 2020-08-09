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
        <el-form ref="form" :model="teacher" label-width="80px">
<el-form-item label="头像">

  <image-cropper field="file" :value="showImageCropper" 
              :url="uoloadAvatarUrl" 
              :width="300"
              :height="300"
              :noRotate="false"
              :withCredentials="true"
              @close="showImageCropper=false"
              @crop-upload-success="successUpload"
              >
  </image-cropper>
  <pan-thumb :image="teacher.avatar"></pan-thumb>
  <el-button type="primary" class="el-icon-plus avatar-uploader-icon" @click="showImageCropper=true">点我上传</el-button>

</el-form-item>


  <el-form-item label="姓名">
    <el-input v-model="teacher.name"></el-input>
  </el-form-item>

  <el-form-item label="头衔">
    <el-select v-model="teacher.level" placeholder="请选择头衔">
      <el-option label="高级讲师" value="1"></el-option>
      <el-option label="首席讲师" value="2"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="排序">
      <el-input-number v-model="teacher.sort"  :min="1" :max="2"  label="描述文字"></el-input-number>
  </el-form-item>

  <el-form-item label="资历">
    <el-input v-model="teacher.career"></el-input>
  </el-form-item>

  <el-form-item label="简介">
    <el-input type="textarea" v-model="teacher.intro"></el-input>
  </el-form-item>
  
  <el-form-item>
    <el-button type="primary" @click="saveOrUpdate">保存</el-button>
  </el-form-item>
</el-form>
     </el-col>
   </el-row>
</template>

<script>
import api from '@/api/teacher';
import ImageCropper from "@/components/ImageCropper";
import PanThumb from '@/components/PanThumb';
export default {
  name: "TeacherAdd",
  components: {
    ImageCropper,
    PanThumb,

  },
  data(){
    return {
      teacher: {
        name: "",
        level: 1,
        sort: 0,
        career: "",
        intro: "",
        avatar: "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3359668377,2739778631&fm=26&gp=0.jpg",
      },
      showImageCropper: false,
      uoloadAvatarUrl: process.env.VUE_APP_BASE_API+"/oss/oss/image",
      
    }
  },
  methods: {
      saveOrUpdate(){
         
          if(this.isEditMode){
              api.update(this.teacher).then(res=>{
                 this.$message.success("修改成功");
              this.$router.push({path: "/teacher/list"});
              });
          }else{
            api.add(this.teacher).then(res=>{
              this.$message.success("添加成功");
              this.$router.push({path: "/teacher/list"});
            });
          }

      },
      getTeacherById(id){
        api.getById(id).then(res=>{
          let {teacher} = res.data;
          this.teacher = teacher;
        });
        
      },

      successUpload(res){
        this.teacher.avatar = res.url;
      },

      showImage(response,file,fileList){
        // console.log(response);
        this.teacher.avatar = response.data.url;
      },
         beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg' || 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG，JPEG,PNG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
  },

 beforeRouteUpdate (to, from, next) {
    console.log(to);
   
  },
    beforeRouteEnter (to, from, next) {
     console.log(to);
     next(vm=>{
       if(to.params && to.params.id){
         let {id} = to.params;
        vm.getTeacherById(id);
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
      }
  },

}
</script>

<style>

</style>