//<meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7"/>
/**
 * 自动滚屏
 * @param direction 滚动方向
 * @param speed 滚动速度
 */
window.direction = 'down';//'up'
window.speed = 1;//px
window.moveArr = [];
window.timer = setInterval(function () {
    function getNextPositon() {
        var direction = window.direction.toLowerCase();
        switch (direction) {
            case 'down':
                return document.body.scrollTop + parseInt(speed);
            case 'up':
                return document.body.scrollTop - parseInt(speed);
        }
    }

    var currentPosition = getNextPositon();
    moveArr.push(currentPosition);
    if (direction == 'up' && currentPosition <= 0
        ||
        direction == 'down' && moveArr[moveArr.length - 1] == moveArr[moveArr.length - 2]) {
        delete direction;
        delete speed;
        delete moveArr;
        clearInterval(timer);
    } else {
        window.scrollTo(0, currentPosition);
    }
    setTimeout(function () {
        clearInterval(timer);
    }, 10000);
}, 1);
/***********************************************************************************************************/
/**
 * 利用a标签自动解析URL
 */
function parseURL(url) {
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function () {
            var ret = {},
                seg = a.search.replace(/^\?/, '').split('&'),
                len = seg.length, i = 0, s;
            for (; i < len; i++) {
                if (!seg[i]) {
                    continue;
                }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/')
    };
}
parseURL('http://www.baidu.com');
/***********************************************************************************************************/
/**
 * 禁止别人以iframe加载你的页面
 */
if (window.location != window.parent.location) window.parent.location = window.location;
/***********************************************************************************************************/
/**
 * 不声明第三个变量的值交换
 */
var a = 1, b = 2;
a = [b, b = a][0];
/***********************************************************************************************************/
/**
 * console冷知识
 */
// = 打印表格
var dataTable = [{'品名': '杜雷斯', '数量': 4}, {'品名': '冈本', '数量': 3}];
console.table(dataTable);
var _log = console.log;
console.log = function () {
    _log.call(console, '%c' + [].slice.call(arguments).join(' '), 'color:transparent;text-shadow:0 0 2px rgba(0,0,0,.5);');
};
// = 分组打印
console.group("第一组信息");
console.log("第一组第一条:我的XX(http://www.jb51.net)");
console.log("第一组第二条:xxx(http://jb51.net)");
console.groupEnd();
console.group("第二组信息");
console.log("第二组第一条:程序爱好者QQ群： 80535344");
console.log("第二组第二条:欢迎你加入");
console.groupEnd();
// = 断言打印
var year = 2014;
console.assert(year == 2018);
var result = 1;
console.log(result);
// = 追踪函数的调用轨迹
function add(a, b) {
    console.trace();
    return a + b;
}
var addTest = add3(1, 1);
function add3(a, b) {return add2(a, b);}
function add2(a, b) {return add1(a, b);}
function add1(a, b) {return add(a, b);}
// = 测试代码的运行时间
console.time("控制台计时器一");
for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
        console.log(i + j);
    }
}
console.timeEnd("控制台计时器一");
// = 性能分析
function funcA(count) {
    console.info('a', count);
    for (var i = 0; i < count; i++) {
    }
}
function funcB(count) {
    for (var i = 0; i < count; i++) {
        console.info('b', count);
    }
}
function All() {
    for (var i = 0; i < 10; i++) {
        funcA(100);
        funcB(100);
    }
}
console.profile('性能分析器');
All();
console.profileEnd();
/***********************************************************************************************************/
/**
 * 界面操作冷知识
 */
