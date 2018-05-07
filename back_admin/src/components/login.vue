<template>
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="用户名" prop="uname">
    <el-input type="text" v-model="ruleForm.uname" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
</template>
<script>
//import axios from 'axios';

  export default {
    data() {
      
      var validatePass = (rule, value, callback) => {
       if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          callback();
        }
      };
      var validateUname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else{
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          uname: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          uname:[
            {validator:validateUname,trigger:'blur'}
          ]
        }
      };
    },
    methods: {
       async doLogin(){
        var url=`${this.CONST_CONFIG.SERVER_URL}/login`;
        let news=await this.$axios({
          url:url,
          method:'post',
          data:{name:this.ruleForm.uname,pwd:this.ruleForm.pass},
          headers: { 'content-type': 'application/json' },//默认就是json数据
        });
        console.log(news,'00000000')
        switch (news.code){
          /*case 401:
            console.log('********************')
            //说明未授权 或者 token过期
            this.$router.push('/');
            //location.reload();
            return;
          */          
            case 404:
            //用户名、密码错误
            this.$message('用户名或密码错误');//Element-UI注册的
            break;
          case 0:
            sessionStorage.setItem('webtoken',news.token);   
            localStorage.setItem('uname',this.ruleForm.uname)         
            this.$router.push('/Admin');
            return;
          default:
              console.log(444);
              return;
        }
       },
      submitForm(formName) {
        this.$refs[formName].validate((valid,obj) => {
          if (valid) {
            this.doLogin();
            //this.$router.push('/Admin');
          } else {
            console.log('error submit!!');
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