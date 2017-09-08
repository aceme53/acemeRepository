<template>
  <div class="myAppHeader m-h-60">
    <el-row>
      <el-col>
        <el-menu :default-active="activeIndex2" mode="horizontal" @select="handleSelect">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
        </el-menu>
        <el-button type="danger" class="logout m-a-a" @click="logout('loginForm')">退出登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  export default {
    components: {ElButton},
    name: 'myAppHeader',
    data () {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      logout: function () {
        this.$router.push({path: '/'});
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
<style>
  .logout {
    top: 10px;
    right: 10px;
    position: absolute;
  }
</style>
