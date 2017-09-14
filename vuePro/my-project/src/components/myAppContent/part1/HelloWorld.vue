<style scoped>
  a {
    color: #42b983;
  }
  .checkedClass {
    color: red;
  }
  .testTable {
    margin: auto auto;
    width: 90%;
  }
  .testTable td {
    min-width: 300px;
    min-height: 50px;
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 20px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: lightskyblue;
  }
  .el-carousel__item:nth-child(2n+1) {
    background-color: lightblue;
  }
</style>
<template>
  <div class="HelloWorld">
    <el-row>&nbsp;</el-row>
    <el-row>
      <el-col :span="1">&nbsp;</el-col>
      <el-col :span="22">
        <el-carousel :interval="2000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>
    </el-row>
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
                :key="item.label"
                :label="item.label"
                :value="item.label"
                :disabled="item.disabled">
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
        <td v-bind:style="{color: 'rgb('+(color.r||0)+','+(color.g||0)+','+(color.b||0)+')'}">
          <b style="font-size: x-large">颜色编辑</b>
        </td>
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
      </tr>
      <tr>
        <td>
          <label>有输入框的滑块</label>
        </td>
        <td>
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="20">
              <el-slider v-model="sliderVal" :step="20" show-stops show-input></el-slider>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td>
          <label>带快捷选项的时间控件</label>
        </td>
        <td>
          <el-row>
            <el-col :span="2">&nbsp;</el-col>
            <el-col :span="20">
              <el-date-picker v-model="dateTimeRangeVal" type="datetimerange" :picker-options="pickerOptions"
                              placeholder="选择时间范围"
                              align="right">
              </el-date-picker>
            </el-col>
            <el-col :span="2">&nbsp;</el-col>
          </el-row>
        </td>
      </tr>
      <tr>
        <td>
          <label>文件上传</label>
        </td>
        <td>
          <!--https://jsonplaceholder.typicode.com/posts/-->
          <el-upload
            action=""
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img :src="dialogImageUrl" alt="">
          </el-dialog>
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
    name: 'myAppContent',
    data () {
      return {
        switchVal: true,
        isChecked: false,
        title: 'HelloWorld!',
        color: {
          r: 255,
          g: 100,
          b: 100
        },
        options: [
          {
            value: '禁用选项',
            label: '禁用选项',
            disabled: true
          }, {
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
        groceryList: [],
        msg: '回车反向排序',
        message: '<h3>这是个测试</h3>',
        checked: false,
        checkedNames: [],
        urlList: [
          {url: 'http://www.baidu.com', name: 'ziksang', age: 20},
          {url: 'http://www.google.com', name: 'ziksang2', age: 30}
        ],
        sliderVal: 0,
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateTimeRangeVal: [new Date(), new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 5)],
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    methods: {
      keyDownFunc: function () {
        this.msg = this.msg.split('').reverse().join('')
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
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
