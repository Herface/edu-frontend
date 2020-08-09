<template>
  <div>
      <el-row>
          <el-col :span="24" style="text-align:center;padding: 15px 0;">
            <el-form :inline="true" :model="condition" class="demo-form-inline">
              <el-form-item label="课程名称">
                <el-input v-model="condition.title" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-select v-model="condition.status" placeholder="选择职称">
                  <el-option label="已发布" value="Normal"></el-option>
                  <el-option label="未发布" value="Draft"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchByCondition">查询</el-button>
                <el-button type="default" @click="clearCondition">清除</el-button>
              </el-form-item>
            </el-form>
          </el-col>
      </el-row>

      <el-row >
        <el-col :span="24">
          <el-table :data="courseList" >
            <el-table-column label="课程名称" prop="title"></el-table-column>
            <el-table-column label="课程状态">
               <template v-slot="scope">
                  {{scope.row.status==='Normal'?"已发布":"未发布"}}
              </template>
            </el-table-column>
              <el-table-column label="总课时" prop="lessonNum" sortable/>
              <el-table-column label="浏览数量" prop="viewCount" sortable/>
              <el-table-column label="销售数量" prop="buyCount" sortable/>
             <el-table-column label="日期" prop="gmtCreate" sortable/>
             <el-table-column label="操作">
               <template v-slot="scope">
                  <el-button icon="el-icon-edit" size="small" type="primary" @click="$router.push(`/course/edit/${scope.row.id}`)" circle>
                   
                  </el-button>
                   <el-button @click="$router.push(`/course/chapter/${scope.row.id}`)" icon="el-icon-date" size="small" type="primary" circle>
                  </el-button>
                  <el-button circle icon="el-icon-delete" size="small"  type="danger" @click="deleteById(scope.row.id)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <el-row style="text-align: center;padding-top: 30px">
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
      </el-row>
      
  </div>
</template>

<script>
import { getCoursePage,getCoursePageByCondition,deleteCourseById } from '@/api/course';
export default {
   name: "TeacherList",
  data(){
    return {
      isCondition: false,
      condition: {
        title: "",
        status: "",
      },
      current: 1,
      pages: 1,
      total: 0,
      size: 6,
      courseList: [],
    }
  },

  created(){
   this.getListData(this.current,this.size);
  },
  methods: {

    getListData(page,size){
     
      getCoursePage(page,size).then(res=>{
         console.log(res);
          let {records,pages,current,total} = res.data.pageData;
          this.courseList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
    });
    },
    getListDataByCondition(page,size){
      getCoursePageByCondition(page,size,this.condition).then(res=>{
          let {records,pages,current,total} = res.data.pageData;
          this.courseList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
      });
    },
    deleteById(id){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          deleteCourseById(id).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getListData(1,this.size);
          });
        })

    },
    searchByCondition(){
      this.isCondition = true;
      this.getListDataByCondition(1,this.size);
     
    },

    clearCondition(){
      this.condition = {};
      this.isCondition = false;
      this.getListData(1,this.size);
    },

    changePage(page){
      if(this.isCondition){
          this.getListDataByCondition(page,this.size);
      }else{
          this.getListData(page,this.size);
      }
     
    }
  }

}
</script>

<style>

</style>