// = 将彻底屏蔽鼠标右键  <table border oncontextmenu=return(false)><td>no</table> 可用于 Table
oncontextmenu = "window.event.returnValue=false";
// = 取消选取、防止复制  <body onselectstart="return false" oncopy="return false;" oncut="return false;">
// = JS不允许粘贴   <body onpaste="return false">
// = IE 地址栏前换成自己的图标   收藏夹中显示出你的图标
// == <link rel="bookmark" type="image/x-icon" href="./img/tabLogo.png"/>
// == <link rel="shortcut icon" href="./img/tabLogo.png">
// == <link rel="icon" href="./img/tabLogo.png">
// = 关闭输入法 <input style="ime-mode:disabled">
// = 光标是停在文本框文字的最后
function cc() {
    var e = event.srcElement;
    var r = e.createTextRange();
    r.moveStart("character", e.value.length);
    r.collapse(true);
    r.select();
}
/***********************************************************************************************************/
/**
 * 网页可编辑
 */
document.body.contentEditable = 'true';
/***********************************************************************************************************/
/**
 * 显示桌面通知
 */
Notification.requestPermission(function () {
    new Notification("这是一条通知~！！！", {body: "你是个帅气的男人"}); // 显示通知
});
/***********************************************************************************************************/
/**
 * canvas鼠标事件
 */
function getMouseE(id) {
    var cav = document.getElementById(id);
    var ctx = cav.getContext('2d');
    var cPosition = cav.getBoundingClientRect();
    $(document).mousedown(function (e) {
        e = window.event || e;
        var mouseX = e.clientX - cPosition.left;//获取鼠标在canvsa中的坐标
        var mouseY = e.clientY - cPosition.top;
        var fontSize = 10;//todo
        ctx.font = fontSize + "px Verdana";
        ctx.fillText('*', mouseX - fontSize / 2, mouseY + fontSize / 2, 100);
    })
}
getMouseE('HTMLCanvas');
/**
 * 弹幕
 */
var DM = function () {
    this.getRandomColor = function () {
        return '#' +
            (function (color) {
                return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)])
                && (color.length == 6) ? color : arguments.callee(color);
            })('');
    };
    this.getRandomNum = function (n) {
        return Math.floor(n * Math.random());
    };
    var dom = document.createElement('div');
    document.body.appendChild(dom);
    var $dom = $(dom);
    $dom.text('测试测试' + window.cnt);
    $dom.css('cssText', 'position: fixed;z-index:9999;color:' + this.getRandomColor() + ';font-size:'
        + this.getRandomNum(45) + 'px;top: ' + ($(window).height() * Math.random()) + 'px;'
        + 'transition: color 1s ease-in-out 1s; right: -100px;min-width:150px;min-height:100px;');
    $dom.animate({right: '+=' + $(window).width() + 'px'}, 5000, 'linear', function () {
        $dom.remove();
    });
};
var interArr = (interArr && interArr.length) ? interArr : [];
interArr.push(setInterval(function () {
    window.cnt = window.cnt || 0;
    DM();
    console.info(window.cnt);
    if (window.cnt++ >= 15) {
        //重复执行会覆盖变量的值，导致之前的循环无法停止
        for (var i = 0; i < interArr.length; i++) {
            delete window.cnt;
            clearInterval(interArr[i]);
        }
    }
}, Math.random() * 2000));
/**
 * dom循环
 */
window.getComputedStyle(document.getElementsByTagName('div'));//获取css样式表中的样式
Array.prototype.forEach.call(document.getElementsByTagName('div'),
    function (dom) {
        console.info(dom);
    }
)
/**
 * 封装jq插件方法
 */
