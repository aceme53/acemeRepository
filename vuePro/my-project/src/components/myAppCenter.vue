<template>
  <div class="myAppCenter">
    <div>
      <el-radio class="radio" v-model="switchVal" label="HelloWorld">HelloWorld</el-radio>
      <el-radio class="radio" v-model="switchVal" label="Hello">Hello</el-radio>
      <transition name="el-fade-in-linear">
        <div v-if="switchVal=='Hello'" class="transition-box">
          <Hello></Hello>
        </div>
      </transition>
      <transition name="el-fade-in">
        <div v-if="switchVal=='HelloWorld'" class="transition-box">
          <HelloWorld></HelloWorld>
        </div>
      </transition>
      <div class="clear"></div>
    </div>
  </div>
</template>
<script>
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
        switchVal: 'HelloWorld'
      }
    }
  }
</script>
