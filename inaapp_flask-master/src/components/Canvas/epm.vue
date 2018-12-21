<template>
  <div id="plotBody">

  </div>
</template>


<script>
  export default {
    data() {
      return {
        plotdata: '',
        jsGPS: [],
        fileoptions_jsonOBJ: []
      }
    },
    props: ['startTime', 'endTime', 'slectedfiles', 'str_json', 'CanvasType'],

    methods: {
      plot_d00_b01_epm() {
        console.log(this.slectedfiles)
        // this.CanvasType = 'epm'
        this.fileoptions_jsonOBJ = this.slectedfiles
        var that = this
        if ($('#selecte_file_message').dropdown('get value') != '') {
          that.submit()
        }
        $('#plotBody').html(`<div style="height: 350px; ">
            <!-- epm0 series -->
            <div id="div_epm0_series" style="width: 65%; height: 100%; float: left;"></div>
            <!-- epm0 distr-->
            <div id="div_epm0_distr" style="width: 35%; height: 100%; float: left;"></div>
          </div>

          <div style="height: 350px; ">
            <!-- epm1 series-->
            <div id="div_epm1_series" style="width: 65%; height: 100%; float: left;"></div>
            <!-- epm1 distr-->
            <div id="div_epm1_distr" style="width: 35%; height: 100%; float: left;"></div>
          </div> 

          <div style="height: 350px; ">
            <!-- epmct series-->
            <div id="div_epmct_series" style="width: 65%; height: 100%; float: left;"></div>
            <!-- epmct distr-->
            <div id="div_epmct_distr" style="width: 35%; height: 100%; float: left;"></div>
          </div> `)
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
              type: 'd00_b01_epm'
            },
            dataType: 'json',

            // url: "/d00_b01_epm_data",
            // type: "get",
            // dataType: "json",
            success: function(data) {
              console.log(data)
              that.plotdata = JSON.parse(data['value'])

              console.log(that.plotdata)
              setTimeout(function() {
                var epm0_series_chart = Highcharts.chart('div_epm0_series', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    marginLeft: 70
                  },
                  title: {
                    text: 'EpmCaS_phiCaSOfsAvg_[0] timeseries',
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
                    title: {
                      text: 'EpmCaS_phiCaSOfsAvg_[0]'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['epm0_series'],
                      turboThreshold: 0,
                      lineWidth: 2
                    }
                  ]
                })
                var epm0_distr_chart = Highcharts.chart('div_epm0_distr', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'EpmCaS_phiCaSOfsAvg_[0] distribution',
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
                    max: that.plotdata['epm0_distr_x'].length - 1,
                    categories: that.plotdata['epm0_distr_x'],
                    title: {
                      text: 'EpmCaS_phiCaSOfsAvg_[0]'
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
                      data: that.plotdata['epm0_distr_y'],
                      turboThreshold: 0,
                      lineWidth: 3
                    }
                  ]
                })

                var epm1_series_chart = Highcharts.chart('div_epm1_series', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    marginLeft: 70
                  },
                  title: {
                    text: 'EpmCaS_phiCaSOfsAvg_[1] timeseries',
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
                    title: {
                      text: 'EpmCaS_phiCaSOfsAvg_[1]'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['epm1_series'],
                      turboThreshold: 0,
                      lineWidth: 2
                    }
                  ]
                })
                var epm1_distr_chart = Highcharts.chart('div_epm1_distr', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'EpmCaS_phiCaSOfsAvg_[1] distribution',
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
                    max: that.plotdata['epm1_distr_x'].length - 1,
                    categories: that.plotdata['epm1_distr_x'],
                    title: {
                      text: 'EpmCaS_phiCaSOfsAvg_[1]'
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
                      data: that.plotdata['epm1_distr_y'],
                      turboThreshold: 0,
                      lineWidth: 3
                    }
                  ]
                })

                var epmct_series_chart = Highcharts.chart('div_epmct_series', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1,
                    marginLeft: 70
                  },
                  title: {
                    text: 'Epm_ctReSync timeseries',
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
                    title: {
                      text: 'Epm_ctReSync'
                    }
                  },
                  legend: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['ctReSync_series'],
                      turboThreshold: 0,
                      lineWidth: 2
                    }
                  ]
                })
                var epmct_distr_chart = Highcharts.chart('div_epmct_distr', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'Epm_ctReSync distribution',
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
                    max: that.plotdata['ctReSync_distr_x'].length - 1,
                    categories: that.plotdata['ctReSync_distr_x'],
                    title: {
                      text: 'Epm_ctReSync'
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
                      data: that.plotdata['ctReSync_distr_y'],
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

           