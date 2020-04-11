<template>
  <div>
    <el-table v-loading="loading" :data="users">
      <el-table-column prop="name" :label="$t('admin.user.name')" width="120" />
      <el-table-column prop="role" :label="$t('admin.user.role')" width="120" />
      <el-table-column prop="email" :label="$t('admin.user.email')" />
      <el-table-column align="right">
        <template slot="header">
          <el-button
            type="success"
            size="medium"
            icon="el-icon-circle-plus-outline"
            @click="openAddDialog"
          >{{ $t('admin.user.add') }}</el-button>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="openEditDialog(scope.$index, scope.row)"
          >{{ $t('admin.user.edit') }}</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="deleteUserEvent(scope.row.id)"
          >{{ $t('admin.user.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogTitle" center :visible.sync="userFormVisible">
      <el-form ref="userForm" :model="user" status-icon :rules="rules">
        <el-form-item :label="$t('admin.user.name')" prop="name" label-width="150px">
          <el-input v-model="user.name" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('admin.user.email')" label-width="150px">
          <el-input v-model="user.email" autocomplete="off" />
        </el-form-item>
        <el-form-item v-if="isDialogForNew" :label="$t('admin.user.password')" prop="password" label-width="150px">
          <el-input v-model="user.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item :label="$t('admin.user.role')" label-width="150px" prop="roleId">
          <el-select v-model="user.roleId" :placeholder="$t('admin.user.selectRole')">
            <template v-for="(item, index) in roles">
              <el-option :key="index" :label="item.name" :value="item.id" />
            </template>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleDialogCancel">{{ $t('admin.user.cancel') }}</el-button>
        <el-button type="primary" @click="handleDialogOK">{{ $t('admin.user.ok') }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getAllUsers, addUser, updateUser, deleteUser } from '@/api/user'
import { getAllRoles } from '@/api/role'

export default {
  data() {
    return {
      loading: false,
      users: [],
      roles: [],
      user: {},
      userFormVisible: false,
      isCollapse: false,
      isDialogForNew: true,
      rules: {
        name: [{ required: true, message: 'User cannot be empty', trigger: 'blur' }],
        password: [{ required: true, message: 'Password cannot be empty', trigger: 'blur' }],
        roleId: [{ required: true, message: 'Role is required for new user', trigger: 'blur' }]
      }
    }
  },
  computed: {
    dialogTitle: function() {
      return this.isDialogForNew ? this.$t('admin.user.addUser') : this.$t('admin.user.editUser')
    }
  },
  created() {
    this.loading = true
    getAllUsers().then(data => {
      this.users = data.data
      this.loading = false
    }).catch(err => {
      console.log(err)
    })
    getAllRoles().then(data => {
      this.roles = data.data
    })
  },
  methods: {
    openAddDialog() {
      this.user = {}
      this.isDialogForNew = true
      this.userFormVisible = true
    },
    openEditDialog(index, row) {
      this.user = row
      this.isDialogForNew = false
      this.userFormVisible = true
    },
    deleteUserEvent(id) {
      this.loading = true
      deleteUser(id).then(() => {
        this.$message({
          message: 'Delete Success!',
          type: 'success'
        })
        this.loading = false
        getAllUsers().then(data => {
          this.users = data.data
        })
      })
    },
    handleDialogOK() {
      this.$refs['userForm'].validate((valid) => {
        if (valid) {
          const postUser = {
            name: this.user.name,
            password: this.user.password,
            email: this.user.email,
            id: this.user.id,
            roleId: this.user.roleId
          }
          this.loading = true
          if (this.isDialogForNew) {
            addUser(postUser).then(() => {
              this.$message({
                message: 'Add Success!',
                type: 'success'
              })
              getAllUsers().then(data => {
                this.users = data.data
                this.loading = false
              })
            })
          } else {
            updateUser(postUser).then(() => {
              this.$message({
                message: 'Update Success!',
                type: 'success'
              })
              getAllUsers().then(data => {
                this.users = data.data
                this.loading = false
              })
            })
          }
          this.userFormVisible = false
        }
      })
    },
    handleDialogCancel() {
      if (this.isDialogForNew) {
        this.$refs['userForm'].resetFields()
      }
      this.userFormVisible = false
    }
  }
}
</script>
