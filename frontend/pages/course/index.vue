<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- /课程列表 开始 -->
    <section class="container">
      <header class="comm-title">
        <h2 class="fl tac">
          <span class="c-333">全部课程</span>
        </h2>
      </header>
      <section class="c-sort-box">
        <section class="c-s-dl">
          <dl>
            <dt>
              <span class="c-999 fsize14">课程类别</span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li :class="{current: subjectIndex === -1}">
                  <a  title="全部" href="javascript:;" @click="changeSubject(-1)">全部</a>
                </li>
                <li v-for="(subject, index) in subjectList" :key="subject.id" :class="{current: subjectIndex === index}">
                  <a :title="subject.title" href="javascript:;"  @click="changeSubject(index)">{{subject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <dl>
            <dt>
              <span class="c-999 fsize14"></span>
            </dt>
            <dd class="c-s-dl-li">
              <ul class="clearfix">
                <li :class="{current: subSubjectIndex === index }"  v-for="(subject,index) in subSubjectList" :key="index">
                  <a :title="subject.title" href="javascript:;" @click="changeSubSubject(index)">{{subject.title}}</a>
                </li>
              </ul>
            </dd>
          </dl>
          <div class="clear"></div>
        </section>
        <div class="js-wrap">
          <section class="fr">
            <span class="c-ccc">
              <i class="c-master f-fM">1</i>/
              <i class="c-666 f-fM">1</i>
            </span>
          </section>
          <section class="fl">
            <ol class="js-tap clearfix">
              <li @click="changeSort('view_count')" :class="{current: condition.sort==='view_count','bg-orange': condition.sort==='view_count'}">
                <a title="关注度" href="javascript:;">关注度</a>
            <span :class="{current: condition.sort==='view_count','bg-orange': condition.sort==='view_count'}">↓</span>

              </li>
              <li  @click="changeSort('gmt_create')"  :class="{current: condition.sort==='gmt_create','bg-orange': condition.sort==='gmt_create'}">
                <a title="最新"  href="javascript:;">最新</a>
            <span :class="{current: condition.sort==='gmt_create','bg-orange': condition.sort==='gmt_create'}">↓</span>

              </li>
              <li  @click="changeSort('price')" :class="{current: condition.sort==='price','bg-orange': condition.sort==='price'}">
                <a title="价格"  href="javascript:;">价格&nbsp;
                </a>
            <span :class="{current: condition.sort==='price','bg-orange': condition.sort==='price'}">↓</span>

              </li>
            </ol>
          </section>
        </div>
        <div class="mt40">
          <!-- /无数据提示 开始-->
          <section v-if="pages===0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article v-else class="comm-course-list">
            <ul class="of" id="bna">
              <li v-for="course in courseList" :key="course.id">
                <div class="cc-l-wrap">
                  <section class="course-img">
                    <img :src="course.cover" class="img-responsive" :alt="course.title" style="height:150px">
                    <div class="cc-mask">
                      <router-link :to="`/course/${course.id}`" title="开始学习" class="comm-btn c-btn-1">开始学习</router-link>
                    </div>
                  </section>
                  <h3 class="hLh30 txtOf mt10">
                    <router-link :to="`/course/${course.id}`" :title="course.title" class="course-title fsize18 c-333">{{course.title}}</router-link>
                  </h3>
                  <section class="mt10 hLh20 of">
                    <span class="fr jgTag bg-green" v-if="course.price===0">
                      <i class="c-fff fsize12 f-fA">免费</i>
                    </span>
                     <span class="fr jgTag bg-money" style="backgroud:orange" v-else>
                      <i class="c-fff fsize12 f-fA">￥{{course.price}}</i>
                    </span>
                    <span class="fl jgAttr c-ccc f-fA">
                      <i class="c-999 f-fA">{{course.viewCount}}人学习</i>
                      |
                      <i class="c-999 f-fA">{{course.buyCount}}评论</i>
                    </span>
                  </section>
                </div>
              </li>
            </ul>
            <div class="clear"></div>
          </article>
        </div>
        <!-- 公共分页 开始 -->
        <div>
          <div class="paging">
           <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-count="pages"
                :page-size="size"
                :current-page="current"
                @current-change="changePage"
                >
            </el-pagination>
          </div>
        </div>
        <!-- 公共分页 结束 -->
      </section>
    </section>
    <!-- /课程列表 结束 -->
  </div>
</template>

<script>
import courseApi from '~/api/course';
export default {
  layout: "index",

  created(){
    this.getSubejctTree();
    this.getCourseListPageByCondition(1,this.size);
  },

  data(){
    return {
      condition: {
        parentSubjectId: "",
        subjectId: "",
        sort: "",
      },
      current: 0,
      pages: 0,
      total: 0,
      size: 8,
      subjectList: [],
      subSubjectList: [],
      courseList: [],
      subjectIndex: -1,
      subSubjectIndex: -1,
    }
   
  },
   methods: {
     getCourseListPageByCondition(page,size){
       courseApi.getCourseListPageByCondition(this.condition,page,size).then(res=>{
          let {records,pages,current,total} = res.data.pageData;
          this.courseList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
       });

     },
     getSubejctTree(){

       courseApi.getSubjectTree().then(res=>{
         this.subjectList = res.data.subjectList;
         console.log(this.subjectList);
       });

     },
    changePage(page){
       this.getCourseListPageByCondition(page,this.size);
      
    },
    changeSubject(index){
      this.subjectIndex = index;
      if (index===-1) {
        this.subSubjectList = [];
        this.condition.subjectId = "";
        this.condition.parentSubjectId = "";
        this.condition.sort = "";
        this.getCourseListPageByCondition(1,this.size);
        return;
      }
      let subject = this.subjectList[index]
      this.subSubjectList  = subject.children;
      this.condition.parentSubjectId = subject.id;
      this.getCourseListPageByCondition(1,this.size);
    },
    changeSubSubject(index){
      this.subSubjectIndex = index;
      let subSubject = this.subSubjectList[index];
      this.condition.subjectId = subSubject.id;
      this.getCourseListPageByCondition(1,this.size);
    },
    changeSort(sort){
      this.condition.sort  = sort;
       this.getCourseListPageByCondition(1,this.size);
    }
    
  }
}
</script>

<style scoped>
.bg-money {
  background: orange;
}

</style>