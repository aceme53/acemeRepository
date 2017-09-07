<template>
  <div class="myApp">
    <myAppHeader></myAppHeader>
    <div class="myApp-container">
      <myAppAside></myAppAside>
      <myAppCenter></myAppCenter>
      <div class="clear"></div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
  import myAppHeader from '@/components/testPage/myAppHeader'
  import myAppAside from '@/components/testPage/myAppAside'
  import myAppCenter from '@/components/testPage/myAppCenter'
  export default {
    name: 'myApp',
    components: {
      "myAppHeader": myAppHeader,
      "myAppAside": myAppAside,
      "myAppCenter": myAppCenter
    },
    data () {
      return {}
    },
    mounted: function () {
      let $w = $(window);
      let reHeight = function () {
        let $l = $('.myAppAside');
        let $r = $('.myAppCenter');
        let $h = $('.myAppHeader');
        let Max = Math.max($l.height(), $r.height(), ($w.height() - $h.height()));
        $r.css("min-height", Max);
        $l.css("min-height", Max);
      };
      $w.scroll(reHeight);
      reHeight();
    }
  }
</script>
<style>
  .myApp {
    min-height: 100%;
    background-color: lightcyan;
  }
  .myApp-container {
    min-height: 90%;
  }
  .myAppHeader {
    background-color: lightblue; height: 10%; min-height: 60px; float: left; width: 100%;
  }
  .myAppAside {
    background-color: lightcoral; float: left; width: 15%; min-height: 90%;
  }
  .myAppCenter {
    background-color: lightskyblue; float: left; width: 85%; min-height: 90%;
  }
  .clear {
    clear: both;
  }
  .clear:after {
    content: '  ';
  }
  h2 { margin: 0; padding-top: 5px; }
</style>
