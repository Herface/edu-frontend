<template>
  <el-row>
    <el-col :span="18" :offset="3">

        <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
            <el-step title="课程信息"></el-step>
            <el-step title="课程大纲"></el-step>
            <el-step title="发布课程"></el-step>
        </el-steps>

        <el-form ref="form" :model="courseInfo" label-width="80px">
          <el-form-item label="课程名称">
          <el-input v-model="courseInfo.title"></el-input>
        </el-form-item>
        
        <el-form-item label="任课教师">
             <el-select v-model="courseInfo.teacherId" placeholder="请选择">
                <el-option
                  v-for="teacher in teacherList"
                  :key="teacher.id"
                  :label="teacher.name"
                  :value="teacher.id">
                </el-option>
              </el-select>
        </el-form-item>

        <el-form-item label="课程分类">
            <el-cascader
               
                v-model="selectedSubject"
                :options="subjectList"
                :props="props"
               ></el-cascader>
        </el-form-item>

        <el-form-item label="总课时">

          <el-input-number v-model="courseInfo.lessonNum"  :min="1" ></el-input-number>

        </el-form-item>

        <el-form-item label="价格">

            <el-input-number v-model="courseInfo.price" :min="0" ></el-input-number>

        </el-form-item>
        <el-form-item label="课程封面">
          <el-upload
                :headers="header"
                class="avatar-uploader"
                :action="uploadCoverUrl"
                :show-file-list="false"
                :on-success="handleCoverSuccess"
                :before-upload="beforeCoverUpload">
                <img  :src="courseInfo.cover" class="avatar">
              </el-upload>
        </el-form-item>


  <el-form-item label="课程简介">
    <Tinymce ref="editor" v-model="courseInfo.description" :height="400" />
    <!-- <el-input type="textarea" v-model="courseInfo.description"></el-input> -->
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="saveOrUpdate">下一步</el-button>
  </el-form-item>
</el-form>
    </el-col>
  </el-row>
</template>

<script>
import teacherApi from '@/api/teacher';
import { getSubjectList } from '@/api/subject';
import { saveCourseInfo, updateCourseInfo, getCourseInfoById  } from '@/api/course';
import Tinymce from '@/components/Tinymce';
import { getToken  } from '@/utils/auth'
export default {
  components: {
      Tinymce,
  },
    data(){
        return {
            header: {
              token: getToken(),
            },
            active: 1,
            courseInfo: {
                teacherId: undefined,
                subjectId: undefined,
                subjectParentId: undefined,
                title: "",
                price: 0,
                lessonNum: 0,
                cover: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2231422927,423310920&fm=26&gp=0.jpg",
                description: "",
            },
            teacherList: [],
            subjectList: [],
            selectedSubject: [],
            props: {
              label: "title",
              value: "id"
            },
             uploadCoverUrl: process.env.VUE_APP_BASE_API+"/thirdparty/oss/image",

        }
    },
    created(){
      this.getTeacherList();
      this.getSubjectList();

    },
  beforeRouteEnter (to, from, next) {
     next(vm=>{
       if(to.params && to.params.id){
         let {id} = to.params;
        vm.getCourseById(id);
    }else{
      vm.courseInfo = {
                teacherId: undefined,
                subjectId: undefined,
                subjectParentId: undefined,
                title: "",
                price: 0,
                lessonNum: 0,
                cover: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2231422927,423310920&fm=26&gp=0.jpg",
                description: "",
            };
      vm.selectedSubject = [];
    }
     });
  },
    methods:{
        saveOrUpdate(){
          this.courseInfo.subjectParentId = this.selectedSubject[0];
          this.courseInfo.subjectId = this.selectedSubject[1];
          if(this.isEditMode){
            updateCourseInfo(this.courseInfo).then(res=>{
              this.$message.success("保存成功");
               this.$router.push({path: `/course/chapter/${this.courseInfo.id}`});
            });
          }else{
            saveCourseInfo(this.courseInfo).then(res=>{
               this.$message.success("保存成功");
               this.$router.push({path: `/course/chapter/${res.data.id}`});
            });
          }
           
        },

        getCourseById(id){
          getCourseInfoById(id).then(res=>{
             this.courseInfo = res.data.courseInfo;
             this.selectedSubject = [this.courseInfo.subjectParentId,this.courseInfo.subjectId];
             console.log(this.selectedSubject);
          });

        },

        getTeacherList(){
          teacherApi.getAllList().then(response=>{
              this.teacherList = response.data.teacherList;
          }).catch(error=>{
              this.$message.error("error");
          });
        },
        getSubjectList(){
          getSubjectList().then(response=>{
            this.subjectList = response.data.subjectList;
       
           
          });
        },
        handleCoverSuccess(res, file) {
        this.courseInfo.cover = res.data.url;
      },
      beforeCoverUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    
    },
    watch:{
      selectedSubject(newVal,oldVal){
        console.log(newVal);

      }
    },

  computed: {
      isEditMode(){
        return this.$route && this.$route.params.id;
      },
  },

}
</script>

<style>

</style>