//$.extend({alertMsg:function(msg){alert(msg);}});   $.alertMsg('test');   ----------------  扩展 $ 属性
(function ($) {
    var methods = {
        defaults: {
            'background-color': '#dcefe3',
            'color': 'black'
        },
        tempObj: {},
        init: function (options) {
            // this
            methods.tempObj = {};
            var opts = $.extend(methods.tempObj, methods.defaults, options);//加入tempObj，防止defaults被污染
            var self = this;
            methods.show(self, opts);
        },
        show: function (self, opts) {
            // is
            self.each(function () {
                var $this = $(this);
                opts ? $this.css(opts) : $this.css(methods.defaults);
            });
        },
        hide: function () {
            // good
        },
        update: function (options) {
            // !!!
            methods.tempObj = {};
            var opts = $.extend(methods.tempObj, methods.defaults, options);//加入tempObj，防止defaults被污染
            this.each(function () {
                var $this = $(this);
                opts ? $this.css(opts) : $this.css(methods.defaults);
            });
        }
    };
    $.fn.turnStyle = function (method) {
        // 方法调用
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method' + method + 'does not exist on jQuery.tooltip');
        }
    };
})(jQuery);
//调用init方法
$('div').turnStyle();
$('i').turnStyle();
$('span').turnStyle();
$('a').turnStyle({'color': '', 'text-decoration': 'underline'});
//调用Update方法
$('p').turnStyle('update', {'font-weight': 'bold'});
console.clear();
//***********************************************************************************************************
/**
 * 复制到剪切板
 */
var Url2 = document.getElementById("biao1");
Url2.select(); // 选择对象
document.execCommand("Copy");
/***************************************************************************************************************/
/**
 * 阶乘
 */
function factorial(num) {
    if (num <= 1) {
        return 1;
    } else {
        return num * arguments.callee(num - 1);
    }
}
factorial(10);
/***************************************************************************************************************/
/**
 * 遍历构造多级树
 */
var GreateTree = function (rootid, pid, cid, childrenNodes, parentNodes) {
    window.count++;
    parentNodes = parentNodes || [];
    childrenNodes = childrenNodes || [];
    var newChildrenNodes = [];//每次遍历后剩下的没父节点的子节点
    var newParentNodes = [];//每次遍历后追加父节点
    if (!childrenNodes || !childrenNodes.length) {
        //没有子节点，全部组装完毕
        window.treeData = [];
        for (var x = 0; x < parentNodes.length; x++) {
            if (parentNodes[x][pid] == rootid) {
                window.treeData.push(parentNodes[x]);
            }
        }
        console.info(window.treeData);
        delete window.count;
        delete  window.treeData;
        return;
    }
    for (var i = 0; i < childrenNodes.length; i++) {
        //遍历子节点寻找父节点
        if (childrenNodes[i][pid] == -1) {
            //根节点
            obj = {};
            for (var pro in childrenNodes[i]) {
                if (childrenNodes[i].hasOwnProperty(pro)) obj[pro] = childrenNodes[i][pro];
            }
            obj.children = [];
            parentNodes.push(obj);//推送父节点数据
        } else {
            if (!parentNodes || !parentNodes.length) {
                //有父节点但是还没有生成父节点的子节点---进入下次循环遍历
                newChildrenNodes.push(childrenNodes[i]);
                continue;
            }
            var findParent = false;//是否找到父节点的标识
            for (var k = 0; k < parentNodes.length; k++) {
                if (childrenNodes[i][pid] == parentNodes[k][cid]) {
                    //在父节点的数组中循环寻找父节点，没有找到的根据标识进入下次循环遍历
                    obj = {};
                    for (var p in childrenNodes[i]) {
                        if (childrenNodes[i].hasOwnProperty(p)) obj[p] = childrenNodes[i][p];
                    }
                    obj.children = [];
                    parentNodes[k].children.push(obj);
                    //如果找到父节点，则该节点也可能有子节点---推入父节点的数组中
                    newParentNodes.push(parentNodes[k].children[parentNodes[k].children.length - 1]);
                    findParent = true;
                    break;
                }
            }
            if (!findParent) {
                //如果遍历之后没有找到父节点，则继续往下遍历
                newChildrenNodes.push(childrenNodes[i])
            }
        }
    }
    if (count < 20) GreateTree(rootid, pid, cid, newChildrenNodes, parentNodes.concat(newParentNodes));
};
window.count = 0;
var data = [
    {deptId: 0, deptName: '0', deptParentId: -1},
    {deptId: 1, deptName: '1', deptParentId: -1},
    {deptId: 2, deptName: '2', deptParentId: -1},
    {deptId: 3, deptName: '3', deptParentId: 4},
    {deptId: 4, deptName: '4', deptParentId: -1},
    {deptId: 5, deptName: '5', deptParentId: -1},
    {deptId: 6, deptName: '6', deptParentId: -1},
    {deptId: 7, deptName: '7', deptParentId: -1},
    {deptId: 8, deptName: '8', deptParentId: -1},
    {deptId: 9, deptName: '9', deptParentId: -1},
    {deptId: 10, deptName: '10', deptParentId: -1},
    {deptId: 11, deptName: '11', deptParentId: 1},
    {deptId: 12, deptName: '12', deptParentId: 11},
    {deptId: 13, deptName: '13', deptParentId: 12},
    {deptId: 14, deptName: '14', deptParentId: 4},
    {deptId: 15, deptName: '15', deptParentId: 4},
    {deptId: 16, deptName: '16', deptParentId: 4},
    {deptId: 17, deptName: '17', deptParentId: 4},
    {deptId: 18, deptName: '18', deptParentId: 10},
    {deptId: 19, deptName: '19', deptParentId: 15},
    {deptId: 20, deptName: '20', deptParentId: 19},
    {deptId: 21, deptName: '21', deptParentId: 20},
    {deptId: 22, deptName: '22', deptParentId: 21},
    {deptId: 23, deptName: '23', deptParentId: 22}
];
GreateTree(-1, 'deptParentId', 'deptId', data);
/***************************************************************************************************************/
/**
 * js中三种定义变量的方式const， var， let的区别。
 */
