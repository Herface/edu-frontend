<template>
  <div id="aCoursesList" class="bg-fa of">
    <!-- 讲师列表 开始 -->
    <section class="container">
      <header class="comm-title all-teacher-title">
        <h2 class="fl tac">
          <span class="c-333">全部讲师</span>
        </h2>
        <section class="c-tab-title">
          <a id="subjectAll" title="全部" href="#">全部</a>
          <!-- <c:forEach var="subject" items="${subjectList }">
                            <a id="${subject.subjectId}" title="${subject.subjectName }" href="javascript:void(0)" onclick="submitForm(${subject.subjectId})">${subject.subjectName }</a>
          </c:forEach>-->
        </section>
      </header>
      <section class="c-sort-box unBr">
        <div>
          <!-- /无数据提示 开始-->
          <section v-if="total===0" class="no-data-wrap">
            <em class="icon30 no-data-ico">&nbsp;</em>
            <span class="c-666 fsize14 ml10 vam">没有相关数据，小编正在努力整理中...</span>
          </section>
          <!-- /无数据提示 结束-->
          <article class="i-teacher-list">
            <ul class="of">
              <li v-for="teacher in teacherList" :key="teacher.id" style="height:400px;width: 290px">
                <section class="i-teach-wrap">
                  <div class="i-teach-pic" style="height:150px;width: 150px">
                    <a :href="`/teacher/${teacher.id}`" :title="teacher.name" target="_blank">
                      <img :src="teacher.avatar" style="width: 100%;height: 100%" alt>
                    </a>
                  </div>
                  <div class="mt10 hLh30 txtOf tac">
                    <router-link :to="`/teacher/${teacher.id}`" :title="teacher.name"  class="fsize18 c-666">{{teacher.name}}</router-link>
                  </div>
                  <div class="hLh30 txtOf tac">
                    <span class="fsize14 c-999">{{teacher.intro}}</span>
                  </div>
                  <div class="mt15 i-q-txt">
                    <p class="c-999 f-fA">{{teacher.career}}</p>
                  </div>
                </section>
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
    <!-- /讲师列表 结束 -->
  </div>
</template>

<script>
import teacherApi from '~/api/teacher';
export default {
  layout: "index",
  created(){
    this.getTeacherListPage(1,this.size);
  },
    data(){
    return {
      condition: {},
      current: 1,
      pages: 0,
      total: 0,
      size: 8,
      
      teacherList: [],
    }
  },
  methods: {
    getTeacherListPage(page,size){
      teacherApi.getTeacherListPage(page,size).then(res=>{
          let {records,pages,current,total} = res.data.pageData;
          this.teacherList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
      });
    },
     changePage(page){
      this.getTeacherListPage(page,this.size);
    }
  }

}
</script>

<style>

</style>