<template>
<div>
    <h1><font color="red">"{{keyword}}"</font>&nbsp;&nbsp;的搜索结果</h1>
    <el-divider content-position="left">课程</el-divider>
  <el-row>
    <el-col :span="6" v-for="(course,index) in courseList" :key="course.id" :offset="index % 3  > 0 ? 2 : 1">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="course.cover" style="width: 100%;height: 200px">
      <div style="padding: 14px;">
        <span v-html="course.title"></span>
        <div class="bottom clearfix">
          <el-button type="text" class="button"><router-link :to="`/course/${course.id}`">查看详情</router-link></el-button>
        </div>
      </div>
    </el-card>
  </el-col>
    <el-col :span="10"  :push="2">
         <p v-if="courseList.length === 0">暂无数据</p>
    </el-col>
  </el-row>
  <el-divider content-position="left">讲师</el-divider>
    <el-row>
    <el-col style="padding: 15px 0" :span="6" v-for="(teacher,index) in teacherList" :key="teacher.id" :offset="index % 3 > 0 ? 2 : 1">
        <el-card>
            <div slot="header">
                <el-avatar :src="teacher.avatar" style="width: 100px;height: 100px;vertical-align: middle;"></el-avatar>
                 <el-link type="primary"><router-link :to="`/teacher/${teacher.id}`">{{teacher.name}}</router-link></el-link> 
            </div>
             <p v-html="teacher.career"></p>
           
           
        </el-card>
    </el-col>
       <el-col :span="10"  :push="2">
         <p v-if="teacherList.length === 0">暂无数据</p>
    </el-col>
  </el-row>
  </div>
</template>

<script>
import searchApi from '~/api/search';
export default {
    layout: "index",
    data(){
        return {
            keyword: "",
            courseList: [],
            teacherList: [],
        }
    },

    created(){
        this.keyword = this.$route.query.keyword;
        console.log(this.$route);
        searchApi.globalSearch(this.keyword).then(({data})=>{
            this.courseList = data.result.courseList;
            this.teacherList = data.result.teacherList;
            console.log(this.teacherList);
        })
    },

    watch: {
        "$route": function(oldVal,newVal){

            this.keyword = this.$route.query.keyword;
            searchApi.globalSearch(this.keyword).then(({data})=>{
            this.courseList = data.result.courseList;
            this.teacherList = data.result.teacherList;
            
        });
    }

}
}
</script>

<style>

</style>