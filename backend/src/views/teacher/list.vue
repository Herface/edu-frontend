<template>
  <div>
      <el-row>
          <el-col :span="24" style="text-align:center;padding: 15px 0;">
            <el-form :inline="true" :model="condition" class="demo-form-inline">
              <el-form-item label="姓名">
                <el-input v-model="condition.name" placeholder="请输入姓名"></el-input>
              </el-form-item>
              <el-form-item label="职称">
                <el-select v-model="condition.level" placeholder="选择职称">
                  <el-option label="高级讲师" value="1"></el-option>
                  <el-option label="首席讲师" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="开始日期">
                <el-date-picker
                  v-model="condition.begin"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
               <el-form-item label="结束日期">
                <el-date-picker
                  v-model="condition.end"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="searchByCondition">查询</el-button>
              </el-form-item>
            </el-form>
          </el-col>
      </el-row>

      <el-row >
        <el-col :span="24">
          <el-table :data="teacherList" >
            <el-table-column label="姓名" prop="name"></el-table-column>
            <el-table-column label="资历" prop="career"></el-table-column>
            <el-table-column label="头衔">
               <template v-slot="scope">
                  {{scope.row.level===1?"高级讲师":"首席讲师"}}
              </template>
            </el-table-column>
             <el-table-column label="排序" prop="sort">
               
            </el-table-column>
             <el-table-column label="日期" prop="gmtCreate" sortable/>
             <el-table-column label="操作">
               <template v-slot="scope">
                  
                    <el-button type="primary" @click="toEdit(scope.row.id)">修改</el-button>
                
                  <el-button type="danger" @click="deleteById(scope.row.id)">删除</el-button>
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
import teacherApi from '@/api/teacher';
export default {
   name: "TeacherList",
  data(){
    return {
      condition: {},
      current: 1,
      pages: 1,
      total: 0,
      size: 6,
      
      teacherList: [],
    }
  },

  created(){
   this.getListData(this.current,this.size);
  },
  methods: {

    getListData(page,size){
     
       teacherApi.getList(page,size).then(res=>{
         console.log(res);
          let {records,pages,current,total} = res.data.pageData;
          this.teacherList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
    });
    },

    toEdit(id){
          this.$router.push({path: `/teacher/edit/${id}`});

    },
    deleteById(id){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          teacherApi.deleteById(id).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          this.getListData(1,this.size);

          });

        })

    },
    searchByCondition(){
      teacherApi.getListByCondition(this.condition,1,this.size).then(res=>{
          let {records,pages,current,total} = res.data.pageData;
          this.teacherList = records;
          this.pages = pages;
          this.current = current;
          this.total = total;
      });
    },
    changePage(page){
      this.getListData(page,this.size);
    }
  }

}
</script>

<style>

</style>