<style scoped>
  a {
    color: #42b983;
  }
  .checkedClass {
    color: red;
  }
  .testTable {
    margin: auto auto;
  }
  .testTable td {
    min-width: 300px;
    padding: 3px;
  }
  .testTable td input[type='text'] {
    width: 98%;
    height: 100%;
    font-size: smaller;
  }
  .tdText {
    text-align: left;
    padding: 5px;
    font-size: larger;
    color: red;
  }
</style>
<template>
  <div class="HelloWorld">
    <h1>{{title + ' ' + reversedTitle}}</h1>
    <el-button @click="title=='ziksang'?title='HelloWorld':title='ziksang'" type="info">改变title值</el-button>
    <h1>{{ msg | capitalize}}</h1>
    <table class="testTable" border="1">
      <thead>
      <tr>
        <td v-html="message" colspan="2">
        </td>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td><label>多选控件</label></td>
        <td>
          <el-row>
            <el-select v-model="groceryList" multiple placeholder="请选择" filterable allow-create>
              <el-option
                v-for="item in options"
                :key="item.text"
                :label="item.text"
                :value="item.text">
              </el-option>
            </el-select>
          </el-row>
          <el-row>
            <div>
              <ol style="max-width: 200px;text-align: center;margin: auto auto;">
                <todo-item
                  v-for="item in groceryList"
                  v-bind:todo="item"
                  v-bind:key="item">{{item}}
                </todo-item>
              </ol>
            </div>
          </el-row>
        </td>
      </tr>
      <tr>
        <td><label>for循环</label></td>
        <td>
          <span>
            <a v-for='(url , index) in urlList' :href='url.url | getquery(url.name,url.age)'>{{url.url}}<br></a>
          </span>
        </td>
      </tr>
      <tr>
        <td>
          <label for="r1" v-bind:class="{'checkedClass': isChecked}">勾选变色</label>
        </td>
        <td>
          <el-row>
            <el-col :span="6">
              <el-checkbox v-model="isChecked" id="r1"></el-checkbox>
            </el-col>
            <el-col :span="18">
              <div v-if="isChecked" class="tdText">现在你看到我了</div>
            </el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td>
          <label for="r2">数据双向绑定</label>
        </td>
        <td>
          <el-input type="text" v-model="msg" id="r2" v-on:keyup.13="keyDownFunc($event)">
          </el-input>
        </td>
      </tr>
      <tr>
        <td><label>多个复选框</label></td>
        <td>
          <input type="checkbox" id="runoob" value="test1" v-model="checkedNames">
          <label for="runoob">test1</label>
          <input type="checkbox" id="google" value="test2" v-model="checkedNames">
          <label for="google">test2</label>
          <input type="checkbox" id="taobao" value="test3" v-model="checkedNames">
          <label for="taobao">test3</label>
          <br>
          <span>选择的值为: {{ sortCheckedNames }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <label>
            R
            <el-input-number :min="0" :max="255" v-model="color.r"></el-input-number>
            G
            <el-input-number :min="0" :max="255" v-model="color.g"></el-input-number>
            B
            <el-input-number :min="0" :max="255" v-model="color.b"></el-input-number>
          </label>
        </td>
        <td v-bind:style="{color: 'rgb('+(color.r||0)+','+(color.g||0)+','+(color.b||0)+')'}">
          <b style="font-size: x-large">颜色编辑</b>
        </td>
      </tr>
      </tbody>
    </table>
    <div class="clear"></div>
  </div>
</template>
<script>
  import Vue from 'vue';
  Vue.component('todo-item', {
    props: ['todo'],
    template: '<li>{{ todo }}</li>'
  });
  export default {
    name: 'myAppCenter',
    data () {
      return {
        switchVal: true,
        isChecked: false,
        title: 'HelloWorld!',
        color: {
          r: 100,
          g: 100,
          b: 100
        },
        options: [{
          id: '选项1',
          text: '黄金糕'
        }, {
          id: '选项2',
          text: '双皮奶'
        }, {
          id: '选项3',
          text: '蚵仔煎'
        }, {
          id: '选项4',
          text: '龙须面'
        }, {
          id: '选项5',
          text: '北京烤鸭'
        }],
        groceryList: [],
        msg: '回车反向排序',
        message: '<h3>这是个测试</h3>',
        checked: false,
        checkedNames: [],
        urlList: [
          {url: 'http://www.baidu.com', name: 'ziksang', age: 20},
          {url: 'http://www.google.com', name: 'ziksang2', age: 30}
        ]
      }
    },
    methods: {
      keyDownFunc: function () {
        this.msg = this.msg.split('').reverse().join('')
      }
    },
    filters: {
      capitalize: function (value) {
        if (!value) return '';
        value = value.toString();
        return value.charAt(0).toUpperCase() + value.slice(1);
      },
      getquery (value, name, age) {
        if (!value) return "";
        return `${value}?name=${name}&age=${age}`
      }
    },
    computed: {
      // 计算属性的 getter
      reversedTitle: function () {
        // `this` 指向 vm 实例.
        return this.title.split('').reverse().join('')
      },
      sortCheckedNames: function () {
        return this.checkedNames.sort();
      }
    }
  }
</script>
