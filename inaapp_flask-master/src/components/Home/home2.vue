<template>
  <div>

    <div class="pusher">
      <div style="width: 100%; position:absolute; z-index:1;
    height: 800px">
        <div class="vid-wrappper">
          <video autoplay="autoplay" loop="true">
            <source src="../../assets/urcs.mp4" type="video/mp4">
          </video>
        </div>
      </div>
      <div class="ui inverted vertical masthead center aligned segment" style="opacity: 0.85; background: black;z-index:2">

        <!-- //导航栏 -->
        <div style="position:absolute; ; width: 100%;">
          <div class="ui container">
            <div class="ui secondary inverted pointing menu" style="border: 0px;">
              <a href="/" class="active item">Home</a>
              <a class="item">Test</a>
              <a href="/index" class="item">Index</a>
              <a class="item">Uploads</a>
              <a href="/analytics" class="item">Analytics</a>
              <a class="item">Toolbox</a>
              <a class="item">Docs</a>
              <a class="item">Get Involved</a>
              <div class="right item">
                <a class="ui inverted button" @click="login">Log in</a>
              </div>
            </div>
          </div>
          <!-- 中部大字 -->
          <div class="ui text container">
            <h1 class="ui inverted header">
              INA URCS
            </h1>
            <h2>Remote measure, data-insighted apps, intelligence</h2>
            <!-- <div class="ui huge primary button">Get Started <i class="right arrow icon"></i></div> -->
          </div>
        </div>

      </div>
      <!-- 中间 -->
      <div class="ui vertical stripe segment">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="eight wide column">
              <h3 class="ui header">We Help Automotive Engineers</h3>
              <p>We empower calibraion engineers with capability to insight into measure data. Delight each one and extend possibilities...through could data-analytics.</p>
              <h3 class="ui header">We Make Data Product That Fly in the Air</h3>
              <p>You might thought it was the stuff of dreams, but exhaustive test and analytics can be intelligently re-engineered.</p>
            </div>
            <div class="six wide right floated column">
              <img src="/static/big-data-circle.jpg" class="ui large bordered rounded image">
            </div>
          </div>
          <div class="row">
            <div class="center aligned column">
              <a class="ui huge button" id="btn_test">Read more</a>
            </div>
          </div>
        </div>
      </div>
      <!-- About us -->
      <div class="ui vertical stripe segment" style="background: #d9d9d9">
        <div class="ui middle aligned stackable grid container">
          <div class="row">
            <div class="twelve wide column">
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>
              <button class="circular ui icon button" style="height: 140px; width: 140px; margin: 20px;">
                <!-- <i class="icon settings"></i> -->
              </button>

            </div>
            <div class="three wide column">
              <h3 class="ui header">About Us</h3>
              <p>A cluster of data science Geek</p>
            </div>
          </div>
        </div>
      </div>

    </div>

    <div class="ui inverted vertical footer segment">
      <div class="ui container">
        <div class="ui stackable inverted divided equal height stackable grid">

          <div class="three wide column">
            <h4 class="ui inverted header">ABOUT URCS</h4>
            <div class="ui inverted link list">
              <a href="#" class="item">About URCS</a>
              <a href="#" class="item">Documentation</a>
              <a href="#" class="item">Support / Contact Us</a>
              <a href="#" class="item">FAQ</a>
              <a href="#" class="item">URCS Weekly</a>
            </div>
          </div>

          <div class="four wide column">
            <h4 class="ui inverted header">INNOVATION</h4>
            <div class="ui inverted link list">
              <a href="#" class="item">Infrastructure</a>
              <a href="#" class="item">Technical</a>
              <a href="#" class="item">Quality monitoring program</a>
              <a href="#" class="item">Future programs</a>
            </div>
          </div>

          <div class="six wide column">
            <h4 class="ui inverted header">INA GROUP</h4>
            <p> UAES 2018. All rights reserved, also regarding any disposal, exploitation, reproduction, editing, distribution, as well as in the event of applications for industrial property rights.</p>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    mounted() {
      $('.masthead').visibility({
        once: false,
        onBottomPassed: function() {
          $('.fixed.menu').transition('fade in')
        },
        onBottomPassedReverse: function() {
          $('.fixed.menu').transition('fade out')
        }
      })
      // create sidebar and attach to menu open
      // $('.ui.sidebar')
      //   .sidebar('attach events', '.toc.item');
    },
    methods: {
      login() {
        this.$router.push('/login')
      }
    }
  }
</script>

 <style scoped>
  .vid-wrappper {
    width: 100%;
    position: relative;
    padding-bottom: 42.06%; /*需要用padding来维持16:9比例,也就是9除以16*/
    height: 0;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
  }

  .hidden.menu {
    display: none;
  }

  .masthead.segment {
    min-height: 800px;
    padding: 0em 0em;
  }

  .masthead .logo.item img {
    margin-right: 1em;
  }

  .masthead .ui.menu .ui.button {
    margin-left: 0.5em;
  }

  .masthead h1.ui.header {
    margin-top: 3em;
    margin-bottom: 0em;
    font-size: 4em;
    font-weight: normal;
  }

  .masthead h2 {
    font-size: 1.7em;
    font-weight: normal;
  }

  .ui.vertical.stripe {
    padding: 8em 0em;
  }

  .ui.vertical.stripe h3 {
    font-size: 2em;
  }

  .ui.vertical.stripe .button + h3,
  .ui.vertical.stripe p + h3 {
    margin-top: 3em;
  }

  .ui.vertical.stripe .floated.image {
    clear: both;
  }

  .ui.vertical.stripe p {
    font-size: 1.33em;
  }

  .ui.vertical.stripe .horizontal.divider {
    margin: 3em 0em;
  }

  .quote.stripe.segment {
    padding: 0em;
  }

  .quote.stripe.segment .grid .column {
    padding-top: 5em;
    padding-bottom: 5em;
  }

  .footer.segment {
    padding: 5em 0em;
  }

  .secondary.pointing.menu .toc.item {
    display: none;
  }

  @media only screen and (max-width: 700px) {
    .ui.fixed.menu {
      display: none !important;
    }
    .secondary.pointing.menu .item,
    .secondary.pointing.menu .menu {
      display: none;
    }
    .secondary.pointing.menu .toc.item {
      display: block;
    }
    .masthead.segment {
      min-height: 350px;
    }
    .masthead h1.ui.header {
      font-size: 2em;
      margin-top: 1.5em;
    }
    .masthead h2 {
      margin-top: 0.5em;
      font-size: 1.5em;
    }
  }
</style>








  
