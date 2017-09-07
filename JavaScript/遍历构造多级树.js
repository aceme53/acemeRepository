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