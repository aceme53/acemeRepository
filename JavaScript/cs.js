function test() {
    var aa = function (x) {
        x--;
        if (x > 1) {
            arguments.callee(x);
            console.info(x)
        }
    };
    aa(5);
    //***************************************************************************
    var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    var descSort = function (arr) {
        var arrLen = arr.length;
        var newArr = [];
        var doDescSort = function (x) {
            if (x > 0) {
                x--;
                arguments.callee(x);
                newArr.unshift(arr[x]);
            }
        };
        doDescSort(arrLen);
        return newArr;
    };
    descSort(arr);
}
Array.prototype.forEach.call($('.ag-cell'), function (dom) {
    $(dom).css({'display': 'inline-block', 'float': 'left'})
});
//Array.prototype.forEach.call($('.ag-cell'),function(dom){$(dom).text($(dom).text() + '\r')});