<template>
  <div class="moveStar">
    <div class="clear"></div>
  </div>
</template>

<script>
  export default {
    name: 'hello',
    mounted: function () {
      var $moveStar = $('.moveStar');
      var $hearH = $('.myAppHeader').height();
      var getRandom = function (x) {
        return x > 1 ? (Math.ceil(x * Math.random())) : (x * Math.random())
      };
      var makeStar = function () {
        $moveStar.height($(window).height() - $hearH);
        var div, static_starId, size;
        if (!document.getElementsByClassName('static-star').length) {
          for (var i = 0; i < getRandom(2000); i++) {
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
          var move_starId = new Date().getTime();
          var div = document.createElement('div');
          div.setAttribute('id', move_starId + '');
          div.setAttribute('class', 'move-star');
          $moveStar.append(div);
          var $move_star = $('#' + move_starId);
          var $move_starTop = getRandom(300);
          var $move_starLeft = getRandom(1000);
          var moveLength = $moveStar.height();
          $move_star.length && ($move_star[0].style.cssText =
            'width: ' + getRandom(5) + 'px;' +
            'height: ' + getRandom(5) + 'px;' +
            'top: ' + $move_starTop + 'px;' +
            'left: ' + $move_starLeft + 'px;' +
            'transform: rotate(-45deg);');
          $move_star.animate({
            left: '-=' + (moveLength / 3),
            top: '+=' + (moveLength / 3)
          }, 500, function () {
            $move_star.fadeOut();
            $move_star.remove();
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
    height: 100%;
  }
  .static-star {
    border-radius: 40%;
    opacity: .4;
    width: 1px;
    height: 1px;
    background-color: #fff;
    position: fixed;
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, .3);
    border: 1px solid transparent;
    animation: flash 2s infinite;
    animation-direction: alternate;
  }
  @keyframes flash {
    from {
      opacity: .1;
      box-shadow: 0 0 5px 5px rgba(255, 255, 255, .3);
    }
    to {
      opacity: .4;
      box-shadow: 0 0 20px 5px rgba(255, 255, 255, .3);
    }

  }
  .move-star {
    border-radius: 50%;
    background-color: #fff;
    position: relative;
    box-shadow: 0 0 3px 3px rgba(255, 255, 255, .3);
  }
  .move-star:after {
    content: '    ';
    display: block;
    top: 0;
    left: 4px;
    border-width: 2px 0 2px 200px;
    border-style: solid;
    border-color: transparent transparent transparent rgba(255, 255, 255, .2);
  }

</style>
