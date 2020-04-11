<template>
  <el-container class="home-container">
    <el-backtop />
    <el-header style="height:150px">
      <el-row type="flex" justify="center">
        <el-col :span="8" :offset="8">
          <span class="site">
            <el-row>
              <el-col><h1 class="site-title">{{ this.$store.getters.siteName }}</h1>
                <span class="site-descript">{{ this.$store.getters.siteTitle }}</span>
              </el-col>
            </el-row>
          </span>
        </el-col>
        <el-col :span="8">
          <el-input
            v-model="query"
            style="width:50%;margin-top:15px;"
            :placeholder="$t('blog.search')"
            @keyup.enter.native="goQuery(query)"
          >
            <i slot="prefix" class="el-input__icon el-icon-search" />
          </el-input>
        </el-col>
      </el-row>
      <el-row type="flex" class="row-bg" justify="center">
        <el-col :span="6">
          <el-menu :default-active="$route.path" mode="horizontal" router class="home-navigate">
            <el-menu-item index="/">{{ $t('blog.home') }}</el-menu-item>
            <el-menu-item index="/post">{{ $t('blog.posted') }}</el-menu-item>
            <el-submenu index="3">
              <template slot="title">{{ $t('blog.category') }}</template>
              <template v-for="item in categories">
                <el-menu-item :key="item.id" @click="goCategory(item.id)">{{ item.name }}</el-menu-item>
              </template>
            </el-submenu>
            <el-menu-item index="/about">{{ $t('blog.about') }}</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="content-main">
      <el-container>
        <router-view />
      </el-container>
    </el-main>
    <el-footer class="footer">
      <el-row type="flex" justify="center" align="center">
        <el-col :span="12"><span class="footer-content">Copyright 2020 SecretMagic. All Rights Reserved</span></el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import { getAllCatetories } from '@/api/blog'

export default {
  name: 'Home',
  components: {

  },
  data() {
    return {
      categories: [],
      query: ''
    }
  },
  created() {
    if (this.$store.getters.siteName === '') {
      this.$store.dispatch('setSiteSetting')
    }
    getAllCatetories().then(data => {
      this.categories = data.data
    })
  },
  methods: {
    goCategory(id) {
      let sameRoute = false
      const currentRoute = this.$router.currentRoute
      if (currentRoute) {
        if (currentRoute.name === 'Category') {
          if (currentRoute.params) {
            if (currentRoute.params.category === id) {
              sameRoute = true
            }
          }
        }
      }
      if (!sameRoute) {
        this.$router.push({ name: 'Category', params: { category: id }})
      }
    },
    goQuery(query) {
      let sameRoute = false
      const currentRoute = this.$router.currentRoute
      if (currentRoute) {
        if (currentRoute.name === 'Query') {
          if (currentRoute.params) {
            if (currentRoute.params.query === query) {
              sameRoute = true
            }
          }
        }
      }
      if (!sameRoute) {
        this.query = ''
        this.$router.push({ name: 'Query', params: { query: query }})
      }
    }
  }
}
</script>

<style scoped>
  .site {
    margin:10px;
  }
  .site-title{
    font-size: 20;
    font-family: 'Cormorant', serif;
    font-weight: 500;
    line-height: 20px;
    margin-bottom: 5px;
    height: auto;
    font-size: 1.8em;
  }
  .site-descript{
    font-family: 'Cormorant', serif;
  }
  .home-navigate{
    background: #F4F7F6;
  }
  .footer {
    background: #000000;
  }
  .footer-content {
    line-height: 50px;
    min-height: 100px;
    color: #ffffff;
  }
  .home-container {
    background: #F4F7F6;
    overflow-y: auto;
  }
  .content-main{
    padding:0px;
  }
</style>
