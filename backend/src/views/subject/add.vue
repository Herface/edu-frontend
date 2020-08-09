<template>
  <el-row>
    <el-col :span="18" :offset="3">
      <el-form>
       <el-form-item label="示例">
         
            <el-link type="primary" href="https://soyoungs.oss-cn-beijing.aliyuncs.com/demo.xlsx
">点击下载</el-link>
       </el-form-item>
       <el-form-item label="上传">
         <el-upload
         name="excel"
          class="upload-demo"
          ref="upload"
          :action="uploadExcelUrl"
          :on-success="handleSuccess"
          :limit="1"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :before-upload="handleBeforeLoad"
          :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
       </el-form-item>
       </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
    data(){
        return {
             uploadExcelUrl: process.env.VUE_APP_BASE_API+"/subject/excel",
        }
    },
 methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleSuccess(response){
        this.$message.success("上传成功！");
        this.$router.push({path: "/subject/list"});
      },
      handleBeforeLoad(file){

        console.log(file);

        // return false;

      }
    }
  }

</script>

<style>

</style>