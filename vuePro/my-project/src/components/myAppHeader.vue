<template>
  <div class="myAppHeader m-h-60">
    <el-row>
      <el-col>
        <el-menu :default-active="activeIndex2" mode="horizontal" @select="handleSelect">
          <el-menu-item class="header-blank">米</el-menu-item>
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
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
  .header-blank {
    width: 15%;
    font-size: xx-large;
    color: #ffffff;
    font-family: Arial, cursive;
    background: #56ccf2; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #56ccf2, #2f80ed); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #56ccf2, #2f80ed); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