// = const定义的变量不可以修改，而且必须初始化。
const bb = 2;//正确
// const bb;//错误，必须初始化
console.log('函数外const定义bb：' + bb);//有输出值
// = var定义的变量可以修改，如果不初始化会输出undefined，不会报错。
// = let是块级作用域，函数内部使用let定义后，对函数外部无影响。
/*
 let c = 3;
 console.log('函数外let定义c：' + c);//输出c=3
 function change() {
 let c = 6;
 console.log('函数内let定义c：' + c);//输出c=6
 }
 change();
 console.log('函数调用后let定义c不受函数内部定义影响：' + c);//输出c=3
 */
/***************************************************************************************************************/
/**
 * 复制对象
 */
var x = {
    a: 1,
    b: 2,
    c: 3
};
$.extend({
    copyObj: function (obj) {
        var newObj = {};
        for (var o in obj) {
            if (obj.hasOwnProperty(o)) newObj[o] = obj[o];
        }
        return newObj;
    }
});
var y = $.extend($.copyObj(x), {a: 123, d: 4});//不会污染x
console.info('污染前 x:', x);
var z = $.extend(x, {c: 4});//赋值的同时污染了x的属性
console.info('污染后 x:', x);
console.info('y:', y);
console.info('z:', z);
/***************************************************************************************************************/
/**
 * 公共方法
 * Created by lijian_EC on 2017-6-19.
 */
