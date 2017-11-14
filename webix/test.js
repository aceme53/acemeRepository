/**
 *
 * Created by sumi_EC on 2017/6/7.
 */
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};
var toolBar = {
    container: "toolbar",
    view: "form",
    id: "top_toolbar",
    paddingY: 5,
    paddingX: 10,
    cols: [
        {
            view: "button", label: "新增", width: 95,
            click: function () {
                var colIdObjs = {};
                $$('centerGrid').config.columns.forEach(function (item) {
                    colIdObjs[item.id] = '';
                });
                var newRowObj = webix.extend({id: new Date().getTime(), rank: "0"}, colIdObjs);
                $$('centerGrid').add(newRowObj, 0);
            }
        }, {},
        {
            view: "button", label: "导出所有", width: 95,
            click: function () {
                webix.toExcel($$("centerGrid"));
            }
        },
        {
            view: "button", label: "导出标题列", width: 140,
            click: function () {
                webix.toExcel($$("centerGrid"), {
                    filename: "centerGrid",
                    name: "Films",
                    columns: {
                        "rank": {header: "Rank", width: 50},
                        "title": {header: "Title", width: 200}
                    }
                });
            }
        }
    ]
};
var centerGrid = {
    container: "center",
    id: "centerGrid",
    view: "datatable",
    editable: true,
    fixedRowHeight: false, rowLineHeight: 25, rowHeight: 25,
    resizeColumn: true,
    resizeRow: true,
    select: "cell",
    multiselect: true,
    blockselect: true,
    editaction: "dblclick",
    leftSplit: 3,
    datafetch: 20,
    rightSplit: 2,
    tooltip: true,
    headermenu: true,
    columns: [
        {
            id: "ch",
            header: {content: "masterCheckbox", contentId: "mc"},
            template: "{common.checkbox()}",
            width: 40
        },
        {id: "rank", header: ["序号", {content: "selectFilter"}], sort: 'int', width: 60},
        {
            id: "title",
            editor: "text",
            sort: "string",
            header: ["电影名", {content: "textFilter"}],
            width: 250,
            css: "left_area"
        },
        {id: "2008_1", editor: "text", sort: "int", header: [{text: "2008", colspan: 12}, "一月"]},
        {id: "2008_2", editor: "text", sort: "int", header: [null, "二月"]},
        {id: "2008_3", editor: "text", sort: "int", header: [null, "三月"]},
        {id: "2008_4", editor: "text", sort: "int", header: [null, "四月"]},
        {id: "2008_5", editor: "text", sort: "int", header: [null, "五月"]},
        {id: "2008_6", editor: "text", sort: "int", header: [null, "六月"]},
        {id: "2008_7", editor: "text", sort: "int", header: [null, "七月"]},
        {id: "2008_8", editor: "text", sort: "int", header: [null, "八月"]},
        {id: "2008_9", editor: "text", sort: "int", header: [null, "九月"]},
        {id: "2008_10", editor: "text", sort: "int", header: [null, "十月"]},
        {id: "2008_11", editor: "text", sort: "int", header: [null, "十一月"]},
        {id: "2008_12", editor: "text", sort: "int", header: [null, "十二月"]},
        {id: "2009_1", editor: "text", sort: "int", header: [{text: "2009", colspan: 12}, "一月"]},
        {id: "2009_2", editor: "text", sort: "int", header: [null, "二月"]},
        {id: "2009_3", editor: "text", sort: "int", header: [null, "三月"]},
        {id: "2009_4", editor: "text", sort: "int", header: [null, "四月"]},
        {id: "2009_5", editor: "text", sort: "int", header: [null, "五月"]},
        {id: "2009_6", editor: "text", sort: "int", header: [null, "六月"]},
        {id: "2009_7", editor: "text", sort: "int", header: [null, "七月"]},
        {id: "2009_8", editor: "text", sort: "int", header: [null, "八月"]},
        {id: "2009_9", editor: "text", sort: "int", header: [null, "九月"]},
        {id: "2009_10", editor: "text", sort: "int", header: [null, "十月"]},
        {id: "2009_11", editor: "text", sort: "int", header: [null, "十一月"]},
        {id: "2009_12", editor: "text", sort: "int", header: [null, "十二月"]},
        {id: "year", editor: "date", sort: "int", header: "发行时间", width: 100},
        {id: "votes", editor: "number", sort: "int", header: "票房", width: 100}
    ],
    on: {
        onAfterEditStop: function (valObj, cellObj) {
            if (cellObj.column === 'year') this.data.getItem(cellObj.row).year = new Date(valObj.value).getFullYear()
        },
        onresize: function () {
            /*
             webix.once(function () {
             this.adjustRowHeight("title", true);
             })
             */
            this.adjustRowHeight("title", true);
        },
        onColumnResize: function () {
            this.adjustRowHeight("title", true);
        },
        onSelectChange: function () {
        },
        onAfterLoad: function () {
        }
    },
    data: big_wide_film_set,
    pager: "pager"
};
webix.Date.isHoliday = function (day) {
    day = day.getDay();
    if (day === 0 || day === 6) return "webix_cal_event";
};
var pager = {
    view: "pager", id: "pager",
    animate: {
        subtype: "out"
    },
    template: "{common.first()} {common.prev()} {common.pages()} {common.next()} {common.last()}",
    size: 10,
    group: 5
};
var calendar = {
    cols: [
        {
            weekHeader: true,
            date: new Date(),
            view: "calendar",
            width: 300,
            events: webix.Date.isHoliday
        },
        {view: 'resizer'},
        {template: "col2"}
    ]
};
var bottom = {
    container: "bottom",
    multi: true,
    view: "accordion",
    rows: [
        {
            collapsed: true,
            header: "日历控件",
            body: calendar
        }
    ]
};
webix.ready(function () {
    webix.i18n.calendar.dayShort = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    webix.i18n.calendar.dayFull = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    webix.i18n.calendar.monthShort = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    webix.i18n.calendar.monthFull = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
    webix.ui({
        type: "space",
        id: "testLayout",
        rows: [
            toolBar,
            centerGrid,
            pager,
            bottom,
            {height: 20}
        ]
    });
});