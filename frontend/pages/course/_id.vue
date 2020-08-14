<template>
  <div id="aCoursesList" class="bg-fa of">
    <h1 v-if="!course">loading........</h1>
    <!-- /课程详情 开始 -->
    <section v-else  class="container">
      <section   class="path-wrap txtOf hLh30">
        <a href="/" title class="c-999 fsize14">首页</a>
        \
        <a href="/course" title class="c-999 fsize14">课程列表</a>
        \
        <span class="c-333 fsize14">{{course.title}}</span>
      </section>
      <div>
        <article class="c-v-pic-wrap" style="height: 357px;">
          <section class="p-h-video-box" id="videoPlay">
            <img :src="course.cover" :alt="course.title" class="dis c-v-pic" style="height:100%">
          </section>
        </article>
        <aside class="c-attr-wrap">
          <section class="ml20 mr15">
            <h2 class="hLh30 txtOf mt15">
              <span class="c-fff fsize24">{{course.title}}</span>
            </h2>
            <section class="c-attr-jg">
              <span class="c-fff">价格：</span>
              <b class="c-yellow" style="font-size:24px;">￥{{course.price}}</b>
            </section>
            <section class="c-attr-mt c-attr-undis">
              <span class="c-fff fsize14">主讲： {{course.teacherName}}&nbsp;&nbsp;&nbsp;</span>
            </section>

            <section class="c-attr-mt">
              <a @click="toPlay()" href="javascript:;" title="立即观看" class="comm-btn c-btn-3">立即观看</a>
            </section>
            <!-- <section v-else class="c-attr-mt">
              <a href="javascript:" @click="createOrderByCourseId(course.id)" title="立即购买" class="comm-btn c-btn-3">立即购买</a>
            </section> -->
          </section>
        </aside>
        <aside class="thr-attr-box">
          <ol class="thr-attr-ol clearfix" style="height: 100%">
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">购买数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.buyCount}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">课时数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.lessonNum}}</h6>
              </aside>
            </li>
            <li>
              <p>&nbsp;</p>
              <aside>
                <span class="c-fff f-fM">浏览数</span>
                <br>
                <h6 class="c-fff f-fM mt10">{{course.viewCount}}</h6>
              </aside>
            </li>
          </ol>
        </aside>
        <div class="clear"></div>
      </div>
      <!-- /课程封面介绍 -->
      <div class="mt20 c-infor-box">
        <article class="fl col-7">
          <section class="mr30">
            <div class="i-box">
              <div>
                <section id="c-i-tabTitle" class="c-infor-tabTitle c-tab-title">
                  <a name="c-i" class="current" title="课程详情">课程详情</a>
                </section>
              </div>
              <article class="ml10 mr10 pt20">
                <div>
                  <h6 class="c-i-content c-infor-title">
                    <span>课程介绍</span>
                  </h6>
                  <div class="course-txt-body-wrap">
                    <section class="course-txt-body">
                      <p v-html="course.description"></p>
                    </section>
                  </div>
                </div>
                <!-- /课程介绍 -->
                <div class="mt50">
           
                  <section class="mt20">
                
                    <div class="mt50 commentHtml">
										<div>
											<h6 class="c-c-content c-infor-title" id="i-art-comment">
												<span class="commentTitle">课程评论</span>
											</h6>
											<section class="lh-bj-list pr mt20 replyhtml">
												<ul>
													<li class="unBr">
														<aside class="noter-pic">
															<img width="50" height="50" class="picImg" src="photo/customer/01.jpg">
														</aside>
														<div class="of">
															<section class="n-reply-wrap">
																<fieldset>
																	<textarea v-model="comment" placeholder="输入您要评论的文字" id="commentContent"></textarea>
																</fieldset>
																<p class="of mt5 tar pl10 pr10">
																	<span class="fl "><tt class="c-red commentContentmeg" style="display: none;"></tt></span>
																	<a href="javascript:;" @click="doComment"  title="回复" class="lh-reply-btn">回复</a>
																</p>
															</section>
														</div>
													</li>
												</ul>
											</section>
											<section class="">
												<section class="question-list lh-bj-list pr">
													<ul class="pr10">
														<li v-for="comment in commentList" :key="comment.id">
															<aside class="noter-pic">
																<img width="50" height="50" class="picImg" :src="comment.avatar">
															</aside>
															<div class="of">
																<span class="fl"> 
																	<font class="fsize12 c-blue">{{comment.nickname}}</font>
																	<font class="fsize12 c-999 ml5">评论：</font>
																</span>
															</div>
															<div class="noter-txt mt5">
																<p>{{comment.content}}</p>
															</div>
															<div class="of mt5">
																<span class="fr"><font class="fsize12 c-999 ml5">{{comment.gmtCreate}}</font></span> 
															</div><!-- /回复盒子 -->
														</li>
													</ul>
												</section>
											</section>
											<!-- 公共分页 开始 -->
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
											<!-- 公共分页 结束 -->
										</div>
									</div>
                  </section>
                </div>
                <!-- /课程大纲 -->
              </article>
            </div>
          </section>
        </article>
        <aside class="fl col-3">
          <div class="i-box">
            <div>
              <section class="c-infor-tabTitle c-tab-title">
                <a title href="javascript:;">主讲讲师</a>
              </section>
              <section class="stud-act-list">
                <ul style="height: auto;">
                  <li>
                    <div class="u-face">
                      <a href="#">
                        <img :src="course.teacherAvatar" width="50" height="50" alt>
                      </a>
                    </div>
                    <section class="hLh30 txtOf">
                      <a class="c-333 fsize16 fl" href="javascript:;">{{course.teacherName}}</a>
                    </section>
                    <section class="hLh20 txtOf">
                      <span class="c-999">{{course.teacherCareer}}</span>
                    </section>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </aside>
        <div class="clear"></div>
      </div>
    </section>
    <!-- /课程详情 结束 -->
  </div>
