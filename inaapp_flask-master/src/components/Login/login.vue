<template>
  <div>
    <div class="ui login-header">
      <div class="ui grid">
        <div class="row header-row1"></div>
        <div class="text-center">
          <h1 class="ui header white">
            <i class="settings icon"></i> INA-URCS用户登录
          </h1>
        </div>
      </div>
    </div>
    <div class="ui three column stackable grid login-div">
      <div class="column"></div>
      <div class="column">
        <form id="login" class="ui fluid form segment" @onSuccess="submitForm" ref="loginForm">
          <div class="field">
            <label class="">用户名</label>
            <div class="ui left icon input">
              <input type="text" name="userName" placeholder="" />
              <i class="user icon"></i>
              <div class="ui corner label">
                <i class="icon asterisk"></i>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="">密码</label>
            <div class="ui left icon input">
              <input type="password" name="password" placeholder="" />
              <i class="lock icon"></i>
              <div class="ui corner label">
                <i class="icon asterisk"></i>
              </div>
            </div>
          </div>
          <div class="inline field">
            <div class="ui checkbox">
              <input type="checkbox" name="terms" />
              <label>记住密码</label>
            </div>
          </div>
          <div class="inline field">
            <div class="ui blue submit button" @click.stop.prevent="login()">登录</div>
            <div class="ui blue reset button">重置</div>
          </div>
        </form>
      </div>
      <div class="column"></div>
    </div>
  </div>

</template>

<script>
  export default {
    mounted() {
      $('.ui.form').form(
        {
          userName: {
            identifier: 'userName',
            rules: [
              {
                type: 'empty',
                prompt: '用户名不能为空'
              }
            ]
          },
          password: {
            identifier: 'password',
            rules: [
              {
                type: 'empty',
                prompt: '密码不能为空'
              },
              {
                type: 'length[6]',
                prompt: '密码不能低于6个字符'
              }
            ]
          }
        },
        {
          inline: true,
          on: 'blur'
          // onSuccess: submitForm
        }
      )

      //checkbox init
      // $('.ui.checkbox').checkbox()
    },
    data() {
      return {
        formData: ''
      }
    },
    methods: {
      submitForm() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.login()
          } else {
            // 校验失败
            return false
          }
        })
      },
      // async
      login() {
        // const res = await axios.post(
        //   'http://localhost:8888/api/private/v1/login',
        //   this.loginForm
        // )

        // console.log(res)

        // const { data, meta } = res.data
        // console.log(data)
        // if (meta.status === 200) {
        // console.log('登录成功')

        // localStorage.setItem('token', data.token)

        this.$router.push('/')
        // } else {
        // console.log('登录失败', meta.msg)
        // this.$message.error(meta.msg)
        //   alert('登录失败')
        // }
      }
    }
  }
</script>

<style scoped>
  html,
  body {
    font-family: Verdana, Arial, Helvetica, sans-serif;
    margin: 0;
    background-color: #0066b1;
  }
  .ui.grid {
    margin: 0;
  }
  .header-row1 {
    height: 100px;
  }
  .login-header {
    background-color: #0066b1;
    height: 160px;
  }

  .ui.white {
    color: #fff;
  }
  .text-center {
    /* justify-content: center; */
    text-align: center;
  }

  .ui.login-div {
    margin: 30px 0 0 0;
  }
  .reset {
    float: right;
  }
</style>
