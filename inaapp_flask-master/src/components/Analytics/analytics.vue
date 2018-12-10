<template>
  <div>
    <!-- Following Menu -->
    <!--
            <div class="ui large top fixed hidden menu">
              <div class="ui container">
                <a class="active item">Home</a>
                <a class="item">Index</a>
                <a class="item">Uploads</a>
                <a class="item">Analytics</a>
                <a class="item">Toolbox</a>
                <a class="item">Tutorial</a>
                <a class="item">Job opportunities</a>
                <div class="right menu">
                  <div class="item">
                    <a class="ui button">Log in</a>
                  </div>
                </div>
              </div>
            </div>
        -->

    <!-- Page Contents -->
    <div class="pusher">
      <div class="ui inverted vertical center aligned segment">
        <div class="ui container">
          <div class="ui secondary inverted pointing menu" style="border: 0px;">
            <a href="/" class="item">Home</a>
            <a class="item">Test</a>
            <a href="/index" class="item">Index</a>
            <a class="item">Uploads</a>
            <a href="/analytics" class="active item">Analytics</a>
            <a class="item">Toolbox</a>
            <a class="item">Docs</a>
            <a class="item">Get Involved</a>
            <div class="right item">
              <a class="ui inverted button" @click="login">Log in</a>
            </div>
          </div>
        </div>

        <div class="ui inverted vertical center aligned segment" style="margin-top: 20px;">
          <div class="ui container grid">
            <div class="three wide column">
              <div style="color: #3c78d8;">
                <b>Drive Info.</b>
              </div>
              <div>
                <!--
                                    <form method="post" action="/d00_a01_gpsroute" style="border:0px;background:none;" onsubmit="onsub_addSelectedFirst()">
                                -->

                <a id="plot_d00_a01_gps_dir" @click="plot_d00_a01_gps_dir_click" class="options">GPS/speed/nmot/rl</a>
                <br />
                <a id="plot_d00_a02_fho_dir" @click.prevent="plot_d00_a02_fho_dir_click" class="options">fho/tumg/tans/tmot/tmst</a>
                <br />
                <!--
                                    <form style="border:0px;background:none;" onsubmit="plot_d00_a01_gps_dir()">
                                      <input type="text" class="requestedFilesValues" name="requestedFiles" style="display: none;">
                                      <input type="submit" value="gps/speed/nmot/rl" style="color: gray; border:0px;background:none; cursor:pointer; outline:none;">
                                    </form>
                                -->
              </div>

              <!--
                                <div>
                                  <form action="/d00_a02_fho" method="post" style="border:0px;background:none;" onsubmit="onsub_addSelectedFirst()">
                                    <input type="text" class="requestedFilesValues" name="requestedFiles" style="display: none;">
                                    <input type="submit" value="fho/tumg/tans/tmot/tmst" style="color: gray; border:0px;background:none; cursor:pointer; outline:none;">
                                  </form>
                                </div>
                            -->
            </div>

            <div class="three wide column">
              <div style="color: #3c78d8;">
                <b>Basic calibration</b>
              </div>
              <a id="plot_d00_b01_epm_dir" @click.prevent="plot_d00_b01_epm_dir_click" class="options">EPM</a>
              <br />
              <a id="plot_d00_b02_lambdaadap_dir" @click="plot_d00_b02_lambdaadap_dir_click" class="options">Lambda adap</a>
              <br />

              <!--
                                <div>
                                  <form action="/d00_b01_epm" method="post" style="border:0px;background:none;" onsubmit="onsub_addSelectedFirst()">
                                    <input type="text" class="requestedFilesValues" name="requestedFiles" style="display: none;">
                                    <input type="submit" value="epm" style="color: gray; border:0px;background:none; cursor:pointer; outline:none;">
                                  </form>
                                </div>

                                <div>
                                  <form action="/d00_b02_lambdaadap" method="post" style="border:0px;background:none;" onsubmit="onsub_addSelectedFirst()">
                                    <input type="text" class="requestedFilesValues" name="requestedFiles" style="display: none;">
                                    <input type="submit" value="lambda adap" style="color: gray; border:0px;background:none; cursor:pointer; outline:none;">
                                  </form>
                                </div>
                            -->

              <div style="color: gray">
                <!-- /d00_b03_vvladap -->
                <a style="color: rgb(197, 129, 129)"> VVL adap </a>
              </div>

              <div style="color: gray">
                <!-- /d00_b04_hfm -->
                <a style="color: rgb(197, 129, 129)"> HFM </a>
              </div>

              <div style="color: rgb(197, 129, 129)">ATM</div>
              <div style="color: rgb(197, 129, 129)">Start</div>
            </div>

            <div class="three wide column">
              <div style="color: #3c78d8;">
                <b>OBD</b>
              </div>
              <div style="color: rgb(197, 129, 129)">Fault count</div>
              <div style="color: rgb(197, 129, 129)">OSC</div>
              <div style="color: rgb(197, 129, 129)">LSU dynamic</div>
              <div style="color: rgb(197, 129, 129)">LSU offset</div>
              <div style="color: rgb(197, 129, 129)">LSF dynamic</div>
              <div style="color: rgb(197, 129, 129)">LSU/LSF heating</div>

              <a id="plot_d00_b07_iumpr_dir" @click="plot_d00_b07_iumpr_dir_click" class="options">IUMPR</a>

              <!--
                                <div>
                                  <form action="/d00_b07_iumpr" method="post" style="border:0px;background:none;" onsubmit="onsub_addSelectedFirst()">
                                    <input type="text" class="requestedFilesValues" name="requestedFiles" style="display: none;">
                                    <input type="submit" value="lambda adap" style="color: gray; border:0px;background:none; cursor:pointer; outline:none;">
                                  </form>
                                </div>
                            -->

              <div style="color: rgb(197, 129, 129)">HPFS</div>
              <div style="color: rgb(197, 129, 129)">Misfire</div>
            </div>

            <div class="three wide column">
              <div style="color: #3c78d8;">
                <b>Safety Torque</b>
              </div>
              <div style="color: rgb(197, 129, 129)">Torque monitoring</div>
              <div></div>
              <div style="color: #3c78d8;">
                <b>Knock</b>
              </div>
              <div style="color: rgb(197, 129, 129)">Overview</div>
              <div style="color: rgb(197, 129, 129)">Knock adap</div>
              <div style="color: rgb(197, 129, 129)">Super knock</div>
              <div style="color: rgb(197, 129, 129)">Knock sensor</div>
              <div style="color: rgb(197, 129, 129)">Noise ref</div>
            </div>

            <div class="three wide column">
              <div style="color: #3c78d8;">
                <b>PFA</b>
              </div>
              <div style="color: rgb(197, 129, 129)">Start-stop</div>
              <div style="color: rgb(197, 129, 129)">SOC</div>
              <div style="color: rgb(197, 129, 129)">Cruise speed</div>
              <div style="color: rgb(197, 129, 129)">Coolant</div>
              <div style="color: rgb(197, 129, 129)">Turbo</div>
            </div>
          </div>
        </div>
      </div>

      <div style="background: white; min-height: 800px;">
        <div class="ui vertical segment">
          <div class="ui container">
            <!-- 页面功能键 -->
            <div style="height: 50px;">
              <div class="ui icon buttons" style="float: left;">
                <button id="data_selection_btn" class="ui facebook button" style="width: 60px;" data-tooltip="change data source" data-position="top left">
                  <i class="archive icon"></i>
                </button>

                <button class="ui  facebook button" style="width: 60px;" data-tooltip="file out pdf document" data-position="top left">
                  <i class="file pdf outline icon"></i>
                </button>

                <button class="ui  facebook button" style="width: 60px;" data-tooltip="summary check" data-position="top left">
                  <i class="bug icon"></i>
                </button>

                <button class="ui  facebook button" style="width: 60px;" data-tooltip="point to previous selected data source" data-position="top left">
                  <i class="arrow alternate circle left outline icon"></i>
                </button>

                <button class="ui  facebook button" style="width: 60px;" data-tooltip="point to next selected data source" data-position="top left">
                  <i class="arrow alternate circle right outline icon"></i>
                </button>
              </div>

              <!-- dropdown file -->
              <div style="float: left; margin-left: 10px; width: 450px;">
                <form class="ui form">
                  <div class="field">
                    <div class="ui selection dropdown" style="width: 450px;" id="selecte_file_message" name="selectedDropownfiles">
                      <div class="text" ref="fileMessage"></div>
                      <i class="dropdown icon"></i>
                    </div>
                  </div>
                </form>
              </div>

              <button class="ui facebook button" style="float: left; margin-left: 10px;" id="btn_submit_analysis" @click="submitData">
                replot
              </button>
            </div>

            <!-- modal -->
            <div class="ui modal" style="max-height:800px;">
              <i class="close icon"></i>
              <div class="header">Select data for analysis</div>
              <div class="scrolling content">
                <h4>Index Condition</h4>

                <div>
                  <select id="sel_projectnum" class="ui search dropdown filindex">
                    <option value="" disabled selected style="display:none;">project no.</option>
                  </select>

                  <select id="sel_vehnum" class="ui search dropdown filindex">
                    <option value="" disabled selected style="display:none;">vehicle no.</option>
                  </select>

                  <select id="sel_devnum" class="ui search dropdown filindex">
                    <option value="" disabled selected style="display:none;">device no.</option>
                  </select>
                </div>

                <div style="margin-top: 1px;">
                  <select id="sel_package" class="ui search dropdown filindex">
                    <option value="" disabled selected style="display:none;">package</option>
                  </select>

                  <select id="sel_testitem" class="ui search dropdown filindex">
                    <option value="" disabled selected style="display:none;">test item</option>
                  </select>
                </div>

                <div style="margin-top: 1px;">
                  <div class="ui calendar" id="example1" style="display: inline;">
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="text" placeholder="start time" />
                    </div>
                  </div>

                  <div class="ui calendar" id="example2" style="display: inline;">
                    <div class="ui input left icon">
                      <i class="calendar icon"></i>
                      <input type="text" placeholder="end time" />
                    </div>
                  </div>
                </div>

                <br />

                <button id="btn_clear" class="mini ui primary button" @click="emptyData">
                  Clear Selection
                </button>

                <button id="btn_search" class="mini ui primary button" @click="searchData">
                  Search
                </button>

                <div class="ui divider"></div>

                <h4>Index Result</h4>

                <div>
                  <table id="select_datatable" class="ui celled table">
                    <thead>
                      <tr>
                        <th>no</th>
                        <th>selected</th>
                        <th>filename</th>
                        <th>time</th>
                        <th>size</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>

              <div class="actions">
                <div class="ui small black deny button">No</div>
                <div class="ui small positive button" id="btn_checkfile" @click="checkData">Yes</div>
              </div>
            </div>
          </div>
        </div>

        <gpsroute ref="aaa" :slectedfiles="slectedfiles"></gpsroute>
        <fho ref="fho" :slectedfiles="slectedfiles"></fho>
        <epm ref="epm" :slectedfiles="slectedfiles"></epm>
        <lambdaadap ref="lambdaadap" :slectedfiles="slectedfiles"></lambdaadap>
        <iumpr ref="iumpr" :slectedfiles="slectedfiles"></iumpr>
      </div>
    </div>

    <!-- footer -->
    <div class="ui inverted vertical footer segment">
      <div class="ui container">
        <div class="ui stackable inverted divided equal height stackable grid">
          <div class="three wide column">
            <h4 class="ui inverted header">About</h4>
            <div class="ui inverted link list">
              <a href="#" class="item">Sitemap</a>
              <a href="#" class="item">Contact us</a>
              <a href="#" class="item">INA vision</a>
              <a href="#" class="item">Future program</a>
            </div>
          </div>
          <div class="four wide column">
            <h4 class="ui inverted header">Services</h4>
            <div class="ui inverted link list">
              <a href="#" class="item">Data remote measure</a>
              <a href="#" class="item">Big data management</a>
              <a href="#" class="item">Data analytics</a>
              <a href="#" class="item">Online calibration tool</a>
              <a href="#" class="item">Qquality monitoring program</a>
            </div>
          </div>
          <div class="six wide column">
            <h4 class="ui inverted header">INA Group</h4>
            <p>
              UAES 2018. All rights reserved, also regarding any disposal, exploitation, reproduction, editing, distribution, as well as in the event of applications for industrial property rights.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>



