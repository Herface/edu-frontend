<template>
  
  <div>
    <!-- 幻灯片 开始 -->
     <el-carousel indicator-position="outside" height="400px" style="padding: 30px">
        <el-carousel-item v-for="banner in bannerList" :key="banner.id">
          <img :src="banner.imageUrl" style="width:100%;height:100%"/>
        </el-carousel-item>
    </el-carousel>
  <!-- 幻灯片 结束 -->
    
     <div id="aCoursesList">
      <!-- 网校课程 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">热门课程</span>
            </h2>
          </header>
          <div>
            <article class="comm-course-list">
              <ul class="of" id="bna">
                <li v-for="course in courseList" :key="course.id" >
                  <div class="cc-l-wrap">
                    <section class="course-img" style="height:250px;width: 290px">
                      <img
                        :src="course.cover"
                        class="img-responsive"
                        :alt="course.title"
                        style="height:100%;width: 100%"
                      >
                      <div class="cc-mask">
                        <router-link :to="`/course/${course.id}`" class="comm-btn c-btn-1">开始学习</router-link>
                      </div>
                    </section>
                    <h3 class="hLh30 txtOf mt10">
                      <a :href="`/course/${course.id}`" title="表体" class="course-title fsize18 c-333">{{course.title}}</a>
                    </h3>
                    <section class="mt10 hLh20 of">
                      <span class="fr jgTag bg-green" v-if="course.price === 0" >
                        <i class="c-fff fsize12 f-fA">免费</i>
                      </span>
                      <span v-else class="fr jgTag bg-green" style="background: orange" >
                        <i class="c-fff fsize12 f-fA">￥{{course.price}}</i>
                      </span>
                      <span class="fl jgAttr c-ccc f-fA">
                        <i class="c-999 f-fA">{{course.buyCount}}人学习</i>
                        |
                        <i class="c-999 f-fA">{{course.viewCount}}次观看</i>
                      </span>
                    </section>
                  </div>
                </li>
               
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/course" title="全部课程" class="comm-btn c-btn-2">全部课程</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校课程 结束 -->
      <!-- 网校名师 开始 -->
      <div>
        <section class="container">
          <header class="comm-title">
            <h2 class="tac">
              <span class="c-333">名师大咖</span>
            </h2>
          </header>
          <div>
            <article class="i-teacher-list">
              <ul class="of" >
                <li v-for="teacher in teacherList" :key="teacher.id" style="height:400px;width: 290px">
                  <section class="i-teach-wrap">
                    <div class="i-teach-pic" style="height:150px;width: 150px">
                      <a :href="`/teacher/${teacher.id}`" :title="teacher.name">
                        <img :alt="teacher.name" :src="teacher.avatar" style="width: 100%;height: 100%">
                      </a>
                    </div>
                    <div class="mt10 hLh30 txtOf tac">
                      <a :href="`/teacher/${teacher.id}`" :title="teacher.name" class="fsize18 c-666">{{teacher.name}}</a>
                    </div>
                    <div class="hLh30 txtOf tac">
                      <span class="fsize14 c-999">{{teacher.career}}</span>
                    </div>
                    <div class="mt15 i-q-txt">
                      <p
                        class="c-999 f-fA"
                      >{{teacher.intro}}</p>
                    </div>
                  </section>
                </li>
                
              </ul>
              <div class="clear"></div>
            </article>
            <section class="tac pt20">
              <a href="/teacher" title="全部讲师" class="comm-btn c-btn-2">全部讲师</a>
            </section>
          </div>
        </section>
      </div>
      <!-- /网校名师 结束 -->
    </div>
  </div>
</template>


<script>
import bannerApi from '~/api/banner';
import indexApi from '~/api/index';
export default {
  layout: "index",
  created(){
    this.getIndexData();
  },
  methods:{
      // getBannerList(){
      //   bannerApi.getBannerList().then(res=>{
      //       this.bannerList = res.data.bannerList;
      //   });
      // },
      getIndexData(){
        indexApi.getIndexData().then(res=>{
            this.courseList = res.data.courseList;
            this.teacherList = res.data.teacherList;
            this.bannerList = res.data.bannerList;
        });
      },

  },
  data(){
    return {
      courseList: [],
      teacherList: [],
      bannerList: [],
    }
  }
}
</script>

<style>

</style>
