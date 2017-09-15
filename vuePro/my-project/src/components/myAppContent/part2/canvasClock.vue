<style scoped>
  canvas {
    margin: auto auto;
  }
</style>
<template>
  <div class="HelloWorld">
    <canvas id="myCanvas" height="500" width="500"></canvas>
    <div class="clear"></div>
  </div>
</template>
<script>
  export default {
    name: 'myAppContent',
    mounted: function () {
      var drawClock = function () {
        if (document.getElementById('myCanvas') === null) return;
        var cxt = document.getElementById('myCanvas').getContext('2d');
        var i, thisLength, pi = Math.PI;
        var circle = {
          x: 250,
          y: 250,
          r: 200
        };
        var now = new Date();
        var thisHours, hours = now.getHours();
        var minutes = now.getMinutes();
        var seconds = now.getSeconds();
        var milliseconds = now.getMilliseconds();
        var timeText = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() +
          '  ' + hours + ':' + minutes + ':' + seconds + ',' + milliseconds;
        cxt.translate(circle.x, circle.y);
        cxt.save();
        //画圆，表盘
        cxt.beginPath();
        cxt.lineWidth = '10';
        cxt.strokeStyle = 'white';
        cxt.shadowBlur = '10';
        cxt.shadowColor = 'cornflowerblue';
        cxt.arc(0, 0, circle.r, 0, 2 * pi, 1);
        cxt.stroke();
        var grad = cxt.createLinearGradient(250, 0, 250, 300);
        grad.addColorStop(0, 'rgb(80,80,80)');
        grad.addColorStop(0.5, 'rgb(40,40,40)');
        grad.addColorStop(1, 'rgb(20,20,20)');
        cxt.fillStyle = grad;
        cxt.fill();
        cxt.restore();
        cxt.save();
        //画超小刻度
        cxt.beginPath();
        thisLength = circle.r - 10;
        cxt.lineWidth = '1';
        cxt.strokeStyle = '#fff';
        cxt.shadowBlur = '1';
        cxt.shadowColor = 'black';
        for (i = 0; i < 60; i++) {
          cxt.rotate(pi / 30);
          cxt.moveTo(thisLength, 0);
          cxt.lineTo(circle.r, 0);
        }
        cxt.stroke();
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画小刻度
        cxt.beginPath();
        cxt.lineWidth = '3';
        cxt.strokeStyle = '#fff';
        cxt.shadowBlur = '2';
        cxt.shadowColor = 'black';
        thisLength = circle.r - 10;
        for (i = 0; i < 12; i++) {
          cxt.rotate(pi / 6);
          cxt.moveTo(thisLength, 0);
          cxt.lineTo(circle.r, 0);
        }
        cxt.stroke();
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画大刻度
        cxt.beginPath();
        cxt.lineWidth = '5';
        cxt.strokeStyle = '#fff';
        cxt.shadowBlur = '3';
        cxt.shadowColor = 'black';
        thisLength = circle.r - 20;
        for (i = 0; i < 4; i++) {
          cxt.rotate(pi / 2);
          cxt.moveTo(thisLength, 0);
          cxt.lineTo(circle.r, 0);
        }
        cxt.stroke();
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画数字
        cxt.beginPath();
        thisLength = circle.r - 30;
        cxt.font = "20px Georgia";
        cxt.fillStyle = '#fff';
        cxt.shadowBlur = '5';
        cxt.shadowColor = 'black';
        for (i = 1; i <= 12; i++) {
          //1,2 在四象限
          cxt.fillText(i, thisLength * Math.cos(pi / 6 + (2 - i) * pi / 6) - 6,
            thisLength * Math.sin(-pi / 6 - (2 - i) * pi / 6) + 3);
        }
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画秒钟
        thisLength = circle.r - 10;
        cxt.beginPath();
        cxt.lineWidth = '1';
        cxt.strokeStyle = 'red';
        cxt.shadowBlur = '5';
        cxt.shadowColor = 'black';
        cxt.rotate((milliseconds / 1000) * (pi / 30));
        cxt.moveTo(0, 0);
        //1,2,3...13,14 在四象限
        cxt.lineTo(thisLength * Math.cos(pi / 30 + (14 - seconds) * pi / 30),
          thisLength * Math.sin(-pi / 30 - (14 - seconds) * pi / 30));
        cxt.stroke();
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画分钟
        thisLength = circle.r - 20;
        cxt.beginPath();
        cxt.lineWidth = '2';
        cxt.strokeStyle = '#fff';
        cxt.shadowBlur = '3';
        cxt.shadowColor = 'black';
        cxt.rotate((seconds / 60) * (pi / 30));
        cxt.moveTo(0, 0);
        //1,2,3...13,14 在四象限
        cxt.lineTo(thisLength * Math.cos(pi / 30 + (14 - minutes) * pi / 30),
          thisLength * Math.sin(-pi / 30 - (14 - minutes) * pi / 30));
        cxt.stroke();
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画时钟
        thisLength = circle.r - 100;
        cxt.beginPath();
        cxt.lineWidth = '3';
        cxt.strokeStyle = '#fff';
        cxt.shadowBlur = '3';
        cxt.shadowColor = 'black';
        cxt.rotate((minutes / 60) * (pi / 6));
        cxt.moveTo(0, 0);
        thisHours = hours % 12;
        cxt.lineTo(thisLength * Math.cos(pi / 6 + (2 - thisHours) * pi / 6),
          thisLength * Math.sin(-pi / 6 - (2 - thisHours) * pi / 6));
        cxt.stroke();
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //圆心
        cxt.fillStyle = 'orange';
        cxt.font = "50px Georgia";
        cxt.shadowColor = 'black';
        cxt.shadowBlur = '10';
        cxt.fillText('.', -7, 3);
        cxt.restore();
        cxt.save();
        cxt.closePath();
        //画数据时钟
        cxt.beginPath();
        thisLength = circle.r + 40;
        cxt.font = "30px Georgia";
        cxt.fillStyle = 'white';
        cxt.fillText(timeText, -thisLength + 80, thisLength);
        //刷新
        cxt.translate(-circle.x, -circle.y);
        window.time1 = setTimeout(function () {
          cxt.clearRect(0, 0, 500, 500);
          drawClock();
        }, 1);
      };
      drawClock();
      $('#myCanvas').click(function () {
        if (!window.stopClock) {
          clearTimeout(time1);
          window.stopClock = true;
        } else {
          window.time1 = setTimeout(function () {
            drawClock();
          }, 1);
          window.stopClock = false;
        }
      })
    }
  }
</script>