var Utils = {
    timeFormat: function (str) {
        var year = str.substring(0, 4);
        var month = parseInt(str.substring(4, 6)) - 1;
        var day = str.substring(6, 8);
        return new Date(year, month, day);
    },
    /**
     * 格式化日期
     * @param date 日期
     * @param format 格式化样式,例如yyyy-MM-dd HH:mm:ss E
     * @return 格式化后的金额
     */
    formatDate: function (date, format) {
        var v = "";
        if (typeof date == "string" || typeof date != "object" || date == null) {
            return;
        }
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        var weekDay = date.getDay();
        var ms = date.getMilliseconds();
        var weekDayString = "";
        if (weekDay == 1) {
            weekDayString = "星期一";
        } else if (weekDay == 2) {
            weekDayString = "星期二";
        } else if (weekDay == 3) {
            weekDayString = "星期三";
        } else if (weekDay == 4) {
            weekDayString = "星期四";
        } else if (weekDay == 5) {
            weekDayString = "星期五";
        } else if (weekDay == 6) {
            weekDayString = "星期六";
        } else if (weekDay == 7) {
            weekDayString = "星期日";
        }
        v = format;
        //Year
        v = v.replace(/yyyy/g, year);
        v = v.replace(/YYYY/g, year);
        v = v.replace(/yy/g, (year + "").substring(2, 4));
        v = v.replace(/YY/g, (year + "").substring(2, 4));
        //Month
        var monthStr = ("0" + month);
        v = v.replace(/MM/g, monthStr.substring(monthStr.length - 2));
        //Day
        var dayStr = ("0" + day);
        v = v.replace(/dd/g, dayStr.substring(dayStr.length - 2));
        //hour
        var hourStr = ("0" + hour);
        v = v.replace(/HH/g, hourStr.substring(hourStr.length - 2));
        v = v.replace(/hh/g, hourStr.substring(hourStr.length - 2));
        //minute
        var minuteStr = ("0" + minute);
        v = v.replace(/mm/g, minuteStr.substring(minuteStr.length - 2));
        //Millisecond
        v = v.replace(/sss/g, ms);
        v = v.replace(/SSS/g, ms);
        //second
        var secondStr = ("0" + second);
        v = v.replace(/ss/g, secondStr.substring(secondStr.length - 2));
        v = v.replace(/SS/g, secondStr.substring(secondStr.length - 2));
        //weekDay
        v = v.replace(/E/g, weekDayString);
        return v;
    },
    /**
     * 数字转换为中文大写
     * @param money   110
     * @returns {*}  壹百壹拾
     */
    changeMoneyToChinese: function (money) {
        var cnNums = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"]; //汉字的数字
        var cnIntRadice = ["", "拾", "佰", "仟"]; //基本单位
        var cnIntUnits = ["", "万", "亿", "兆"]; //对应整数部分扩展单位
        var cnInteger = "整"; //整数金额时后面跟的字符
        var cnDec = "点"; //小数金额时后面跟的字符
        var maxNum = 999999999999999.99; //最大处理的数字
        var IntegerNum; //金额整数部分
        var DecimalNum; //金额小数部分
        var ChineseStr = ""; //输出的中文金额字符串
        var parts; //分离金额后用的数组，预定义
        var i, p, q, m, n;
        if (money == "") {
            return "";
        }
        money = parseFloat(money);
        //alert(money);
        if (money >= maxNum) {
            $.alert('超出最大处理数字');
            return "";
        }
        if (money == 0) {
            ChineseStr = cnNums[0] + cnInteger;
            //document.getElementById("show").value=ChineseStr;
            return ChineseStr;
        }
        money = money.toString(); //转换为字符串
        if (money.indexOf(".") == -1) {
            IntegerNum = money;
            DecimalNum = '';
        } else {
            parts = money.split(".");
            IntegerNum = parts[0];
            DecimalNum = parts[1].substr(0, 4);
        }
        if (parseInt(IntegerNum, 10) > 0) {//获取整型部分转换
            zeroCount = 0;
            IntLen = IntegerNum.length;
            for (i = 0; i < IntLen; i++) {
                n = IntegerNum.substr(i, 1);
                p = IntLen - i - 1;
                q = p / 4;
                m = p % 4;
                if (n == "0") {
                    zeroCount++;
                } else {
                    if (zeroCount > 0) {
                        ChineseStr += cnNums[0];
                    }
                    zeroCount = 0; //归零
                    ChineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                }
                if (m == 0 && zeroCount < 4) {
                    ChineseStr += cnIntUnits[q];
                }
            }
            //整型部分处理完毕
        }
        if (DecimalNum != '') {//小数部分
            ChineseStr += cnDec;
            decLen = DecimalNum.length;
            for (i = 0; i < decLen; i++) {
                n = DecimalNum.substr(i, 1);
                if (n != '0') {
                    ChineseStr += cnNums[Number(n)];
                }
            }
            if (i == 1) ChineseStr += cnNums[0];
        }
        if (ChineseStr == '') {
            ChineseStr += cnNums[0] + cnInteger;
        }
        else if (DecimalNum == '') {
            ChineseStr += cnInteger;
        }
        return ChineseStr;
    },
    /**
     * 表格实现列宽度自适应
     * @param grid  表格  this
     * @param clear   是否重置方法
     */
    autoFitColWidth: function (grid, clear) {
        if (clear) {
            grid.notAutoSizeCols = null;
        }
        //自适应列宽
        var allDisplayedCol_field = [], n, index;
        grid.columnApi.getAllColumns().forEach(function (columnDef) {
            if (!columnDef.colDef.hide) allDisplayedCol_field.push(columnDef.colDef.field);
        });
        if (grid.notAutoSizeCols && !grid.notAutoSizeCols.length) return;
        grid.notAutoSizeCols = grid.notAutoSizeCols || allDisplayedCol_field;
        var displayedCol_field = [];
        grid.columnApi.getAllDisplayedVirtualColumns().forEach(function (column) {
            displayedCol_field.push(column.colDef.field);
        });
        grid.columnApi.autoSizeColumns(grid.notAutoSizeCols);
        for (n = 0; n < displayedCol_field.length; n++) {
            index = $.inArray(displayedCol_field[n], grid.notAutoSizeCols);
            if (index != -1) grid.notAutoSizeCols.splice(index, 1);
        }
    },
    /**
     * 表格组装数据
     * @param pid 父节点属性
     * @param data 入参数据
     * @param headerObj 头行数据格式
     * @returns {*}
     *  example: Utils.makeTreeData('bzxx', [{],{}], {xz: 'avg', ksjls: 'first', jsjls: 'last', jjmc: '固定值'});
     */
    makeTreeData: function (pid, data, headerObj) {
        if ((data && !data.length) || data == null) return data;
        var map = {}, dest = [], di, dj, field, par, pl, sum;
        for (var i = 0; i < data.length; i++) {
            di = data[i];
            if (!map[di[pid]]) {
                //循环匹配，如果找不到pid则拼装一组头数组，并在该pid的children下推送该数组
                dest.push({
                    group: di[pid],
                    children: [di]
                });
                map[di[pid]] = di;
            } else {
                //找到pid则在该pid的children下推送该数组
                for (var j = 0; j < dest.length; j++) {
                    dj = dest[j];
                    if (dj.group == di[pid]) {
                        dj.children.push(di);
                        break;
                    }
                }
            }
        }
        if (headerObj && typeof headerObj == "object" && !$.isEmptyObject(headerObj)) {
            for (i = 0; i < dest.length; i++) {
                //循环处理数据，组装出头部需要的数据格式
                map = {};
                for (j in dest[i].children) {
                    //遍历children的对象
                    if (dest[i].children.hasOwnProperty(j)) {
                        for (field in dest[i].children[j]) {
                            //遍历children下每一行的值
                            if (dest[i].children[j].hasOwnProperty(field)) {
                                map[field] = map[field] || [];
                                map[field].push(dest[i].children[j][field]);//children的所有数据推送到map中
                            }
                        }
                    }
                }
                for (par in headerObj) {
                    //针对传参循环处理children数据
                    if (headerObj.hasOwnProperty(par) && headerObj[par] == 'avg') {
                        //对map中的par属性取平均值
                        sum = 0;
                        for (pl = 0; pl < map[par].length; pl++) {
                            sum += parseFloat(map[par][pl]);
                        }
                        dest[i][par] = sum / map[par].length;
                    } else if (headerObj.hasOwnProperty(par) && headerObj[par] == 'first') {
                        //对map中的par属性取首值
                        dest[i][par] = map[par][0];
                    } else if (headerObj.hasOwnProperty(par) && headerObj[par] == 'last') {
                        //对map中的par属性取尾值
                        dest[i][par] = map[par][map[par].length - 1];
                    } else if (headerObj.hasOwnProperty(par) && headerObj[par] == 'sum') {
                        //对map中的par属性取尾值
                        sum = 0;
                        for (pl = 0; pl < map[par].length; pl++) {
                            sum += parseFloat(map[par][pl]);
                        }
                        dest[i][par] = sum;
                    } else {
                        //对map中的par属性取固定值
                        dest[i][par] = headerObj[par];
                    }
                }
            }
        }
        return dest;
    },
    /**
     * 一维数组组装多维数组
     * @param oriArr  原始数组
     * @param dimension   维度
     * @returns {Array}  转换后的数组
     */
    transformArr: function (oriArr, dimension) {
        var tempArr = [];
        var finalArr = [];
        dimension = dimension || 2;
        if (oriArr.constructor != Array || oriArr.length == 0) return oriArr;
        var sum = Math.ceil(oriArr.length / dimension);
        var cnt = 0, i, j;
        for (i = 0; i < sum; i++) {
            for (j = 0; j < dimension; j++) {
                tempArr.push(oriArr[cnt] || null);
                cnt++;
            }
            finalArr.push(tempArr);
            tempArr = [];
        }
        return finalArr;
    },
    /**
     * 遍历
     * @param tree
     * @param level
     * @param callback
     */
    traverseTree: function (tree, callback, level) {
        for (var i = 0; i < tree.length; i++) {
            var node = tree[i];
            if (callback) {
                callback(node, level);
            }
            if (node.children && node.children !== null) {
                this.traverseTree(node.children, callback, level);
            }
        }
    },
    /**
     * json排序，默认顺序排列
     * @param json
     * @param property  要排序的属性
     * @param sortType
     * @returns {Function}
     * example:  Utils.jsonCompare([{a: 1, b: 3}, {a: 2, b: 1}, {a: 3, b: 2}], 'a', 'asc');
     */
    jsonCompare: function (json, property, sortType) {
        function arrMinNum(arr) {
            var minNum = Infinity, index = -1, minVul = "", sortProperty = "";
            var testChinese = /[\u4e00-\u9fa5]/;
            for (var i = 0; i < arr.length; i++) {
                sortProperty = arr[i][property] || null;
                if (typeof(sortProperty) == "string") {
                    if (testChinese.test(sortProperty)) {
                        if (sortProperty.localeCompare(minNum) < 0) {
                            minNum = sortProperty;
                            minVul = arr[i];
                            index = i;
                        }
                    } else {
                        if (sortProperty < minNum) {
                            minNum = sortProperty;
                            minVul = arr[i];
                            index = i;
                        }
                    }
                } else {
                    if (sortProperty < minNum) {
                        minNum = sortProperty;
                        minVul = arr[i];
                        index = i;
                    }
                }
            }
            return {"minNum": minVul, "index": index};
        }

        function arrMaxNum(arr) {
            var maxNum = -Infinity, index = -1, maxVul = "", sortProperty = "";
            var testChinese = /[\u4e00-\u9fa5]/;
            for (var i = 0; i < arr.length; i++) {
                sortProperty = arr[i][property] || null;
                if (typeof(sortProperty) == "string") {
                    if (testChinese.test(sortProperty)) {
                        if (sortProperty.localeCompare(maxNum) > 0) {
                            maxNum = sortProperty;
                            maxVul = arr[i];
                            index = i;
                        }
                    }
                    else {
                        if (sortProperty > maxNum) {
                            maxNum = sortProperty;
                            maxVul = arr[i];
                            index = i;
                        }
                    }
                } else {
                    if (sortProperty > maxNum) {
                        maxNum = sortProperty;
                        maxVul = arr[i];
                        index = i;
                    }
                }
            }
            return {"maxNum": maxVul, "index": index};
        }

        return (function (json, property, sortType) {
            var arrOld, i, arrNew = [];
            if (sortType == 'desc') {
                arrOld = json.slice(0);
                for (i = 0; i < json.length; i++) {
                    arrNew.push(arrMaxNum(arrOld).maxNum);
                    arrOld.splice(arrMaxNum(arrOld).index, 1);
                }
            } else {
                arrOld = json.concat();
                for (i = 0; i < json.length; i++) {
                    arrNew.push(arrMinNum(arrOld).minNum);
                    arrOld.splice(arrMinNum(arrOld).index, 1)
                }
            }
            return (arrNew);
        })(json, property, sortType)
    },
    /**
     * 导出excel
     */
    exportToExcel: {
        idTmr: '',
        getExplorer: function () {
            var explorer = window.navigator.userAgent;
            //ie
            if (explorer.indexOf("MSIE") >= 0) {
                return 'ie';
            }
            //firefox
            else if (explorer.indexOf("Firefox") >= 0) {
                return 'Firefox';
            }
            //Chrome
            else if (explorer.indexOf("Chrome") >= 0) {
                return 'Chrome';
            }
            //Opera
            else if (explorer.indexOf("Opera") >= 0) {
                return 'Opera';
            }
            //Safari
            else if (explorer.indexOf("Safari") >= 0) {
                return 'Safari';
            }
        },
        doExport: function (tableid, filename, sheetname) {//整个表格拷贝到EXCEL中
            if (this.getExplorer() == 'ie') {
                var curTbl = document.getElementById(tableid);
                var oXL = new ActiveXObject("Excel.Application");
                //创建AX对象excel
                var oWB = oXL.Workbooks.Add();
                //获取workbook对象
                var xlsheet = oWB.Worksheets(1);
                //激活当前sheet
                var sel = document.body.createTextRange();
                sel.moveToElementText(curTbl);
                //把表格中的内容移到TextRange中
                sel.select;
                //全选TextRange中内容
                sel.execCommand("Copy");
                //复制TextRange中内容
                xlsheet.Paste();
                //粘贴到活动的EXCEL中
                oXL.Visible = true;
                //设置excel可见属性
                try {
                    var fname = oXL.Application.GetSaveAsFilename("Excel.xls", "Excel Spreadsheets (*.xls), *.xls");
                } catch (e) {
                    print("Nested catch caught " + e);
                } finally {
                    oWB.SaveAs(fname);
                    oWB.Close(savechanges = false);
                    //xls.visible = false;
                    oXL.Quit();
                    oXL = null;
                    //结束excel进程，退出完成
                    //window.setInterval("Cleanup();",1);
                    idTmr = window.setInterval("this.Cleanup();", 1);
                }
            }
            else {
                this.tableToExcel(tableid, filename, sheetname)
            }
        },
        Cleanup: function () {
            window.clearInterval(idTmr);
            CollectGarbage();
        },
        tableToExcel: (function () {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" ' +
                    'xmlns:x="urn:schemas-microsoft-com:office:excel" ' +
                    'xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml>' +
                    '<x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}' +
                    '</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet>' +
                    '</x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->' +
                    '</head><body><table>{table}</table></body></html>',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g,
                        function (m, p) {
                            return c[p];
                        })
                };
            return function (tableid, filename, sheetname) {
                if (!tableid.nodeType) {
                    var table = document.getElementById(tableid)
                }
                var ctx = {
                    worksheet: sheetname || filename || Utils.formatDate(new Date(), 'yyyyMMdd'),
                    table: table.innerHTML, name: '测试撒撒旦'
                };
                // window.open(uri + base64(format(template, ctx)), filename, '_blank');
                var exportExcelElement = document.getElementById('exportExcel');
                if (exportExcelElement == null) {
                    exportExcelElement = document.createElement('a');
                    exportExcelElement.setAttribute('id', 'exportExcel');
                    exportExcelElement.setAttribute('href', uri + base64(format(template, ctx)));
                    exportExcelElement.setAttribute('download', filename + '.xls');
                    exportExcelElement.setAttribute('target', '_blank');
                    exportExcelElement.setAttribute('class', 'hidden');
                    document.body.appendChild(exportExcelElement);
                } else {
                    exportExcelElement.href = uri + base64(format(template, ctx));
                    exportExcelElement.download = filename + '.xls';
                }
                exportExcelElement.click();
            }
        })()
    }
};