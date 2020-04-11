<template>
  <div>
    <el-table :data="roles">
      <!-- <el-table-column prop="name" label="Role Name" width="120" /> -->
      <el-table-column
        :label="$t('admin.role.roleName')"
        width="150"
      >
        <template slot-scope="scope">
          <el-input
            v-if="scope.$index === role.index"
            v-model="roles[scope.$index].name"
            @change="updateRoleName"
            @blur="disableRoleEdit"
          />
          <el-button
            v-else
            type="text"
            @click="enableRoleEdit(scope.$index)"
          >
            {{ scope.row.name }}
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('admin.role.permissions')"
      >
        <template slot-scope="scope">
          <template v-for="(item,index) in roles[scope.$index].resources">
            <el-tooltip :key="index" class="item" effect="light" :content="item.description" placement="top">
              <el-tag
                :key="item.id"
                type="info"
                closable
                size="medium"
                style="margin:5px"
                @close="deletePermissionEvent(roles[scope.$index].id, item.id)"
              >
                {{ item.name }}
              </el-tag>
            </el-tooltip>
          </template>
          <el-dropdown size="small" @command="addPermissionEvent">
            <span class="el-dropdown-link" style="margin:5px">
              <el-button size="mini" type="info" icon="el-icon-plus" circle />
            </span>
            <el-dropdown-menu slot="dropdown">
              <template v-for="(item,index) in filterResources(scope.$index)">
                <el-dropdown-item :key="index" :command="{roleId: roles[scope.$index].id, resourceId: item.id}">{{ item.name }}</el-dropdown-item>
              </template>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <el-table-column width="100" align="right">
        <template slot="header">
          <!-- Here is the Add button origin position -->
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="deleteRoleEvent(scope.row.id)"
          >{{ $t('admin.role.delete') }}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- The el-popover with input cannot work well in table column header, put it as absolute to mock it in the table header-->
    <div style="text-align:right;position:absolute;right:38px;top:90px">
      <el-popover
        v-model="showNewRole"
        placement="left"
        :title="$t('admin.role.newRole')"
        width="200"
      >
        <el-input v-model="newRole" size="mini" />
        <div style="text-align: center; margin:10px">
          <el-button size="mini" type="text" @click="handlerNewRoleCancel">{{ $t('admin.role.cancel') }}</el-button>
          <el-button size="mini" type="primary" @click="addRoleEvent">{{ $t('admin.role.ok') }}</el-button>
        </div>
        <el-button
          slot="reference"
          type="success"
          size="medium"
          icon="el-icon-circle-plus-outline"
        >
          {{ $t('admin.role.add') }}
        </el-button>
      </el-popover>
    </div>
  </div>
</template>

<script>
// import { getAllRoles } from '@/api/role'
import {
  getAllRoles,
  getAllResources,
  addRole, deleteRole,
  addPermission,
  deletePermission } from '@/api/role'

export default {
  data() {
    return {
      roles: [],
      resources: [],
      selectedResources: [],
      role: {
        index: -1,
        id: '',
        name: ''
      },
      newRole: '',
      showNewRole: false,
      isCollapse: false
    }
  },
  computed: {
    isEdit: function(index) {
      return function() {
        return index === this.editIndex
      }
    },
    filterResources: function(index) {
      return function(index) {
        const filterR = []
        const currentR = this.roles[index].resources
        this.resources.forEach(r => {
          let contains = false
          currentR.forEach(c => {
            if (c.id === r.id) {
              contains = true
            }
          })
          if (!contains) {
            filterR.push(r)
          }
        })
        return filterR
      }
    }
  },
  created() {
    getAllRoles().then(data => {
      this.roles = data.data
    })
    getAllResources().then(data => {
      this.resources = data.data
    })
  },
  methods: {
    addRoleEvent() {
      if (this.newRole !== '') {
        addRole({ name: this.newRole }).then(() => {
          getAllRoles().then(data => {
            this.roles = data.data
          })
          this.newRole = ''
        })
      }
      this.newRole = ''
      this.showNewRole = false
    },
    deleteRoleEvent(id) {
      if (id) {
        deleteRole(id).then(() => {
          getAllRoles().then(data => {
            this.roles = data.data
          })
        })
      }
    },
    addPermissionEvent(cmd) {
      addPermission(cmd).then(() => {
        getAllRoles().then(data => {
          this.roles = data.data
        })
        this.newRole = ''
      })
    },
    deletePermissionEvent(roleId, resourceId) {
      deletePermission({ roleId: roleId, resourceId: resourceId }).then(() => {
        getAllRoles().then(data => {
          this.roles = data.data
        })
      })
    },
    enableRoleEdit(index) {
      const currentRole = this.roles[index]
      this.role.index = index
      this.role.id = currentRole.id
      this.role.name = currentRole.name
    },
    disableRoleEdit() {
      this.role.index = -1
      this.role.id = ''
      this.role.name = ''
    },
    updateRoleName(value) {
      if (value === '') {
        this.roles[this.role.index].name = this.role.name
      } else {
        console.log(this.roles[this.role.index].id, value)
      }
    },
    handlerNewRoleCancel() {
      this.newRole = ''
      this.showNewRole = false
    }
  }
}
</script>
