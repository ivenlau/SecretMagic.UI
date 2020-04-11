<template>
  <div class="container">
    <el-row type="flex" justify="center">
      <el-col :span="18">
        <el-row v-if="blog.imgUrl">
          <el-col>
            <el-image :src="blog.imgUrl" />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <div>
              <div style="text-align:center">
                <h1 style="font-size:1.8em;font-family:'Cormorant',serif;font-weight:600">{{ blog.title }}</h1>
                <div style="font-size:13px">
                  <i class="el-icon-user">{{ blog.userName }}</i> |
                  <i class="el-icon-date">{{ blog.date ? $d(new Date(blog.date), 'long') : '' }}</i> |
                  <i class="el-icon-s-comment"> 0 {{ $t('detail.comment') }}</i>
                </div>
              </div>
              <div class="ql-snow">
                <div class="ql-editor">
                  <div v-html="blog.content" />
                </div>
              </div>
              {{ $t('detail.post') }} <el-tag type="info" size="small">{{ blog.categoryName }}</el-tag>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="margin-top:20px;display:flex;justify-content:space-between">
              <el-link :disabled="!blog.previous" @click="goPrevious"><i class="el-icon-arrow-left" />{{ $t('detail.previous') }}</el-link>
              <el-link :disabled="!blog.next" @click="goNext">{{ $t('detail.next') }}<i class="el-icon-arrow-right" /></el-link>
            </div>
          </el-col>
        </el-row>
        <el-divider />
        <h3>{{ $t('detail.reply') }}</h3>
        <el-form ref="comments" :model="comments" :rules="rules" label-width="100px" label-position="top">
          <el-form-item :label="$t('detail.comments')" prop="content">
            <el-input v-model="comments.content" type="textarea" class="content" :autosize="{ minRows: 5}" />
          </el-form-item>
          <el-form-item :label="$t('detail.name')" prop="name">
            <el-input v-model="comments.name" class="name" />
          </el-form-item>
          <el-form-item>
            <el-button @click="submitForm('comments')">{{ $t('detail.submit') }}</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getBlog } from '@/api/blog'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'highlight.js/styles/atom-one-dark.css'

export default {
  data() {
    return {
      blog: {},
      comments: {
        name: '',
        content: ''
      },
      rules: {
        content: [
          { required: true, message: 'Please input your comments', trigger: 'blur' },
          { min: 3, max: 500, message: 'Your comments is too short', trigger: 'blur' }
        ],
        name: [
          { required: true, message: 'Please input your name', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    const params = this.$route.params
    if (params.id) {
      this.loadData(params.id)
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$refs[formName].resetFields()
          this.$message({
            message: 'This feature is not open!',
            type: 'warning'
          })
        } else {
          return false
        }
      })
    },
    goPrevious() {
      this.loadData(this.blog.previous)
    },
    goNext() {
      this.loadData(this.blog.next)
    },
    loadData(id) {
      getBlog(id).then(data => {
        this.blog = data.data
      })
    }
  }
}
</script>

<style scoped>
  .container{
    width: 100%;
    text-align: left;
    padding-top: 20px;
  }
  .content{
    width: 450px;
  }
  .name{
    width: 150px;
  }
</style>
