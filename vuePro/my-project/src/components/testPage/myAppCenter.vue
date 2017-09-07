<template>
  <div class="myAppCenter">
    <div>
      <ol style="max-width: 200px;text-align: center;margin: auto auto;">
        <!--
          现在我们为每个 todo-item 提供 todo 对象
          todo 对象是变量，即其内容可以是动态的。
          我们也需要为每个组件提供一个“key”，晚些时候我们会做个解释。
        -->
        <todo-item
          v-for="item in groceryList"
          v-bind:todo="item"
          v-bind:key="item.id">
        </todo-item>
      </ol>
      <h1>{{title + ' ' + reversedTitle}}</h1>
      <button @click="title=='ziksang'?title='HelloWorld':title='ziksang'">改变title值</button>
      <h1>{{ msg | capitalize}}</h1>
      <router-link to="/Hello" class="router">Go to Hello!</router-link>
      <table class="testTable" border="1">
        <thead>
        <tr>
          <td v-html="message" colspan="2">
          </td>
        </tr>
        </thead>
        <tbody>
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
            <input type="checkbox" v-model="isChecked" id="r1"><span v-if="isChecked">现在你看到我了</span>
          </td>
        </tr>
        <tr>
          <td>
            <label for="r2">数据双向绑定</label>
          </td>
          <td>
            <input type="text" v-model="msg" class="form-control" id="r2" v-on:keyup.13="keyDownFunc($event)">
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
              R<input type="number" MAX="255" MIN="0" v-model="color.r" required/>
              G<input type="number" MAX="255" MIN="0" v-model="color.g" required/>
              B<input type="number" MAX="255" MIN="0" v-model="color.b" required/>
            </label>
          </td>
          <td v-bind:style="{color: 'rgb('+(color.r||0)+','+(color.g||0)+','+(color.b||0)+')'}">
            <b style="font-size: x-large">颜色编辑</b>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <p class="clear"></p>
  </div>
</template>
<script>
  import Vue from 'vue';
  Vue.component('todo-item', {
    // todo-item 组件现在接受一个
    // "prop"，类似于一个自定义属性
    // 这个属性名为 todo。
    props: ['todo'],
    template: '<li>{{ todo.text }}</li>'
  });
  export default {
    name: 'myAppCenter',
    data () {
      return {
        isChecked: false,
        title: 'HelloWorld!',
        color: {
          r: 100,
          g: 100,
          b: 100
        },
        groceryList: [
          {id: 0, text: '蔬菜'},
          {id: 1, text: '奶酪'},
          {id: 2, text: '随便其他什么人吃的东西'}
        ],
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
</style>
