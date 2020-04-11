<template>
  <div>
    <el-table v-loading="loading" :data="blogs">
      <el-table-column prop="title" :label="$t('admin.list.title')" width="300" />
      <el-table-column prop="userName" :label="$t('admin.list.author')" width="120" />
      <el-table-column prop="categoryName" :label="$t('admin.list.category')" width="120" />
      <el-table-column
        :label="$t('admin.list.status')"
        width="120"
      >
        <template slot-scope="scope">
          {{ getStatus(scope.row.active) }}
        </template>
      </el-table-column>
      <el-table-column :label="$t('admin.list.date')" width="250">
        <template slot-scope="scope">
          {{ $d(new Date(scope.row.date), 'long') }}
        </template>
      </el-table-column>
      <el-table-column align="right">
        <template slot="header">
          <el-button
            type="success"
            size="medium"
            icon="el-icon-circle-plus-outline"
            @click="addBlogEvent"
          >{{ $t('admin.list.add') }}</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="editBlogEvent(scope.row)"
          >{{ $t('admin.list.edit') }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteBlogEvent(scope.row.id)"
          >{{ $t('admin.list.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="prev, pager, next"
      :total="total"
      :page-size.sync="size"
      :current-page.sync="current"
      @current-change="pageChange"
    />
  </div>
</template>

<script>
import { getCount, getDetailBlogs, deleteBlog } from '@/api/blog'

export default {
  data() {
    return {
      loading: false,
      blogs: [],
      total: 0,
      size: 8,
      current: 1
    }
  },
  computed: {
    getStatus: function(status) {
      return function(status) {
        return status ? 'Posted' : 'In Draft'
      }
    }
  },
  created() {
    getCount().then(data => {
      this.total = data.data
    })
    this.loadData(1)
  },
  methods: {
    editBlogEvent(current) {
      this.$router.push({ name: 'BlogNew', params: current })
    },
    deleteBlogEvent(id) {
      deleteBlog(id).then(() => {
        this.total--
        this.loadData(this.current)
      })
    },
    addBlogEvent(id) {
    },
    pageChange(pageNo) {
      this.loadData(pageNo)
    },
    loadData(pageNo) {
      this.loading = true
      getDetailBlogs({
        index: pageNo,
        size: this.size,
        query: '',
        category: ''
      }).then(data => {
        this.blogs = data.data
        this.loading = false
      })
    }
  }
}
</script>
