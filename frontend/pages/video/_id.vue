<template>
<el-row type="flex" justify="center">
<link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.8.2/skins/default/aliplayer-min.css" />
<script charset="utf-8" type="text/javascript" src="https://g.alicdn.com/de/prismplayer/2.8.2/aliplayer-min.js"></script>
<el-col :span="14">
        <div class="prism-player" id="player-con" style="width:100%;height: 500px"></div>
</el-col>
<el-col :span="6">
     <el-tree
      :props="{label: 'title'}"  
      :data="chapterList"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span v-if="!data.children">
          <el-button
          v-if="(data.isFree || course.price === 0 || isBuy) && current !== data.id"
            type="text"
            size="medium"
            @click="play(data)"
            icon="el-icon-caret-right"
            >
          </el-button>
        <el-button
          v-if="current === data.id"
            type="text"
            size="medium"
            icon="el-icon-loading"
            >
          </el-button>
          <el-button
            v-if="!data.isFree && (course.price !== 0 && !isBuy)"
            type="text"
            size="mini"
            @click="toPay()">
            立即购买
          </el-button>
        </span>
      </span>
    </el-tree>
</el-col>
</el-row>
</template>

<script>
import videoApi from '~/api/video';
import courseApi from '~/api/course';
import orderApi from '~/api/order';
export default {
    layout: "index",

    created(){
       this.getChapterList();
    },
    data(){
        return {
            playAuth: "",
            vid: "",
            chapterList: [],
            course: undefined,
            courseId: "",
            isBuy: false,
            current: "",
        }
    },
    player: undefined,
    methods: {
        play(video){
            this.current = video.id;
            videoApi.getPlayAuthByVid(video.videoSourceId).then(res=>{
                 let auth = res.data.auth;
                 if (!this.player) {
                   courseApi.incrementViewCountByCourseId(this.courseId).then((res=>{}));
                    this.player = new Aliplayer({
                        "id": "player-con",
                        "vid": video.videoSourceId,
                        "playauth": auth,
                        "qualitySort": "asc",
                        "format": "mp4",
                        "mediaType": "video",
                        "width": "100%",
                        "height": "500px",
                        "autoplay": true,
                        "isLive": false,
                        "rePlay": false,
                        "playsinline": true,
                        "preload": true,
                        "controlBarVisibility": "hover",
                        "useH5Prism": true
                        }, function (player) {
                            console.log("The player is created");
                        }
            );
                 } else {
                    this.player.replayByVidAndPlayAuth(video.videoSourceId,auth);
                 }
            });
        },
        toPay(){
            // this.$route.
            let  userInfo = this.$store.getters["user/userInfo"];
            if (!userInfo) {
              this.$router.push(`/login?redirect=/video/${this.course.id}`)
              return;
            }
             orderApi.createOrderByCourseId(this.course.id).then(res=>{
                this.$router.push({path: `/order/${res.data.orderId}`});
            });
        },
        getPlayAuthBySourseId(id){
            // let { id } = this.$route.params;
            this.vid = id;
            videoApi.getPlayAuthByVid(id).then(res=>{
                this.playAuth = res.data.auth;
                 let auth = this.playAuth;
        let vid = this.vid;
   
            });
        },
        getChapterList(){
            let { id } = this.$route.params;
            this.courseId = id;
            courseApi.getCourseById(id).then(res=>{
                this.course = res.data.course;
                this.chapterList = res.data.chapterVideoList;
                this.isBuy = res.data.isBuy;
            });
        }
    },

    // mounted(){
    //     this.getPlayAuthById();
    // },




}
</script>

<style>

</style>