</template>


<script>
import courseApi from '~/api/course';
import orderApi from '~/api/order';
import commentApi from '~/api/comment';
export default {

  layout: "index",

  created(){
    this.getCourseById(this.$route.params.id);
  },

  data(){

    return {
      course: undefined,
      chapterVideoList: [],
      isBuy: false,
      commentList: [],
      current: 0,
      pages: 0,
      total: 0,
      size: 8,
      comment: "",
      loading: true,
    }
  },

  methods: {
    getCourseById(id){
      courseApi.getCourseById(id).then(res=>{
        this.course = res.data.course;
        this.chapterVideoList = res.data.chapterVideoList;
        this.isBuy = res.data.isBuy;
        this.listCommentPageByCourseId(1,this.size);
        this.loading = false;
      });
    },

    createOrderByCourseId(courseId){
      console.log(courseId);
      orderApi.createOrderByCourseId(courseId).then(res=>{
        this.$router.push({path: `/order/${res.data.orderId}`});
      });
    },

    listCommentPageByCourseId(page,size){
      commentApi.listCommentPageByCourseId(this.course.id,page,size).then(res=>{
          let {records,pages,current,total} = res.data.pageData;
          this.commentList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
          // this.$router.push({path: 1,meta})
      })
    },
      changePage(page){
       this.listCommentPageByCourseId(page,this.size);
      
    },
    toPlay(){
      this.$router.push({path: `/video/${this.course.id}`});
    },
    doComment(){
      let userInfo = this.$store.getters["user/userInfo"];
      if ( userInfo  && this.comment.trim().length > 0) {
        let {id} = this.course;
        let content = this.comment.trim();
        let comment = {
          courseId: id,
          memberId: userInfo.id,
          nickname: userInfo.nickname,
          avatar: userInfo.avatar,
          content,
        }
        commentApi.addComment(comment).then(res=>{
          this.comment = "";
          this.listCommentPageByCourseId(1,this.size);
        });
      } else {
        this.$router.push({path: '/login'});
      }
    }
  },
   
}
</script>

<style>

</style>