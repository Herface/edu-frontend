<template>
  <div>
      <el-row >
        <el-col :span="24">
          <el-table :data="seckillList" >
            <el-table-column label="课程名称" prop="title"></el-table-column>
            <el-table-column label="原价￥" prop="oldPrice"/>
            <el-table-column label="秒杀价￥" prop="newPrice"></el-table-column>
            <el-table-column label="库存" prop="stock"></el-table-column>
             <el-table-column label="开始日期" prop="startTime" sortable/>
             <el-table-column label="操作">
               <template v-slot="scope">
                    <el-button type="primary" @click="toEdit(scope.row.seckillId)">修改</el-button>
                  <el-button type="danger" @click="deleteById(scope.row.seckillId)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import seckillApi from '@/api/seckill';
export default {
   name: "SeckillList",
  data(){
    return {
      condition: {},
      current: 1,
      pages: 1,
      total: 0,
      size: 6,
      
      seckillList: [],
    }
  },

  created(){
   this.getListData();
  },
  methods: {

    getListData(){
     
       seckillApi.listSeckills().then(res=>{
          this.seckillList = res.data.seckillList;
    });
    },

    toEdit(id){
          this.$router.push({path: `/seckill/edit/${id}`});
    },
    deleteById(id){
        this.$confirm('是否删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          seckillApi.deleteById(id).then(res=>{
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

          this.getListData(1,this.size);

          });

        })

    },
    changePage(page){
      this.getListData(page,this.size);
    }
  }

}
</script>

<style>

</style>