<template>
   <div class="app-container">


    <el-steps :active="3" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="课程信息"></el-step>
        <el-step title="课程大纲"></el-step>
        <el-step title="发布课程"></el-step>
    </el-steps>

    <div class="ccInfo">
      <img :src="publishCourse.cover">
      <div class="main">
        <h2>{{ publishCourse.title }}</h2>
        <p class="gray"><span>共{{ publishCourse.lessonNum }}课时</span></p>
        <p><span>所属分类：{{ publishCourse.parentSubject }} / {{ publishCourse.subject }}</span></p>
        <p>课程讲师：{{ publishCourse.teacher }}</p>
        <h3 class="red">￥{{ publishCourse.price }}</h3>
      </div>
    </div>

    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button  type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>

</template>

<script>
import { publishCourseById, getPublishCourseById } from '@/api/course';
export default {
    data(){
        return {
            active: 3,
            publishCourse: {
                title: "",
                cover: "",
                teacher: "",
                parentSubject: "",
                subject: "",
                price: 0,
                lessonNum: 0,
            },
            
        }
    },
    methods: {
        previous(){
            this.$router.push({path: `/course/chapter/${this.$route.params.id}`});
        },
        publish(){
            publishCourseById(this.$route.params.id).then(res=>{
                this.$message.success("发布成功");
                this.$router.push({path: "/course/list"});

            
            });
        },
        gePublishCourse(){
             getPublishCourseById(this.$route.params.id).then(res=>{
                this.publishCourse = res.data.publishCourse;
            });
        }
    },
    created(){
        this.gePublishCourse();
    }

}
</script>

<style scoped>
.ccInfo {
    background: #f5f5f5;
    padding: 20px;
    overflow: hidden;
    border: 1px dashed #DDD;
    margin-bottom: 40px;
    position: relative;
}
.ccInfo img {
    background: #d6d6d6;
    width: 500px;
    height: 278px;
    display: block;
    float: left;
    border: none;
}
.ccInfo .main {
    margin-left: 520px;
}

.ccInfo .main h2 {
    font-size: 28px;
    margin-bottom: 30px;
    line-height: 1;
    font-weight: normal;
}
.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}

.ccInfo .main p {
    margin-bottom: 10px;
    word-wrap: break-word;
    line-height: 24px;
    max-height: 48px;
    overflow: hidden;
}
.ccInfo .main h3 {
    left: 540px;
    bottom: 20px;
    line-height: 1;
    font-size: 28px;
    color: #d32f24;
    font-weight: normal;
    position: absolute;
}


</style>