<template>
  <div class="part1">
    <div class="myAppAside">
      <el-row>
        <el-col :span="24">
          <el-menu mode="vertical" default-active="1" theme="dark" @select="handleSelect">
            <el-menu-item-group title="分组一">
              <el-menu-item index="moveStar"><i class="el-icon-message"></i>moveStar</el-menu-item>
              <el-menu-item index="canvasClock"><i class="el-icon-message"></i>canvasClock</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组二">
            </el-menu-item-group>
          </el-menu>
        </el-col>
      </el-row>
      <div class="clear"></div>
    </div>
    <div class="myAppCenter">
      <router-view></router-view>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'part1',
    methods: {
      handleSelect(key, keyPath) {
        if (key === "0") return;
        this.$router.push({path: '/index/part2/' + key});
      }
    },
    mounted: function () {
      (typeof (global.refreshHeight) === 'function') && global.refreshHeight();
    }
  }
</script>
<style>
</style>
