<template>
  <el-container ref="adminContainer" style="border: 1px solid #eee;">
    <el-aside :width="asideWidth" class="el-aside">
      <el-menu
        :collapse="isCollapse"
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <DynamicMenuItem :list="this.$store.state.sideBar" />
      </el-menu>
    </el-aside>

    <el-container>
      <el-header>
        <el-row>
          <el-col :span="12">
            <div class="bread-crumb">
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: $route.path }">{{ $route.name }}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="text-align: right; font-size: 12px">
              <el-dropdown @command="handleCommand">
                <i class="el-icon-setting" style="margin-right: 15px" />
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="setting">{{ $t('admin.banner.changePwd') }}</el-dropdown-item>
                  <el-dropdown-item command="logout">{{ $t('admin.banner.logout') }}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <span>{{ this.$store.getters.userName }}</span>
            </div>
          </el-col>
        </el-row>

      </el-header>

      <el-main>
        <router-view />
      </el-main>
      <el-footer height="20">
        <el-row type="flex" justify="center" align="center">
          <el-col :span="12"><span class="footer-content">Copyright 2020 SecretMagic. All Rights Reserved</span></el-col>
        </el-row>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Cookies from 'js-cookie'
import DynamicMenuItem from '@/components/DynamicMenuItem.vue'

export default {
  components: {
    DynamicMenuItem
  },
  data() {
    return {
      isCollapse: false,
      clientHeight: ''
    }
  },
  computed: {
    asideWidth: function() {
      return this.isCollapse ? '200px' : '200px'
    }
  },
  watch: {
    clientHeight: function() {
      this.changeFixed(this.clientHeight)
    }
  },
  mounted() {
    this.clientHeight = `${document.documentElement.clientHeight}`
    const that = this
    window.onresize = function temp() {
      const previousHeight = this.clientHeight
      this.clientHeight = `${document.documentElement.clientHeight}`
      if (previousHeight !== this.clientHeight) {
        that.$refs.adminContainer.$el.style.height = this.clientHeight + 'px'
      }
    }
  },
  methods: {
    handerCollapse() {
      this.isCollapse = !this.isCollapse
    },
    handleCommand(command) {
      if (command === 'logout') {
        Cookies.remove('profile')
        this.$store.dispatch('saveProfile', {})
        this.$router.push('/login')
      }
    },
    handleOpen() {

    },
    handleClose() {

    },
    changeFixed(clientHeight) {
      this.$refs.adminContainer.$el.style.height = clientHeight + 'px'
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: rgb(238, 241, 246);
    color: #333;
    line-height: 60px;
  }
  .el-footer {
    background-color: rgb(238, 241, 246);
    height: 30px;
  }
  .footer-content {
    line-height: 30px;
    min-height: 100px;
  }
  .el-aside {
    background-color: rgb(238, 241, 246)
  }

  .bread-crumb{
    height: 60px;
    display:flex;
    align-items:center;
  }
</style>
