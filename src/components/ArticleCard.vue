<template>
  <el-row :gutter="10">
    <el-col v-for="blog in blogs" :key="blog.id" :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
      <el-card :body-style="{ padding: '0px' }" shadow="never">
        <div class="image-container">
          <img :src="blog.imgUrl" class="image">
        </div>
        <div class="summary">
          <div type="text" class="title" @click="onClick(blog.id)">{{ blog.title }}</div>
          <div class="info">
            <span class="info-time">{{ $d(new Date(blog.date), 'short') }} {{ blog.userName }}</span>
            <el-tag type="info" size="mini">{{ blog.categoryName }}</el-tag>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'ArticleCard',
  components: { },
  props: {
    blogs: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onClick(id) {
      this.$emit('click', id)
    }
  }
}
</script>

<style scoped>
.card-container {
  margin:20px;
  display: flex;
  flex-direction:column;
}
.image-container {
  margin: 0;
  padding: 0;
  width: 100%;
  position: relative;
  overflow: hidden;
  padding-top: calc(9/16*100%);
}
.image {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.summary {
  display: flex;
  flex-direction: column;
}
.title {
  margin:10px;
  font-family:'Work Sans', sans-serif;
  cursor: pointer;
  text-align: left;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  font-family:'Work Sans', sans-serif;
  color: #999;
}
.info-time {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
