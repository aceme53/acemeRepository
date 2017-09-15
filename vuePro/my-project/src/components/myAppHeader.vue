<template>
  <div class="myAppHeader m-h-60">
    <el-row>
      <el-col>
        <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
          <el-menu-item index="0" class="header-blank">米</el-menu-item>
          <el-menu-item index="" class="header-menu-item"><i class="el-icon-d-arrow-left"></i></el-menu-item>
          <el-submenu index="1" class="header-menu-item">
            <template slot="title">我的模块</template>
            <el-menu-item index="part1">模块一</el-menu-item>
            <el-menu-item index="part2">模块二</el-menu-item>
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
        activeIndex: '1'
      };
    },
    methods: {
      logout: function () {
        this.$router.push({path: '/'});
      },
      handleSelect(key, keyPath) {
        if (key === "0") return;
        this.$router.push({path: '/index/' + key});
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
    cursor: default !important;
    border: none !important;
    color: #ffffff !important;
    width: 15%;
    font-size: 30px;
    background: #56ccf2; /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #56ccf2, #2f80ed); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #56ccf2, #2f80ed); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
</style>
