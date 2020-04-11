<template>
  <div style="text-align:left">
    <el-row>
      <el-col :span="24">
        <el-row :gutter="10">
          <el-col :span="12">
            <el-input v-model="blog.title" :placeholder="$t('admin.new.title')" />
          </el-col>
          <el-col :span="4">
            <el-select v-model="blog.categoryId" :placeholder="$t('admin.new.category')">
              <template v-for="(item, index) in categories">
                <el-option :key="index" :label="item.name" :value="item.id" />
              </template>
            </el-select>
          </el-col>
          <el-col :span="5">
            <el-checkbox v-model="isAutoSave" @change="autoSave">{{ this.$t('admin.new.autoSave') }}</el-checkbox>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-upload
              class="upload-demo"
              action=""
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              multiple
              :limit="1"
              :on-exceed="handleExceed"
              :file-list="fileList"
              :http-request="uploadImage"
              list-type="picture"
              accept="image/png, image/jpeg, image/gif"
              style="margin-top: 8px; margin-left: 5px"
            >
              <el-button size="mini" type="text">{{ this.$t('admin.new.subjectImg') }}</el-button>
            </el-upload>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <Editor v-model="blog.content" />
          </el-col>
        </el-row>
        <el-row type="flex" justify="left">
          <el-col :span="24">
            <div style="text-align:left">
              <el-button type="primary" @click="onSubmit">{{ this.$t('admin.new.post') }}</el-button>
              <el-button @click="onSave">{{ this.$t('admin.new.save') }}</el-button>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Editor from '@/components/Editor.vue'
import { getAllCatetories, addBlog, updateBlog } from '@/api/blog'
import OssClient from '@/utils/client'

export default {
  components: {
    Editor
  },
  data() {
    return {
      blog: {
        title: '',
        categoryId: '',
        content: '',
        active: false
      },
      isAutoSave: false,
      categories: [],
      intervalId: undefined,
      cache: '',
      fileList: []
    }
  },
  created() {
    getAllCatetories().then(data => {
      this.categories = data.data
      if (this.blog.categoryId === '' && this.categories) {
        this.categories.forEach(c => {
          if (c.name === 'Default') {
            this.blog.categoryId = c.id
          }
        })
      }
    })
  },
  mounted() {
    const blogInfo = this.$route.params
    if (blogInfo.id) {
      this.blog = blogInfo
    }
    if (blogInfo.imgUrl) {
      const regex = /[0-9]+_/
      let fileName = blogInfo.imgUrl.replace(process.env.VUE_APP_REDIRECT_PREFIX, '')
      fileName = fileName.replace(regex, '')
      this.fileList = [{
        name: fileName,
        url: blogInfo.imgUrl
      }]
    }
  },
  methods: {
    onSubmit() {
      this.blog.active = true
      this.postBlog(this.blog)
      this.$router.push('/admin/list')
    },
    onSave() {
      this.postBlog(this.blog)
      this.$router.push('/admin/list')
    },
    autoSave() {
      if (this.isAutoSave) {
        const that = this
        this.intervalId = setInterval(function() {
          if (that.blog.content !== that.cache) {
            that.postBlog(that.blog)
            that.cache = that.blog.content
          }
        }, 60000)
      } else {
        clearInterval(this.intervalId)
      }
    },
    postBlog(blog) {
      if (blog.id) {
        updateBlog(blog).then(data => {
          this.$message({
            message: 'Save Success!',
            type: 'success'
          })
        })
      } else {
        this.blog.userId = this.$store.state.profile.user.id
        addBlog(blog).then(data => {
          this.blog.id = data.data.id
          this.$message({
            message: 'Create Success!',
            type: 'success'
          })
        })
      }
    },
    uploadImage(option) {
      const file = option.file
      const date = new Date().getTime()
      const fullName = `${date}_${file.name}`
      const client = new OssClient()
      client.uploadFile(fullName, file, {
        progress: async function(p) {
          const e = {}
          e.percent = p * 100
          option.onProgress(e)
        }
      }).then(data => {
        const imgUrl = process.env.VUE_APP_REDIRECT_PREFIX + fullName
        this.fileList = [{
          name: file.name,
          url: imgUrl
        }]
        this.blog.imgUrl = imgUrl
      }).catch(err => {
        console.log(err)
      })
    },
    handleExceed() {
      this.$message({
        message: 'Only one subject image can be added!',
        type: 'warning'
      })
    },
    handleRemove() {
      this.blog.imgUrl = ''
      this.fileList = []
    },
    handlePreview() {
      console.log('s')
    }
  }
}
</script>
