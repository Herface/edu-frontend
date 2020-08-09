<template>
  <el-row>
    <el-col :span="18" :offset="3">

        <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
            <el-step title="课程信息"></el-step>
            <el-step title="课程大纲"></el-step>
            <el-step title="发布课程"></el-step>
        </el-steps>
        <el-button type="text" @click="openChapterForm">添加章节</el-button>
         <el-tree
      :data="chapterList"
        :props="defaultProps"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span  class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="data.children">
        <el-button
            type="text"
            size="mini"
            @click="() => openVideoForm(data.id)">
            新增小节
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => openChapterForm(data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => deleteChapter(data.id)">
            删除
          </el-button>
        </span>
        <span v-else>
          <el-button
            type="text"
            size="mini"
            @click="() => openVideoForm(data)">
            修改
          </el-button>
          <el-button
            type="text"
            size="mini"
            @click="() => deleteVideo(data.id)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
        <el-button type="default" @click="previous">上一步</el-button>
         <el-button type="primary" @click="next">下一步</el-button>
    </el-col>

<el-dialog title="章节" :visible.sync="chapterForm">
  <el-form :model="chapterInfo">
    <el-form-item label="章节名称" label-width="80px">
      <el-input v-model="chapterInfo.title"></el-input>
    </el-form-item>
    <el-form-item label="章节排序" label-width="80px">
        <el-input-number v-model="chapterInfo.sort"  :min="0" ></el-input-number>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="chapterForm = false">取 消</el-button>
    <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
  </div>
</el-dialog>

   <el-dialog title="小节" :visible.sync="videoForm">
    <el-form :model="chapterVideoInfo">
        <el-form-item label="名称" label-width="80px">
            <el-input v-model="chapterVideoInfo.title"></el-input>
        </el-form-item>
        <el-form-item label="排序" label-width="80px">
            <el-input-number v-model="chapterVideoInfo.sort"  :min="0" ></el-input-number>
        </el-form-item>
         <el-form-item label="免费" label-width="80px">
             <el-radio v-model="chapterVideoInfo.isFree" :label="true">是</el-radio>
            <el-radio v-model="chapterVideoInfo.isFree" :label="false">否</el-radio>
        </el-form-item>
        <!-- <el-form-item label="视频"  label-width="80px">
            <el-upload
                class="upload-demo"
                :action="uploadVodUrl"
                name="video"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :on-success="handleSuccess"
                :limit="1"
                :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">可上传主流格式的视频文件，且不超过100M</div>
                </el-upload>
        </el-form-item> -->
             <el-form-item label="视频"  label-width="80px">
                 <el-input v-model="chapterVideoInfo.videoSourceId" placeholder="阿里云视频id"></el-input>
        </el-form-item>
    </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="videoForm = false">取 消</el-button>
    <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
  </div>
</el-dialog>
  </el-row>
</template>

<script>
import { getChapterByCourseId, getChapterById ,saveChapter,deleteChapterById,updateChapter} from '@/api/chapter';
import {getChapterVideoById,saveChapterVideo,updateChapterVideo,deleteChapterVideoById,deleteVideoSourceById} from '@/api/chapterVideo';
export default {


    created(){
        this.courseId = this.$route.params.id;
        this.getChapterdata();
        
    },


    data(){
        return {
            courseId: "",
            chapterForm: false,
            videoForm: false,
            active: 2,
            chapterList: [],
            defaultProps: {
              children: 'children',
              label: 'title'
            },
            chapterInfo: {
                title: "",
                sort: "",
            },
            chapterVideoInfo: {
                title: "",
                videoSourceId: "",
                videoOriginalName: "",
                isFree: 0,
                sort: 0,
            },
             uploadVodUrl: "http://localhost:8089/vod/upload",
             fileList:[],

        }
    },
    methods:{
//=================章节===============================
        saveOrUpdateChapter(){
            if (this.chapterInfo.id) {
                this.updateChapter();
            } else {
                this.saveChapter();
            }

        },
        saveChapter(){
            this.chapterInfo.courseId = this.courseId;
            saveChapter(this.chapterInfo).then(res=>{
                 this.chapterForm = false;
                this.$message.success("保存成功");
                this.getChapterdata();
            });

        },
        updateChapter(){
            updateChapter(this.chapterInfo).then(res=>{
                this.chapterForm = false;
                this.$message.success("保存成功");
                this.getChapterdata();
            })

        },
        deleteChapter(id){
            deleteChapterById(id).then(res=>{
                 this.chapterForm = false;
                this.$message.success("删除成功");
                this.getChapterdata();
            });

         },
         openChapterForm(data){
            this.chapterForm = true;
            this.chapterInfo =  {
                title: "",
                sort: "",
            };
            console.log(data);
            if(data.id){
                getChapterById(data.id).then(res=>{
                    this.chapterInfo = res.data.chapter;
                });
            }
         
         },

//====================视频小节===============================
        saveOrUpdateVideo(){
            if(this.chapterVideoInfo.id){
                this.updateVideo();
            }else{
                this.saveVideo();
            }

        },
        saveVideo(){
            saveChapterVideo(this.chapterVideoInfo).then(res=>{
                this.videoForm = false;
                this.$message.success("添加成功");
                this.getChapterdata();
            });

        },
        updateVideo(){
            updateChapterVideo(this.chapterVideoInfo).then(res=>{
                this.videoForm = false;
                this.$message.success("保存成功");
                this.getChapterdata();
            });

        },
        deleteVideo(id){
            deleteChapterVideoById(id).then(res=>{
                this.$message.success("删除成功");
                this.getChapterdata();
            });

        },
        openVideoForm(data){
              this.videoForm = true;
            this.chapterVideoInfo =  {
                title: "",
                videoSourceId: "",
                videoOriginalName: "",
                isFree: 0,
                sort: 0,
            };
          
            if(data.id){
                getChapterVideoById(data.id).then(res=>{
                    this.chapterVideoInfo = res.data.video;
                    this.fileList = [{name: this.chapterVideoInfo.videoOriginalName}]
                });
            }else{
                this.chapterVideoInfo.chapterId = data;
                this.chapterVideoInfo.courseId = this.courseId;
            }
       
        },
//=========================上传视频==============================
    beforeAvatarUpload(file) {
        const isLt100M = file.size / 1024 / 1024 <= 100;

        if (!isLt100M) {
          this.$message.error('上传视频大小不能超过 100M!');
        }
        return isLt100M;
      },
      handleRemove(file, fileList) {
          deleteVideoSourceById(this.chapterVideoInfo.videoSourceId).then(res=>{
              this.$message.success("删除成功");
              this.chapterVideoInfo.videoOriginalName = "";
              this.chapterVideoInfo.videoSourceId = "";
          });
        
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess(res,file,fileList){
          this.chapterVideoInfo.videoSourceId = res.data.videoSourceId;
          this.chapterVideoInfo.videoOriginalName = file.name;
          console.log(fileList);
      },

//============================================================
        next(){
            this.$router.push({path: `/course/publish/${this.courseId}`});
        },
        previous(){
          this.$router.push({path: `/course/edit/${this.$route.params.id}`});
        },


        getChapterdata(){
            getChapterByCourseId(this.$route.params.id).then(res=>{
                this.chapterList = res.data.chapterList;
            });
        }
    }

}
</script>

<style scpoed>
 .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

</style>