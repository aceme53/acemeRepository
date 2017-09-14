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
    background: rgba(69, 127, 202, 0.2); /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, rgba(86, 145, 200, 0.2), rgba(69, 127, 202, 0.2)); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, rgba(86, 145, 200, 0.2), rgba(69, 127, 202, 0.2)); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }
  .myApp-container { min-height: 90%; }
  .m-h-60 { min-height: 60px; }
  .myAppHeader { background-color: rgb(1, 124, 206); color: #FFF; float: left; width: 100%; position: fixed; z-index: 5; }
  .myAppHeader .el-menu, .myAppHeader .el-submenu__title { background-color: transparent; color: white; }
  .myAppHeader .el-menu:hover, .myAppHeader .el-submenu__title:hover { background-color: transparent; color: white; }
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
