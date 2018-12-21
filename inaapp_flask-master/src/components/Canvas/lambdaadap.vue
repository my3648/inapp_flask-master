<template>
  <div id="plotBody"></div>
</template>

<script >
  export default {
    data() {
      return {
        plotdata: '',

        fileoptions_jsonOBJ: []
      }
    },
    props: ['startTime', 'endTime', 'slectedfiles', 'str_json', 'CanvasType'],
    methods: {
      plot_d00_b02_lambdaadap() {
        // this.CanvasType = 'lambdaadap'
        this.fileoptions_jsonOBJ = this.slectedfiles
        var that = this
        if ($('#selecte_file_message').dropdown('get value') != '') {
          that.submit()
        }
        $('#plotBody').html(`
                                                              <div style="height: 350px; ">
                                  <!-- fra series -->
                                  <div id="div_fra_series" style="width: 65%; height: 100%; float: left;"></div>
                                  <!-- fra distr-->
                                  <div id="div_fra_distr" style="width: 35%; height: 100%; float: left;"></div>
                                </div>

                                <div style="height: 350px; ">
                                  <!-- frm series-->
                                  <div id="div_frm_series" style="width: 65%; height: 100%; float: left;"></div>
                                  <!-- frm distr-->
                                  <div id="div_frm_distr" style="width: 35%; height: 100%; float: left;"></div>
                                </div>
                                                              `)
        console.log(that.fileoptions_jsonOBJ)

        $('#selecte_file_message').dropdown({
          values: that.fileoptions_jsonOBJ['value'],
          onChange: function(value, text, $selectedItem) {
            that.submit()
          }
        })

        $('#selecte_file_message').dropdown(
          'set value',
          that.fileoptions_jsonOBJ['selected']
        )

        $('.requestedFilesValues').attr(
          'value',
          JSON.stringify({
            files: that.fileoptions_jsonOBJ['value'],
            selected: that.fileoptions_jsonOBJ['selected']
          })
        )
      },
      submit() {
        var that = this
        if ($('#selecte_file_message').dropdown('get value') != '') {
          $.ajax({
            type: 'POST',
            url:
              'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
            data: {
              fileName: $('#selecte_file_message').dropdown('get value'),
              type: 'd00_b02_lambdaadap'
            },
            dataType: 'json',
            // url: "/d00_b02_lambdaadap_data",
            // type: "get",
            // dataType: "json",
            success: function(data) {
              console.log(data)
              that.plotdata = JSON.parse(data['value'])

              setTimeout(function() {
                var fra_series_chart = Highcharts.chart('div_fra_series', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    marginLeft: 70
                  },
                  title: {
                    text: 'fra timeseries',
                    style: {
                      color: '#7f7f7f',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }
                  },
                  credits: {
                    enabled: false
                  },
                  xAxis: {
                    title: {
                      text: 'time'
                    }
                  },
                  yAxis: {
                    min: 0.75,
                    max: 1.25,
                    title: {
                      text: 'fra'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['fra_series'],
                      turboThreshold: 0,
                      lineWidth: 2
                    }
                  ]
                })

                var fra_distr_chart = Highcharts.chart('div_fra_distr', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'fra distribution',
                    style: {
                      color: '#7f7f7f',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }
                  },
                  credits: {
                    enabled: false
                  },
                  xAxis: {
                    max: that.plotdata['fra_distr_x'].length - 1,
                    categories: that.plotdata['fra_distr_x'],
                    title: {
                      text: 'fra'
                    }
                  },
                  yAxis: {
                    title: {
                      text: 'count'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      type: 'column',
                      data: that.plotdata['fra_distr_y'],
                      turboThreshold: 0,
                      lineWidth: 3
                    }
                  ]
                })

                var frm_series_chart = Highcharts.chart('div_frm_series', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    marginLeft: 70
                  },
                  title: {
                    text: 'frm timeseries',
                    style: {
                      color: '#7f7f7f',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }
                  },
                  credits: {
                    enabled: false
                  },
                  xAxis: {
                    title: {
                      text: 'time'
                    }
                  },
                  yAxis: {
                    min: 0.75,
                    max: 1.25,
                    title: {
                      text: 'frm'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['frm_series'],
                      turboThreshold: 0,
                      lineWidth: 2
                    }
                  ]
                })

                var frm_distr_chart = Highcharts.chart('div_frm_distr', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'frm distribution',
                    style: {
                      color: '#7f7f7f',
                      fontWeight: 'bold',
                      fontSize: '12px'
                    }
                  },
                  credits: {
                    enabled: false
                  },
                  xAxis: {
                    max: that.plotdata['frm_distr_x'].length - 1,
                    categories: that.plotdata['frm_distr_x'],
                    title: {
                      text: 'frm'
                    }
                  },
                  yAxis: {
                    title: {
                      text: 'count'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      type: 'column',
                      data: that.plotdata['frm_distr_y'],
                      turboThreshold: 0,
                      lineWidth: 3
                    }
                  ]
                })
              }, 100)
            }
          })
        } else {
          alert('please select data first')
        }
      }
    }
  }
</script>

<style>
</style>
