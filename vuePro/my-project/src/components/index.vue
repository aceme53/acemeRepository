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
        let Max = Math.max($l.height(), $r.height(), ($w.height() - $h.height()));
        $r.css("min-height", Max);
        $l.css("min-height", Max);
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
  .m-h-60 {
    min-height: 60px;
  }
  .myAppHeader {
    background-color: rgba(173, 216, 230, 0.3); height: 10%; float: left; width: 100%;
  }
  .myAppAside { float: left; width: 15%; min-height: 90%; }
  .myAppCenter { float: right; width: 85%; min-height: 90%; }
  .myAppContent { float: left; width: 100%; min-height: 90%; }
  .myAppAside .el-menu-item, .myAppAside .el-submenu__title,
  .myAppAside .el-menu-item-group__title {
    text-align: left;
  }
  .clear {
    clear: both;
  }
  .clear:after {
    content: '  ';
  }
  h2 { margin: 0; padding-top: 5px; }
</style>
