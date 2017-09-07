<template>
  <div class="myAppCenter">
    <el-switch v-model="switchVal" width="120"  on-text="HelloWorld" off-text="Hello" on-color="#13ce66"
               off-color="#ff4949">
    </el-switch>
    <Hello v-if="!switchVal"></Hello>
    <HelloWorld v-if="switchVal"></HelloWorld>
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
        switchVal: true
      }
    }
  }
</script>
