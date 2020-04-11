<template>
  <div style="text-align:left">
    <el-card class="box-card" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{ $t('admin.category.categories') }}</span>
        <el-popover
          v-model="showNewCategory"
          placement="bottom"
          :title="$t('admin.category.addCategory')"
          width="200"
        >
          <el-input v-model="category" size="mini" />
          <div style="text-align: center; margin:10px">
            <el-button size="mini" type="text" @click="cancelEvent">{{ $t('admin.category.cancel') }}</el-button>
            <el-button size="mini" type="primary" @click="okEvent">{{ $t('admin.category.ok') }}</el-button>
          </div>
          <el-button
            slot="reference"
            type="text"
            size="medium"
            style="float: right; padding: 3px 0"
          >
            {{ $t('admin.category.add') }}
          </el-button>
        </el-popover>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">Add</el-button> -->
      </div>
      <div v-for="item in categories" :key="item.id" style="text-align:left">
        <el-tag
          :key="item.id"
          type="info"
          closable
          size="medium"
          style="margin:5px"
          @close="deleteEvent(item.id)"
        >
          {{ item.name }}
        </el-tag>
      </div>
    </el-card>
  </div>
</template>

<script>

import { getAllCatetories, addCategory, deleteCategory } from '@/api/blog'

export default {
  data() {
    return {
      categories: [],
      category: '',
      showNewCategory: false
    }
  },
  created() {
    getAllCatetories().then(data => {
      this.categories = data.data
    })
  },
  methods: {
    okEvent() {
      addCategory({
        name: this.category
      }).then(() => {
        getAllCatetories().then(data => {
          this.categories = data.data
        })
      })
      this.category = ''
      this.showNewCategory = false
    },
    cancelEvent() {
      this.category = ''
      this.showNewCategory = false
    },
    deleteEvent(id) {
      deleteCategory(id).then(() => {
        getAllCatetories().then(data => {
          this.categories = data.data
        })
      })
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
}
</style>
