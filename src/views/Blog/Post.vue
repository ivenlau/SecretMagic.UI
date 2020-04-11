<template>
  <div ref="blogsMain" class="container">
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <template v-for="(item,index) in blogs">
          <div :key="index">
            <el-row v-if="item.imgUrl">
              <el-col>
                <el-image :src="item.imgUrl" />
              </el-col>
            </el-row>
            <el-row>
              <el-col>
                <div>
                  <h1>
                    <el-link
                      style="font-size:20px;font-family:'Cormorant',serif;font-weight:600"
                      :underline="false"
                      @click="viewEvent(item.id)"
                    >
                      {{ item.title }}
                    </el-link>
                  </h1>
                  <div style="font-size:13px">
                    <i class="el-icon-user"> {{ item.userName }}</i> |
                    <i class="el-icon-date"> {{ $d(new Date(item.date), 'long') }}</i> |
                    <i class="el-icon-s-comment"> 0 comments</i>
                  </div>
                  <p v-html="item.content" />
                  Posted in <el-tag type="info" size="small">{{ item.categoryName }}</el-tag>
                </div>
              </el-col>
            </el-row>
            <el-divider />
          </div>
        </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBlogs } from '@/api/blog'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  components: {
  },
  data() {
    return {
      category: '',
      query: '',
      blogs: [],
      loading: false,
      current: 1,
      end: false
    }
  },
  computed: {
    disabled() {
      return this.loading
    }
  },
  watch: {
    '$route'() {
      this.category = ''
      this.query = ''
      this.blogs = []
      this.loading = false
      this.current = 1
      this.end = false
      const params = this.$route.params
      if (params.category) {
        this.category = params.category
      }
      if (params.query) {
        this.query = params.query
      }
      this.loadData()
    }
  },
  created() {
    const params = this.$route.params
    if (params.category) {
      this.category = params.category
    }
    if (params.query) {
      this.query = params.query
    }
    this.loadData()
    window.addEventListener('scroll', this.loadMore)
  },
  methods: {
    onSubmit() {
      this.blog.active = true
      this.postBlog(this.blog)
      this.$router.push('/admin/list')
    },
    viewEvent(id) {
      this.$router.push({ name: 'Detail', params: { id: id }})
    },
    loadMore() {
      if (this.$refs.blogsMain) {
        var distance = this.$refs.blogsMain.getBoundingClientRect().bottom - window.innerHeight
        if (distance < 100) {
          this.loadData()
        }
      }
    },
    loadData() {
      if (!this.loading && !this.end) {
        this.loading = true
        getBlogs({
          index: this.current,
          size: 2,
          query: this.query,
          category: this.category
        }).then(data => {
          const loaded = data.data
          if (loaded.length > 0) {
            loaded.forEach(l => {
              this.blogs.push(l)
            })
            this.loading = false
            this.current = this.current + 1
          } else {
            this.end = true
          }
        })
      }
    }
  }
}
</script>

<style scoped>
  .container{
    width: 100%;
    text-align: left;
    padding-top: 20px;
    overflow: auto;
  }
</style>
