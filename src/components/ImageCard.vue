<template>
  <el-row :gutter="10">
    <el-col v-for="blog in blogs" :key="blog.id" :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
      <div ref="cardContainer" class="card-container">
        <div class="image-container">
          <el-image
            :src="blog.imgUrl"
            :preview-src-list="[blog.imgUrl]"
            class="image"
            fit="cover"
          />
        </div>
        <div class="summary">
          <span class="title" @click="onClick(blog.id)">{{ blog.title }}</span>
          <div class="info">
            <div class="info-item">{{ $d(new Date(blog.date), 'short') }}</div>
            <div class="info-item">{{ blog.userName }}</div>
            <div class="info-item">{{ blog.categoryName }}</div>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'ImageCard',
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
  font-size: 1.5em;
  font-weight: 500;
  font-family:'Work Sans', sans-serif;
  color: black;
  cursor: pointer;
}
.info {
  display: flex;
  flex-direction: row;
  font-family:'Work Sans', sans-serif;
  color: #999;
}
.info-item {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
