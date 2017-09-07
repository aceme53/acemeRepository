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
                        var sum = 0;
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
                        var sum = 0;
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
                base64 = function (s) { return window.btoa(unescape(encodeURIComponent(s))) },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g,
                        function (m, p) { return c[p]; })
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