<script>
  import '../../assets/analytics.js'
  import '../../assets/Highcharts-6.1.1/Highcharts-6.1.1/code/highcharts.js'
  // import gpsroute from '../Canvas/gpsroute.vue'
  // import fho from '../Canvas/fho.vue'
  // import epm from '../Canvas/epm.vue'
  // import lambdaadap from '../Canvas/lambdaadap.vue'
  // import iumpr from '../Canvas/iumpr.vue'

  const gpsroute = () => import('../Canvas/gpsroute.vue')
  const fho = () => import('../Canvas/fho.vue')
  const epm = () => import('../Canvas/epm.vue')
  const lambdaadap = () => import('../Canvas/lambdaadap.vue')
  const iumpr = () => import('../Canvas/iumpr.vue')

  // Vue.use(analytics)

  export default {
    data() {
      return {
        startTime: '',
        endTime: '',
        slectedfiles: [],
        str_json: ''
      }
    },
    components: {
      gpsroute,
      fho,
      epm,
      lambdaadap,
      iumpr
    },
    mounted() {
      $.ajax({
        type: 'POST',
        url:
          'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/file/selectFilePrompt',
        dataType: 'json',
        success: function(data) {
          var projectList = data['data']['projectNumberList'].sort()
          var carNumberList = data['data']['carNumberList'].sort()
          var deviceNumberList = data['data']['deviceNumberList'].sort()
          var workPackageList = data['data']['workPackageList'].sort()
          var testItemList = data['data']['testItemList'].sort()

          var default_sel
          for (var i = 0; i < projectList.length; i++) {
            if (projectList[i] != null) {
              default_sel = document.createElement('option')
              default_sel.value = projectList[i]
              default_sel.innerHTML = projectList[i]
              $('#sel_projectnum').append(default_sel)
            }
          }

          for (var i = 0; i < carNumberList.length; i++) {
            if (carNumberList[i] != null) {
              default_sel = document.createElement('option')
              default_sel.value = carNumberList[i]
              default_sel.innerHTML = carNumberList[i]
              $('#sel_vehnum').append(default_sel)
            }
          }

          for (var i = 0; i < deviceNumberList.length; i++) {
            if (deviceNumberList[i] != null) {
              default_sel = document.createElement('option')
              default_sel.value = deviceNumberList[i]
              default_sel.innerHTML = deviceNumberList[i]
              $('#sel_devnum').append(default_sel)
            }
          }

          for (var i = 0; i < workPackageList.length; i++) {
            if (workPackageList[i] != null) {
              default_sel = document.createElement('option')
              default_sel.value = workPackageList[i]
              default_sel.innerHTML = workPackageList[i]
              $('#sel_package').append(default_sel)
            }
          }

          for (var i = 0; i < testItemList.length; i++) {
            if (testItemList[i] != null) {
              default_sel = document.createElement('option')
              default_sel.value = testItemList[i]
              default_sel.innerHTML = testItemList[i]
              $('#sel_testitem').append(default_sel)
            }
          }
        },
        error: function(e) {}
      })
      ///
      $('#select_datatable').DataTable({
        columns: [
          { data: 'no' },
          {
            data: 'name',
            render: function(data, type, full, meta) {
              return (
                `<div class="ui checkbox">
                                                                                                                                                                                                                                                                                <input type="checkbox" class="selectedfiles"  name="` +
                data +
                `">
                                                                                                                                                                                                                                                                                <label></label>
                                                                                                                                                                                                                                                                              </div>`
              )
            }
          },
          { data: 'name' },
          { data: 'time' },
          { data: 'size' }
        ]
      }),
        ////
        $('.ui.dropdown').dropdown(),
        ////
        $('.ui.modal')
          .modal({
            autofocus: false,
            onVisible: function() {},
            onApprove: function() {}
          })
          .modal('attach events', '#data_selection_btn'),
        ///

        this.Recalendar()
    },

    //
    methods: {
      // previous(){
      //   var that=this;
      //       $('#selecte_file_message').dropdown(
      //     'set selected',
      //     that.slectedfiles[0].value
      //   )

      // },
      submitData() {
        this.$refs.aaa.submit()
        this.$refs.fho.submit()
        this.$refs.epm.submit()
        this.$refs.lambdaadap.submit()
        this.$refs.iumpr.submit()
      },
      login() {
        this.$router.push('/login')
      },
      Recalendar() {
        var that = this
        $('#example1').calendar({
          disableYear: true,
          disableMinute: true,
          ampm: false,
          today: true,
          startMode: 'hour',
          formatter: {
            date: function(date, settings) {
              var year = date.getFullYear()
              var month = date.getMonth() + 1
              if (month < 10) month = '0' + month
              var day = date.getDate()
              if (day < 10) day = '0' + day
              return year + '-' + month + '-' + day
            },
            time: function(date, settings, forCalendar) {
              var hour = date.getHours()
              var minute = date.getMinutes()
              if (hour < 10) hour = '0' + hour
              if (minute < 10) minute = '0' + minute
              return hour + ':' + minute + ':00'
            }
          },
          onChange: function(date, text, mode) {
            that.startTime = text
          }
        })
        ///
        $('#example2').calendar({
          disableYear: true,
          disableMinute: true,
          ampm: false,
          today: true,
          startMode: 'hour',
          formatter: {
            date: function(date, settings) {
              var year = date.getFullYear()
              var month = date.getMonth() + 1
              if (month < 10) month = '0' + month
              var day = date.getDate()
              if (day < 10) day = '0' + day

              return year + '-' + month + '-' + day
            },
            time: function(date, settings, forCalendar) {
              var hour = date.getHours()
              var minute = date.getMinutes()
              if (hour < 10) hour = '0' + hour
              if (minute < 10) minute = '0' + minute
              return hour + ':' + minute + ':00'
            }
          },
          onChange: function(date, text, mode) {
            that.endTime = text
          }
        })
      },
      emptyData() {
        $('.ui.search.dropdown.filindex').dropdown('clear')
        $('.ui.calendar').calendar('clear')

        var table = $('#select_datatable').DataTable()
        table.rows().remove()
        table.draw()
      },
      searchData() {
        var checkProjectNumber

        if (!$('#sel_projectnum').val()) {
          checkProjectNumber = ''
        } else {
          checkProjectNumber = $('#sel_projectnum').val()
        }

        var checkCarNumber
        if (!$('#sel_vehnum').val()) {
          checkCarNumber = ''
        } else {
          checkCarNumber = $('#sel_vehnum').val()
        }

        var checkDevNumber
        if (!$('#sel_devnum').val()) {
          checkDevNumber = ''
        } else {
          checkDevNumber = $('#sel_devnum').val()
        }

        var checkPack
        if (!$('#sel_package').val()) {
          checkPack = ''
        } else {
          checkPack = $('#sel_package').val()
        }

        var checkTask
        if (!$('#sel_testitem').val()) {
          checkTask = ''
        } else {
          checkTask = $('#sel_testitem').val()
        }

        var checkStartTime
        if (!this.startTime) {
          checkStartTime = ''
        } else {
          checkStartTime = this.startTime
        }

        var checkEndTime
        if (!this.endTime) {
          checkEndTime = ''
        } else {
          checkEndTime = this.endTime
        }

        this.str_json = JSON.stringify({
          startTime: checkStartTime,
          endTime: checkEndTime,
          projectNumber: checkProjectNumber,
          carNumber: checkCarNumber,
          workPackage: checkPack,
          testItem: checkTask,
          deviceNumber: checkDevNumber
        })
        console.log(this.str_json)
        // construct info table
        $.ajax({
          type: 'POST',
          url:
            'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/file/selectFile',
          data: {
            jsonParam: this.str_json
          },
          dataType: 'json',
          success: function(data) {
            // console.log(this.str_json)
            var tabledata = []

            for (var i = 0; i < data['data'].length; i++) {
              tabledata.push({
                no: i + 1,
                selected: 0,
                name: data['data'][i]['fileName'],
                time: data['data'][i]['createTime'],
                size: data['data'][i]['fileSize']
              })
            }

            var table = $('#select_datatable').DataTable()

            table.rows().remove()
            table.rows.add(tabledata)
            table.draw()
          },
          error: function(red) {
            console.log('request error')
          }
        })
      },
      //点击YES
      checkData() {
        this.slectedfiles = []
        var selectedfilesCounter = 0
        let that = this
        $('.selectedfiles').each(function() {
          if ($(this)[0].checked == true) {
            that.slectedfiles.push({
              // ???
              name: $(this)[0].name,
              value: $(this)[0].name
            })
            console.log(that.slectedfiles)
          }
        })
        $('#selecte_file_message').dropdown({
          values: that.slectedfiles
        })
        console.log()
        $('#selecte_file_message').dropdown(
          'set selected',
          that.slectedfiles[0].value
        )
        // if ($('#selecte_file_message').dropdown('get value') != '') {
        //   this.$refs.aaa.submit()
        //   this.$refs.fho.submit()
        //   this.$refs.epm.submit()
        //   this.$refs.lambdaadap.submit()
        //   this.$refs.iumpr.submit()
        // }
      },
      //
      plot_d00_a01_gps_dir_click() {
        this.$refs.aaa.plot_d00_a01_gps()
      },
      plot_d00_a02_fho_dir_click() {
        this.$refs.fho.plot_d00_a02_fho()
      },
      plot_d00_b01_epm_dir_click() {
        this.$refs.epm.plot_d00_b01_epm()
      },
      plot_d00_b02_lambdaadap_dir_click() {
        this.$refs.lambdaadap.plot_d00_b02_lambdaadap()
      },
      plot_d00_b07_iumpr_dir_click() {
        this.$refs.iumpr.plot_d00_b07_iumpr()
      }
      //地图
    }
  }
</script>

<style scoped>
  .options {
    color: gray;
    border: 0px;
    background: none;
    cursor: pointer;
    outline: none;
  }

  .hidden.menu {
    display: none;
  }

  .masthead.segment {
    min-height: 700px;
    padding: 1em 0em;
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
