<template>
  <div style="text-align:left">
    <el-tabs type="border-card">
      <el-tab-pane :label="$t('setting.general')">
        <el-form ref="generalForm" label-width="100px">
          <el-form-item :label="$t('setting.siteName')">
            <el-input v-model="setting.name" />
          </el-form-item>
          <el-form-item :label="$t('setting.siteTitle')">
            <el-input v-model="setting.title" />
          </el-form-item>
          <el-form-item :label="$t('setting.subject')">
            <el-input v-model="setting.subject" />
          </el-form-item>
          <el-form-item :label="$t('setting.description')">
            <el-input v-model="setting.description" type="textarea" />
          </el-form-item>
          <el-form-item :label="$t('setting.language')">
            <el-select v-model="setting.language" :placeholder="$t('setting.language')">
              <el-option :label="$t('setting.chinese')" :value="0" />
              <el-option :label="$t('setting.english')" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('setting.color')">
            <el-select v-model="setting.color" :placeholder="$t('setting.color')">
              <el-option :label="$t('setting.light')" :value="0" />
              <el-option :label="$t('setting.dark')" :value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="saveBasicSetting">{{ $t('setting.save') }}</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane :label="$t('setting.home')">
        <div style="width:100%;">
          <el-row :gutter="10" style="margin:10px">
            <el-col :span="4">
              <el-select v-model="banner" disabled>
                <el-option :label="$t('setting.banner')" value="0" />
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-select v-model="uiSettings.banner.category" :placeholder="$t('setting.category')">
                <template v-for="item in categories">
                  <el-option :key="item.id" :label="item.name" :value="item.id" />
                </template>
              </el-select>
            </el-col>
            <el-col :span="4">
              <el-input-number v-model="uiSettings.banner.count" :min="1" :max="6" label="Count" />
            </el-col>
          </el-row>
          <template v-for="(item, index) in uiSettings.modules">
            <el-row :key="index" :gutter="10" style="margin:10px">
              <el-col :span="4">
                <el-select v-model="item.displayType" :placeholder="$t('setting.displayType')">
                  <el-option :label="$t('setting.image')" value="0" />
                  <el-option :label="$t('setting.article')" value="1" />
                  <el-option :label="$t('setting.display')" value="2" />
                  <el-option :label="$t('setting.detail')" value="3" />
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-select v-model="item.category" :placeholder="$t('setting.category')">
                  <template v-for="cate in categories">
                    <el-option :key="cate.id" :label="cate.name" :value="cate.id" />
                  </template>
                </el-select>
              </el-col>
              <el-col :span="12">
                <el-input-number v-model="item.count" :min="1" :max="12" label="Count" />
                <el-button type="danger" style="margin-left:10px" size="small" @click="deleteUiSetting(index)">{{ $t('setting.delete') }}</el-button>
              </el-col>
            </el-row>
          </template>
          <el-row type="flex" justify="left">
            <el-col :span="24">
              <div style="text-align:left">
                <el-button type="primary" @click="saveUiSetting">{{ $t('setting.save') }}</el-button>
                <el-button type="success" @click="addUiSetting">{{ $t('setting.add') }}</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getSetting, updateBasicSetting, updateUiSetting } from '@/api/setting'
import { getAllCatetories } from '@/api/blog'
import i18n from '@/lang/index'
export default {
  data() {
    return {
      setting: {},
      categories: [],
      uiSettings: {
        banner: {
        },
        modules: []
      },
      banner: '0'
    }
  },
  mounted() {
    getAllCatetories().then(data => {
      this.categories = data.data
    })
    getSetting().then(data => {
      if (data.data !== '') {
        this.setting = data.data
        if (this.setting.uiSetting) {
          this.uiSettings = JSON.parse(this.setting.uiSetting)
        }
      }
    })
  },
  methods: {
    saveBasicSetting() {
      updateBasicSetting(this.setting).then(data => {
        this.$message({
          message: 'Save Success!',
          type: 'success'
        })
        i18n.locale = this.setting.language === 0 ? 'zh' : 'en'
      })
    },
    addUiSetting() {
      this.uiSettings.modules.push({})
    },
    deleteUiSetting(index) {
      this.uiSettings.modules.splice(index, 1)
    },
    saveUiSetting() {
      this.setting.uiSetting = JSON.stringify(this.uiSettings)
      updateUiSetting(this.setting).then(data => {
        this.$message({
          message: 'Save Success!',
          type: 'success'
        })
      })
    }
  }
}
</script>
