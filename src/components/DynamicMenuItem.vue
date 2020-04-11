<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <el-submenu v-if="hasSub(item)" :index="item.path">
        <template slot="title">
          <span slot="title">{{ item.label }}</span>
        </template>
        <DynamicMenuItem :list="item.subItems" />
      </el-submenu>
      <el-menu-item v-else :index="item.path">{{ item.label }}</el-menu-item>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicMenuItem',
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    hasSub: function(item) {
      if (item.subItems) {
        if (item.subItems.length > 0) { return true }
      }
      return false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
