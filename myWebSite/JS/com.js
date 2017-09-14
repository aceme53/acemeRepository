'use strict';
/*
 * 私有方法
 */
var _F = {
    lastColor: 'white',
    /**
     * 取随机数颜色
     * @returns {string}
     */
    randomColor: function () {
        return 'rgba(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255)
            + ',' + Math.round(Math.random() * 255) + ',' + Math.random().toFixed(1) + ')';
    },
    /**
     * 初始化样式特效
     */
    selfCardCss: function () {
        var randomColor = _F.randomColor();
        $('.leftCard').css({
            'box-shadow': ('0 0 5px white, 0 0 15px ' + _F.lastColor + ',0 0 25px ' + randomColor)
        });
        _F.lastColor = randomColor;
    },
    /**
     * 折叠左侧标签
     */
    foldLeftCard: function () {
        var $et = $(event.target);
        if ($et.hasClass('open')) {
            //收起方法
            $et.removeClass('open').addClass('fold').siblings().fadeOut();
        } else {
            //展开方法
            $et.removeClass('fold').addClass('open').siblings().fadeIn();
        }
    },
    /**
     * 获取字符串在页面中所占的宽度
     */
    getTextWidth: function (text) {
        var thisDiv = document.getElementById('computeTextWidth');
        if (thisDiv === null) {
            thisDiv = document.createElement('div');
            thisDiv.setAttribute('style', 'position:absolute;visibility:hidden;');
            thisDiv.setAttribute('id', 'computeTextWidth');
            document.body.appendChild(thisDiv);
        }
        thisDiv.innerHTML = text;
        return {w: thisDiv.offsetWidth, h: thisDiv.offsetHeight};
    },
    /**
     *  圆形进度条canvas画布部分
     */
    canvasLabelArr: ['HTML', 'CSS', 'JS'],
    canvasRateArr: [],//记载最终比例数组
    canvasRateFinishedArr: [],//记录绘制过的比例数组
    drawCircle: function (type) {
        for (var i = 0; i < _F.canvasLabelArr.length; i++) {
            var ctx = document.getElementById(_F.canvasLabelArr[i] + 'Canvas').getContext('2d');
            if (!type) {
                //初始化 背景圆
                _F.canvasRateArr.push(parseInt(document.getElementById(_F.canvasLabelArr[i] + 'Canvas').innerHTML));
                _F.canvasRateFinishedArr.push(0);
                ctx.beginPath();
                ctx.arc(50, 50, 45, 0, 2 * Math.PI);
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.font = "16px Verdana";
                ctx.fillStyle = 'white';
                ctx.fillText('0', 45, 55);
                ctx.closePath();
            } else {
                //进度条
                if (_F.canvasRateFinishedArr[i] === _F.canvasRateArr[i]) continue;
                ++_F.canvasRateFinishedArr[i];
                ctx.beginPath();
                ctx.clearRect(30, 30, 50, 40);
                ctx.arc(50, 50, 45, 0, (2 * Math.PI) * (_F.canvasRateFinishedArr[i] / 100));
                ctx.strokeStyle = 'gray';
                ctx.lineWidth = 5;
                ctx.shadowBlur = 1;
                ctx.shadowColor = "white";
                ctx.save();
                ctx.stroke();
                ctx.font = "16px Verdana";
                ctx.fillStyle = 'white';
                ctx.shadowBlur = 2;
                ctx.shadowColor = "black";
                ctx.fillText(_F.canvasRateFinishedArr[i] + '%', 35, 55);
                ctx.restore();
                ctx.save();
                ctx.closePath();
                if (_F.canvasRateArr.toString() === _F.canvasRateFinishedArr.toString()) {
                    clearInterval(_F.canvasInterval);
                }
            }
        }
        if (!_F.canvasInterval) {
            _F.canvasInterval = setInterval(function () {
                _F.drawCircle('progress');
            }, 50);
        }
    },
    /**
     *  work条形统计图
     */
    drawWork: function () {
        var myChart = echarts.init(document.getElementById("main"));
        var legendData = document.getElementById("legendData").value;
        var xAxisData = document.getElementById("xAxisData").value.split('@@');
        var xDataArr = [];
        xAxisData.forEach(function (obj) {
            xDataArr.push(new Date(obj.split('（')[1].split('）')[0] + '/01').getTime());
        });
        var yAxisData = [], tempTime;
        for (var i = 0; i < xDataArr.length; i++) {
            if (i === xDataArr.length - 1) {
                tempTime = (new Date().getTime() - xDataArr[i]) / 1000 / 60 / 60 / 24 / 365;
            } else {
                tempTime = (xDataArr[i + 1] - xDataArr[i]) / 1000 / 60 / 60 / 24 / 365;
            }
            tempTime = parseInt(tempTime) === tempTime ? tempTime : tempTime.toFixed(2);
            yAxisData.push(tempTime);
        }
        // var yAxisData = document.getElementById("yAxisData").value.split('@@');
        var axisName = document.getElementById("axisName").value.split('@@');
        var option = {
            title: {},
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: [legendData],
                textStyle: {color: 'white'}
            },
            toolbox: {
                show: true,
                feature: {
                    mark: {show: true},
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            calculable: true,
            xAxis: [
                {
                    name: axisName[0],
                    type: 'category',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: ['white']
                        }
                    },
                    data: xAxisData,
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                }
            ],
            yAxis: [
                {
                    name: axisName[1],
                    type: 'value',
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: ['white']
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: 'white'
                        }
                    }
                }
            ],
            series: [
                {
                    name: legendData,
                    type: 'bar',
                    data: yAxisData,
                    markLine: {
                        silent: true,
                        precision: 2,
                        label: {
                            normal: {
                                position: 'end',
                                formatter: function (params) {
                                    return params.name + '：' + params.value + '年';
                                }
                            }
                        },
                        data: [
                            {type: 'average', name: '平均值'}
                        ],
                        lineStyle: {
                            normal: {
                                color: ["white"]
                            }
                        }
                    },
                    markPoint: {
                        symbol: 'pin',
                        //'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow' [ default: 'pin' ]
                        symbolSize: function (value, params) {
                            return _F.getTextWidth(params.value + '年').w + 30;
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 1,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(45, 50, 240, 0.1)' // 0% 处的颜色
                                    }, {
                                        offset: 0.5, color: 'rgba(45, 0, 240, 0.6)' // 50% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                },
                                borderColor: ['rgba(255,255,255,0.2)'],
                                borderWidth: 1
                                // shadowColor: 'rgba(45, 0, 240,1)',
                                // shadowOffsetX: 0,
                                // shadowOffsetY: 0,
                                // shadowBlur: 3
                            }
                        },
                        label: {
                            normal: {
                                position: 'inside',
                                formatter: function (params) {
                                    return params.value + '年';
                                }
                            }
                        },
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'},
                            {type: 'average', name: '平均值'}
                        ]
                    },
                    itemStyle: {
                        normal: {
                            barBorderRadius: [15, 15, 0, 0],
                            label: {
                                show: false,
                                position: 'innerinsideTop'
                            }
                        }
                    },
                    color: ['rgba(45, 0, 240, 0.5)']
                }
            ]
        };
        myChart.setOption(option);
    },
    /**
     * 回到顶部功能
     */
    moveArr: [],
    speed: 10,
    returnTop: function () {
        _F.RTtimer = setInterval(function () {
            _F.moveArr.push(document.body.scrollTop - _F.speed);
            if (_F.moveArr[_F.moveArr.length - 1] === _F.moveArr[_F.moveArr.length - 2]) {
                _F.moveArr = [];
                clearInterval(_F.RTtimer);
            } else {
                window.scrollTo(0, document.body.scrollTop - _F.speed);
            }
            setTimeout(function () {
                clearInterval(_F.RTtimer);
            }, 10000);
        }, 1);
    },
    /**
     * 流星
     */
    getRandom: function (x) {
        return x > 1 ? (Math.ceil(x * Math.random())) : (x * Math.random())
    },
    makeStar: function () {
        var $body = $('body'), div, static_starId, size;
        if (!document.getElementsByClassName('static-star').length) {
            for (var i = 0; i < _F.getRandom(2000); i++) {
                div = document.createElement('div');
                static_starId = new Date().getTime();
                size = _F.getRandom(2);
                div.setAttribute('id', static_starId);
                div.setAttribute('class', 'static-star');
                div.setAttribute('style',
                    'left:' + _F.getRandom($(window).width() - 100) + 'px;' +
                    'top:' + _F.getRandom(document.body.scrollHeight) + 'px;'
                );
                $body.append(div);
            }
        }
        setTimeout(function () {
            var move_starId = new Date().getTime();
            var div = document.createElement('div');
            div.setAttribute('id', move_starId + '');
            div.setAttribute('class', 'move-star');
            $body.append(div);
            var $move_star = $('#' + move_starId);
            var $move_starTop = _F.getRandom(300);
            var $move_starLeft = _F.getRandom(1000);
            var moveLength = document.body.scrollHeight;
            $move_star.length && ($move_star[0].style.cssText =
                'width: ' + _F.getRandom(5) + 'px;' +
                'height: ' + _F.getRandom(5) + 'px;' +
                'top: ' + $move_starTop + 'px;' +
                'left: ' + $move_starLeft + 'px;' +
                'transform: rotate(-45deg);');
            $move_star.animate({
                left: '-=' + (moveLength / Math.sqrt(2)),
                top: '+=' + (moveLength / Math.sqrt(2))
            }, 1000, function () {
                $move_star.fadeOut();
                $move_star.remove();
            });
            _F.makeStar();
        }, _F.getRandom(2000));
    },
    /**
     * console特效
     */
    consoleEffect: function () {
        console.log("%cMade by Ace.Me", "text-shadow: 0 1px 0 #ccc,0 2px 0 #c9c9c9,0 3px 0 #bbb," +
            "0 4px 0 #b9b9b9,0 5px 0 #aaa,0 6px 1px rgba(0,0,0,.1),0 0 5px rgba(0,0,0,.1)," +
            "0 1px 3px rgba(0,0,0,.3),0 3px 5px rgba(0,0,0,.2),0 5px 10px rgba(0,0,0,.25)," +
            "0 10px 10px rgba(0,0,0,.2),0 20px 20px rgba(0,0,0,.15);font-size:5em");
    }
};
/**
 * 部分样式特效
 */
$(document).ready(function () {
    _F.consoleEffect();
    _F.selfCardCss();
    _F.selfCardInterval = setInterval(function () {
        _F.selfCardCss();
    }, 3000);
    _F.drawCircle();
    _F.drawWork();
    _F.makeStar();
    if (document.body.scrollTop) {
        $('.returnTopCard').fadeIn();
        $('.headerCard').hide();
    }
    $(function () {
        $('.interest ul li').mouseover(function () {
            $(this).stop(true).animate({width: '50%'}, 1000).siblings().stop(true).animate({width: '100px'}, 1000);
        });
    });
    $(document).scroll(function () {
        if (document.body.scrollTop) {
            $('.returnTopCard').fadeIn();
            $('.headerCard').hide();
        } else {
            $('.returnTopCard').fadeOut();
            $('.headerCard').show();
        }
    });
    $(document).mousemove(function (e) {
        if (e.clientY < 5) {
            $('.headerCard').show();
        } else if (e.clientY > 85 && document.body.scrollTop) {
            $('.headerCard').hide();
        }
    });
});