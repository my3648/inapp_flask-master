<template>
  <div>
    <!-- Following Menu -->
    <div class="ui large top fixed hidden menu">
      <div class="ui container">
        <a class="active item">Home</a>
        <a class="item">Test</a>
        <a class="item">Index</a>
        <a class="item">Uploads</a>
        <a class="item">Analytics</a>
        <a class="item">Toolbox</a>
        <a class="item">Docs</a>
        <a class="item">Get Involved</a>
        <div class="right menu">
          <div class="item">
            <a class="ui button" @click="login">Log in</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Page Contents -->
    <div class="pusher">
      <div class="ui inverted vertical center aligned segment">
        <div class="ui container">
          <div class="ui secondary inverted pointing menu" style="border: 0px;">
            <a href="/" class="item">Home</a>
            <a class="item">Test</a>
            <a href="/index" class="active item">Index</a>
            <a class="item">Uploads</a>
            <a href="/analytics" class="item">Analytics</a>
            <a class="item">Toolbox</a>
            <a class="item">Docs</a>
            <a class="item">Get Involved</a>
            <div class="right item">
              <a class="ui inverted button">Log in</a>
            </div>
          </div>
        </div>
      </div>

      <div style="background: white; min-height: 800px;">

        <div class="ui vertical segment">
          <div class="ui container">
            <h4>Index Condition</h4>

            <div>

              <select id="sel_projectnum" class="ui search dropdown filindex">
                <option value='' disabled selected style='display:none;'>project no.</option>
              </select>

              <select id="sel_vehnum" class="ui search dropdown filindex">
                <option value='' disabled selected style='display:none;'>vehicle no.</option>
              </select>

              <select id="sel_devnum" class="ui search dropdown filindex">
                <option value='' disabled selected style='display:none;'>device no.</option>
              </select>

            </div>

            <div style="margin-top: 1px;">
              <select id="sel_package" class="ui search dropdown filindex">
                <option value='' disabled selected style='display:none;'>package</option>
              </select>

              <select id="sel_testitem" class="ui search dropdown filindex">
                <option value='' disabled selected style='display:none;'>test item</option>
              </select>
            </div>

            <div style="margin-top: 1px;">
              <div class="ui calendar" id="example1" style="display: inline;">
                <div class="ui input left icon">
                  <i class="calendar icon"></i>
                  <input type="text" placeholder="start time" ref="timeinput1">
                </div>
              </div>

              <div class="ui calendar" id="example2" style="display: inline;">
                <div class="ui input left icon">
                  <i class="calendar icon"></i>
                  <input type="text" placeholder="end time" ref="timeinput2">
                </div>
              </div>
            </div>

            <br/>

            <button id="btn_clear" class="mini ui primary button" @click="emptyData">
              Clear Selection
            </button>

            <button id="btn_search" class="mini ui primary button" @click="searchData">
              Search
            </button>

            <!-- <button id="btn_checkfile" class="mini ui primary button">
            find
          </button> -->

            <div class="ui divider"></div>

            <h4>Index Result</h4>

            <div>
              <table id="select_datatable" class="ui celled table">
                <thead>
                  <tr>
                    <th>no</th>
                    <th>selected</th>
                    <th>filename</th>
                    <th>tags</th>
                    <th>time</th>
                    <th>size</th>
                    <th>link</th>
                    <th>extra</th>
                  </tr>
                </thead>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>

    <div class="ui checkbox"></div>
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
  // require('datatables.net')
  // require('datatables.net-dt')

  export default {
    mounted() {
      $('.ui.dropdown').dropdown()
      this.req()
      $('#select_datatable').DataTable(this.tableData)
      this.Recalendar()
    },
    data() {
      return {
        fileSelect: '',
        startTime: '',
        endTime: '',
        projectList: '',
        carNumberList: '',
        deviceNumberList: '',
        workPackageList: '',
        testItemList: '',
        tableData: {
          columns: [
            { data: 'no' },
            {
              data: 'name',
              render: function(data, type, full, meta) {
                return (
                  `<div class="ui checkbox">
                                                                                                                                                                                                                                                                                                                                                        <input type="checkbox" class="selectedfiles" name="` +
                  data +
                  `">
                                                                                                                                                                                                                                                                                                                                                        <label></label>
                                                                                                                                                                                                                                                                                                                                                      </div>`
                )
              }
            },
            { data: 'name' },
            { data: 'tags' },
            { data: 'time' },
            { data: 'size' },
            {
              data: 'link',
              render: function(data, type, full, meta) {
                return '<a href="' + data + '">download</a>'
              }
            },
            {
              data: 'extra',
              render: function(data, type, full, meta) {
                return `<button class="circular ui icon button">
                                                                                                                                                                                                                                                                                                                                                                <i class="icon settings"></i>
                                                                                                                                                                                                                                                                                                                                                              </button>`
              }
            }
          ]
        },

        str_json: ''
      }
    },
    methods: {
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
      async req() {
        const res = await this.$http.post(
          'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/file/selectFilePrompt'
        )
        console.log(res)
        const { data, meta } = res.data
        this.projectList = data['projectNumberList'].sort()

        this.carNumberList = data['carNumberList'].sort()
        this.deviceNumberList = data['deviceNumberList'].sort()
        this.workPackageList = data['workPackageList'].sort()
        this.testItemList = data['testItemList'].sort()

        var default_sel

        for (var i = 0; i < this.projectList.length; i++) {
          if (this.projectList[i] != null) {
            default_sel = document.createElement('option')
            default_sel.value = this.projectList[i]
            default_sel.innerHTML = this.projectList[i]
            $('#sel_projectnum').append(default_sel)
          }
        }

        for (var i = 0; i < this.carNumberList.length; i++) {
          if (this.carNumberList[i] != null) {
            default_sel = document.createElement('option')
            default_sel.value = this.carNumberList[i]
            default_sel.innerHTML = this.carNumberList[i]
            $('#sel_vehnum').append(default_sel)
          }
        }

        for (var i = 0; i < this.deviceNumberList.length; i++) {
          if (this.deviceNumberList[i] != null) {
            default_sel = document.createElement('option')
            default_sel.value = this.deviceNumberList[i]
            default_sel.innerHTML = this.deviceNumberList[i]
            $('#sel_devnum').append(default_sel)
          }
        }

        for (var i = 0; i < this.workPackageList.length; i++) {
          if (this.workPackageList[i] != null) {
            default_sel = document.createElement('option')
            default_sel.value = this.workPackageList[i]
            default_sel.innerHTML = this.workPackageList[i]
            $('#sel_package').append(default_sel)
          }
        }

        for (var i = 0; i < this.testItemList.length; i++) {
          if (this.testItemList[i] != null) {
            default_sel = document.createElement('option')
            default_sel.value = this.testItemList[i]
            default_sel.innerHTML = this.testItemList[i]
            $('#sel_testitem').append(default_sel)
          }
        }
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
        console.log(this.startTime)
        if (!this.startTime) {
          checkStartTime = ''
        } else {
          checkStartTime = this.startTime
          console.log(2)
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
        this.requestData(this.str_json)
      },
      requestData(str) {
        $.ajax({
          type: 'POST',
          url:
            'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/file/selectFile',
          data: {
            jsonParam: str
          },
          dataType: 'json',
          success: function(data) {
            console.log(data)

            var tabledata = []

            for (var i = 0; i < data['data'].length; i++) {
              tabledata.push({
                no: i + 1,
                selected: 0,
                name: data['data'][i]['fileName'],
                tags: '',
                time: data['data'][i]['createTime'],
                size: data['data'][i]['fileSize'],
                link: data['data'][i]['fileUrl'],
                extra: ''
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
      }
      // onInput1() {
      //   console.log(1)
      //   this.startTime = this.$refs.timeinput1.val()
      // },
      // onInput2() {
      //   this.endTime = this.$refs.timeinput2.val()
      // }
    }
  }
</script>

<style scoped>
  /* @import '../../assets/DataTables/datatables.min.css'; */

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
