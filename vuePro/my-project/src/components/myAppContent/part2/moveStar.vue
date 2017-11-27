<template>
  <div class="moveStar">
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    mounted: function () {
      let getRandom = function (x) {
        return x > 1 ? (Math.ceil(x * Math.random())) : (x * Math.random())
      };
      let makeStar = function () {
        let $moveStar = $('.moveStar');
        let $hearH = $('.myAppHeader').height();
        let $leftW = $('.myAppAside').width();
        let $winH = $(window).height();
        let $winW = $(window).width();
        $moveStar.height($winH - $hearH);
        let div, static_starId, size;
        if (!document.getElementsByClassName('static-star').length) {
          for (let i = 0; i < getRandom(2000); i++) {
            //添加静态星星
            div = document.createElement('div');
            static_starId = new Date().getTime();
            size = getRandom(2);
            div.setAttribute('id', static_starId);
            div.setAttribute('class', 'static-star');
            div.setAttribute('style',
              'left:' + getRandom($(window).width() - 100) + 'px;' +
              'top:' + getRandom(document.body.scrollHeight) + 'px;'
            );
            $moveStar.append(div);
          }
        }
        setTimeout(function () {
          //添加流星
          let move_starId = new Date().getTime();
          let div = document.createElement('div');
          div.setAttribute('id', move_starId + '');
          div.setAttribute('class', 'move-star');
          $moveStar.append(div);
          let $move_star = $('#' + move_starId);
          let $move_starTop = getRandom(($winH - $hearH) / 2);
          let $move_starLeft = getRandom($winW - $leftW);
          let moveLength = Math.abs(getRandom($winH - $hearH - $move_star.height()));
          let flashTime = getRandom(2000);
          $move_star.length && ($move_star[0].style.cssText =
            'width: 2px; height: 2px;' +
            'top: ' + $move_starTop + 'px;' +
            'left: ' + $move_starLeft + 'px;' +
            'transform: rotate(-45deg);');
          $move_star.animate({
            opacity: '+=' + getRandom(1),
            left: '-=' + (moveLength / 3),
            top: '+=' + (moveLength / 3)
          }, flashTime, function () {
            $move_star.fadeOut();
            //$move_star.remove();
          });
          makeStar();
        }, getRandom(2000));
      };
      makeStar();
    }
  }
</script>

<style>
  .moveStar {
    background-color: #000;
    background-image: linear-gradient(to right bottom, rgba(26, 15, 72, 0.2) 40%, rgba(62, 43, 120, 0.1) 50%, rgba(26, 12, 84, 0.2) 60%),
    radial-gradient(rgba(150, 0, 0, 0.1) 20%, rgba(100, 0, 0, 0.1) 30%, rgba(33, 100, 19, 0.1) 50%, #000 100%);
    height: 100%;
    overflow: hidden;
  }

  .static-star {
    border-radius: 40%;
    opacity: .3;
    width: 1px;
    height: 1px;
    background-color: #fff;
    position: fixed;
    box-shadow: none;
    border: 1px solid transparent;
    animation: flash 2s infinite;
    animation-direction: alternate;
  }

  @keyframes flash {
    from {
      opacity: .1;
      box-shadow: none;
    }
    to {
      opacity: .6;
      box-shadow: 0 0 5px 1px rgba(255, 255, 255, .3);
    }

  }

  .move-star {
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    opacity: 0;
    box-shadow: 0 0 1px 1px rgba(255, 255, 255, .3);
  }

  .move-star:after {
    content: '    ';
    display: block;
    top: 0;
    left: 4px;
    border-width: 1px 0 2px 200px;
    border-style: solid;
    border-color: transparent transparent transparent rgba(111, 111, 111, .2);
  }

</style>
