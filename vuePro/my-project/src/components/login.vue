<template>
  <div class="login">
    <el-row class="m-b-xxl">&nbsp;</el-row>
    <el-row class="m-b-xxl">&nbsp;</el-row>
    <img src="../assets/logo.png">
    <el-row>
      <el-col :span="2">&nbsp;</el-col>
      <el-col :span="20">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px">

          <el-form-item label="用户名" prop="username">
            <el-input v-model.number="loginForm.username" @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="loginForm.password" auto-complete="off"
                      @keyup.enter.native="submitForm('loginForm')"></el-input>
          </el-form-item>

          <el-form-item>
            <el-row>
              <el-col :span="22">
                <el-button type="primary" @click="submitForm('loginForm')">提交</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-col>
              <el-col :span="2">&nbsp;</el-col>
            </el-row>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="2">&nbsp;</el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      let checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        setTimeout(() => {
          if (value && value.toString().trim().length < 5) {
            callback(new Error('用户名最小长度为六位'));
          } else {
            callback();
          }
        }, 0);
      };
      let checkPassWord = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }
        setTimeout(() => {
          if (value && value.toString().trim().length < 6) {
            callback(new Error('密码最小长度为六位'));
          }else {
            callback();
          }
        }, 0);
      };
      return {
        loginForm: {
          username: '',
          password: ''
        },
        rules: {
          password: [
            {validator: checkPassWord, trigger: 'blur'}
          ],
          username: [
            {validator: checkUserName, trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$router.push({path: '/index'});
          } else {
            console.error('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
