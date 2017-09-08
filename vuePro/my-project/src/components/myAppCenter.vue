<template>
  <div class="myAppCenter">
    <el-radio class="radio" v-model="switchVal" label="HelloWorld">HelloWorld</el-radio>
    <el-radio class="radio" v-model="switchVal" label="Hello">Hello</el-radio>
    <Hello v-if="switchVal=='Hello'"></Hello>
    <HelloWorld v-if="switchVal=='HelloWorld'"></HelloWorld>
    <p class="clear"></p>
  </div>
</template>
<script>
  import Vue from 'vue';
  import Hello from '@/components/Hello'
  import HelloWorld from '@/components/HelloWorld'
  export default {
    name: 'myAppCenter',
    components: {
      "Hello": Hello,
      "HelloWorld": HelloWorld
    },
    data () {
      return {
        switchVal: 'Hello'
      }
    }
  }
</script>
