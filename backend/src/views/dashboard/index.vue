<template>
  <div class="dashboard-container">
     <el-carousel indicator-position="outside" height="50vh"	>
    <el-carousel-item v-for="item in imgs" :key="item">
        <img :src="item" style="width:100%;height:100%"/>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data(){
    return {
        imgs: [
          "https://img20.360buyimg.com/pop/s590x470_jfs/t1/121458/35/6019/85883/5efc6cd3E7c3e47df/49308ced1b541834.jpg.webp",
          "https://img12.360buyimg.com/pop/s590x470_jfs/t1/119673/4/11779/90745/5f1ba46fEef87d30d/dfdebc09b343d6e0.jpg.webp",
          "https://imgcps.jd.com/ling4/62049510068/5ri45oiP5py656aP5Yip5Lu3/5b2w5pi-5paw6KeG55WM/p-5bd8253082acdd181d02f9e8/23dc71d0/cr/s/q.jpg",
          "https://img20.360buyimg.com/da/s590x470_jfs/t1/143415/27/3798/64764/5f1d0b70Eff03b807/22002ba9cb71e077.jpg.webp"
        ]
    }
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
