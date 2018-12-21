<template>
  <div class="bgc">
    <!-- <img src="../../assets/background.jpg" alt=""> -->
    <div class="ui login-header">
      <div class="ui grid">
        <div class="row header-row1">
          <!-- 登录失败弹框 -->
          <div class="ui negative message hidden">
            <i class="close icon"></i>
            <div class="header">
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">
                  登录失败！
                </font>
              </font>
            </div>
            <p>
              <font style="vertical-align: inherit;">
                <font style="vertical-align: inherit;">您的用户名或密码不正确，请重新输入
                </font>
              </font>
            </p>
          </div>

        </div>

      </div>

    </div>
    <div class="text-center">
      <h1 class="ui header white">
        <i class="settings icon"></i> INA-URCS用户登录
      </h1>
    </div>

    <div class="ui three column stackable grid login-div">
      <div class="column"></div>
      <div class="column">
        <form id="login" class="ui fluid form segment" ref="loginForm">
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
            <div class="ui blue submit button" @click.stop.prevent="submitForm()">登录</div>
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
      var that = this
      $('.ui.form').form(
        {
          inline: true,
          on: 'blur',
          fields: {
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
            // onValid: function() {
            //   console.log('valid')
            // },
            // onFailure: function() {
            //   console.log('failure')
            // }
          }
        },
        {
          onSuccess: function(e) {
            console.log(1)
            // e.preventDefault()
            // that.submitForm()
          }
        }

        // {
        //   inline: true,
        //   on: 'blur',
        //   // onSuccess: submitForm()
        //   onValid: function() {
        //     console.log('valid')
        //   },
        //   onFailure: function() {
        //     console.log('failure')
        //   }
        // }
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
        // console.log(this.$refs.loginForm)
        // console.log(this.$refs.loginForm.validate())

        this.formData = $('.ui.form input').serializeArray()
        console.log(this.formData)

        if (
          this.formData[0].value == 'admin' &&
          this.formData[1].value == '123456'
        ) {
          this.login()
        } else {
          $('.ui.negative').fadeIn()
          $('.ui.negative').fadeOut()
          $('.ui.negative').fadeIn()
          return false
        }
      },

      async login() {
        // const res = await this.$http.post(
        //   'http://localhost:8888/api/private/v1/login',
        //   this.formData
        // )

        // console.log(res)

        // const { data, meta } = res.data
        // console.log(data)
        // if (meta.status === 200) {
        //   console.log('登录成功')

        //   localStorage.setItem('token', data.token)

        this.$router.push('/')
        // }
        // else {
        //   console.log('登录失败', meta.msg)
        //   $('.ui.negative').fadeIn()
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
    height: 100%;
  }
  .bgc {
    height: 100%;

    background-image: url('../../assets/background.jpg');
    background-size: 100% 100%;
  }
  .ui.grid {
    margin: 0;
  }
  .header-row1 {
    height: 100px;
  }
  .login-header {
    /* background-color: #0066b1; */
    height: 250px;
  }

  .ui.white {
    color: #fff;
  }
  .text-center {
    /* justify-content: center; */
    text-align: center;
    width: 100%;
  }

  .ui.login-div {
    margin: 30px 0 0 0;
  }
  .reset {
    float: right;
  }
  .row.header-row1 {
  }
  .ui.negative {
    margin: 0 auto;
  }
</style>
