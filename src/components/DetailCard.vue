<template>
  <el-row :gutter="10">
    <el-col v-for="blog in blogs" :key="blog.id" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
      <div ref="cardContainer" class="card-container">
        <div class="summary">
          <div class="image-container">
            <img
              :src="blog.imgUrl"
              class="image"
            >
          </div>
          <div class="info">
            <div class="info-author"><i class="el-icon-user" />{{ blog.userName }}</div>
            <div class="info-time"><i class="el-icon-date" />{{ $d(new Date(blog.date), 'short') }}</div>
          </div>
        </div>
        <div class="detail">
          <span class="title" @click="onClick(blog.id)">{{ blog.title }}</span>
          <span>{{ blog.content }}</span>
        </div>
      </div>
    </el-col>
  </el-row>
</template>
<script>

export default {
  name: 'DetailCard',
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
  flex-direction:row;
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
  flex: 1;
  display: flex;
  flex-direction: column;
}
.title {
  margin:10px;
  font-weight: 500;
  font-family:'Work Sans', sans-serif;
  color: black;
  cursor: pointer;
}
.info {
  display: flex;
  flex-direction: row;
  justify-content:flex-end;
  font-family:'Work Sans', sans-serif;
  color: #999;
}
.info-time {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-right: 5px;
}
.info-author {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-right: 5px;
}
.info-cate {
  margin-top: 0px;
  margin-bottom: 0px;
  margin-left: 5px;
  margin-right: 5px;
}
.detail {
  flex: 1;
  display: flex;
  flex-direction:column;
  justify-content:center;
  margin: 10px;
}
</style>
