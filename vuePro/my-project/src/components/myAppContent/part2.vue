<template>
  <div class="part1">
    <div class="myAppAside">
      <el-row>
        <el-col :span="24">
          <el-menu mode="vertical" default-active="1" theme="dark" @select="handleSelect">
            <el-menu-item-group title="分组一">
              <el-menu-item index="Hello"><i class="el-icon-message"></i>Hello</el-menu-item>
              <el-menu-item index="HelloWorld"><i class="el-icon-message"></i>HelloWorld</el-menu-item>
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
      global.refreshHeight();
    }
  }
</script>
<style>
</style>
