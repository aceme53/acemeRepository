<template>
  <div class="part1">
    <div class="myAppAside">
      <el-row>
        <el-col :span="24">
          <el-menu mode="vertical" default-active="1" theme="dark" @select="handleSelect">
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航一</template>
              <el-menu-item-group>
                <template slot="title">分组一</template>
                <el-menu-item index="Hello"><i class="el-icon-message"></i>Hello</el-menu-item>
                <el-menu-item index="HelloWorld"><i class="el-icon-message"></i>HelloWorld</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
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
        this.$router.push({path: '/index/part1/' + key});
      }
    },
    mounted: function () {
      (typeof (global.refreshHeight) === 'function') && global.refreshHeight();
    }
  }
</script>
<style>
</style>
