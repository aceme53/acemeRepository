<template>
  <div class="myApp">
    <myAppHeader></myAppHeader>
    <div class="myApp-container">
      <myAppContent></myAppContent>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  import myAppHeader from '@/components/myAppHeader'
  import myAppContent from '@/components/myAppContent'
  export default {
    name: 'myApp',
    components: {
      "myAppHeader": myAppHeader,
      "myAppContent": myAppContent
    },
    data () {
      return {}
    },
    mounted: function () {
      let $w = $(window);
      global.refreshHeight = function () {
        let $w = $(window);
        let $l = $($('.myAppAside .el-menu').get(0));
        let $r = $('.myAppCenter');
        let $h = $('.myAppHeader');
        let minHeight = $w.height() - $h.height();
        $r.css("min-height", minHeight);
        $l.css({
          "height": minHeight,
          "overflow-y": "auto"
        });
      };
      $w.scroll(global.refreshHeight);
      $w.resize(global.refreshHeight);
      global.refreshHeight();
    }
  }
</script>
<style>
  .myApp {
    min-height: 100%;
    background: url("../images/aceme.jpg") center center no-repeat;
    background-size: 100% 100%;
  }
  .myApp-container { min-height: 90%; }
  .m-h-60 { min-height: 60px; }
  .myAppHeader { background-color: rgb(1, 124, 206); color: #FFF; float: left; width: 100%; position: fixed; z-index: 5; }
  .myAppHeader .el-menu, .myAppHeader .el-submenu__title,
  .myAppHeader .header-menu-item, .myAppHeader .header-menu-item:hover { background-color: transparent !important; color: white !important; }
  .el-menu--horizontal .el-submenu > .el-menu { background-color: #FFF !important; }
  .myAppAside { float: left; width: 15%; min-height: 90%; position: fixed; top: 60px; z-index: 5; }
  .myAppCenter { background-color: rgb(237, 255, 239); float: right; width: 85%; min-height: 90%; }
  .myAppContent { float: left; width: 100%; min-height: 90%; margin-top: 60px; }
  .myAppAside .el-menu-item, .myAppAside .el-submenu__title,
  .myAppAside .el-menu-item-group__title { text-align: left; }
  .clear { clear: both; }
  .clear:after { content: '  '; }
  h2 { margin: 0; padding-top: 5px; }
</style>
