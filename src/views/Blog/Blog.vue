<template>
  <div class="blog-home">
    <el-row type="flex" justify="center">
      <el-col :span="24">
        <el-carousel trigger="click" height="500px">
          <el-carousel-item
            v-for="item in banner"
            :key="item.id"
            shadow="never"
            class="banner"
            :style="{'background': 'url(' + item.imgUrl + ')', 'background-size': 'cover', 'background-position': 'center'}"
          >
            <div class="banner-bg">
              <h1 style="width:80%">{{ item.title }}</h1>
              <p style="width:70%">{{ item.content }}</p>
              <div class="banner-button">
                <el-button @click="viewEvent(item.id)">{{ $t('blog.read') }}</el-button>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
    <div style="margin:80px" />
    <el-row type="flex" justify="center">
      <el-col :span="12">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
            <div class="time" style="font-size:3em">{{ $store.getters.siteSubject }}</div>
            <div class="time" style="font-size:1.5em">{{ $store.getters.siteDescription }}</div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <template v-for="(item,index) in modules">
      <div :key="index">
        <div style="margin:80px" />
        <el-row type="flex" justify="center">
          <el-col :span="20">
            <div v-if="item.type === '0'">
              <ImageCard :blogs="item.blogs" @click="viewEvent" />
            </div>
            <div v-if="item.type === '1'">
              <ArticleCard :blogs="item.blogs" @click="viewEvent" />
            </div>
            <div v-if="item.type === '2'">
              <DisplayCard :blogs="item.blogs" @click="viewEvent" />
            </div>
            <div v-if="item.type === '3'">
              <DetailCard :blogs="item.blogs" @click="viewEvent" />
            </div>
          </el-col>
        </el-row>
      </div>
    </template>
  </div>
</template>

<script>
import ImageCard from '@/components/ImageCard.vue'
import ArticleCard from '@/components/ArticleCard.vue'
import DisplayCard from '@/components/DisplayCard'
import DetailCard from '@/components/DetailCard'
import { getBlogs } from '@/api/blog'
export default {
  name: 'Home',
  components: {
    ImageCard,
    ArticleCard,
    DisplayCard,
    DetailCard
  },
  data() {
    return {
      banner: [],
      modules: [{
      }]
    }
  },
  created() {
    if (this.$store.getters.siteName === '') {
      this.$store.dispatch('setSiteSetting').then(data => {
        const uiSetting = this.$store.state.siteSetting.uiSetting
        if (uiSetting) {
          this.loadData(uiSetting)
        }
      })
    } else {
      const uiSetting = this.$store.state.siteSetting.uiSetting
      if (uiSetting) {
        this.loadData(uiSetting)
      }
    }
  },
  methods: {
    viewEvent(id) {
      this.$router.push({ name: 'Detail', params: { id: id }})
    },
    async loadData(uiSetting) {
      const setting = JSON.parse(uiSetting)
      if (setting.banner) {
        const result = await getBlogs({
          index: 1,
          size: setting.banner.count,
          query: '',
          category: setting.banner.category
        })
        this.banner = result.data
      }

      const arr = []
      for (let i = 0, len = setting.modules.length; i < len; i++) {
        const s = setting.modules[i]
        const result = await getBlogs({
          index: 1,
          size: s.count,
          query: '',
          category: s.category
        })
        arr.push({
          type: s.displayType,
          blogs: result.data
        })
      }
      this.modules = arr
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }
  .banner{
    color: #fff;
  }
  .banner-bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    content: "";
    background: rgba(0, 0, 0, 0.27);
    display: flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .banner-button{
    width:50px;
  }
  .image-container {
    margin: 0;
    padding: 0;
    width: 100%;
    position: relative;
    overflow: hidden;
    padding-top: calc(1/2*100%);
  }
  .image {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .time {
    font-size: 13px;
    color: #999;
  }

  .blog-home {
    width:100%;
    padding-top: 20px;
  }
</style>
