<template>

</template>

<script>
  export default {
    data() {
      return {
        plotdata: '',
        fho_series_Chart: '',
        fho_distr_Chart: '',
        tumg_series_Chart: '',
        tumg_distr_Chart: '',
        fileoptions_jsonOBJ: []
      }
    },
    props: ['startTime', 'endTime', 'slectedfiles', 'str_json'],
    methods: {
      plot_d00_a02_fho() {
        this.fileoptions_jsonOBJ = this.slectedfiles
        var that = this
        if ($('#selecte_file_message').dropdown('get value') != '') {
          that.submit()
        }
        $('#plotBody').html(`
                                                                                <div style="height: 450px; ">
                                                                                <!-- fho series -->
                                                                                <div id="div_fho_series" style="width: 50%; height: 100%; float: left;"></div>
                                                                                <!-- fho distr-->
                                                                                <div id="div_fho_distr" style="width: 50%; height: 100%; float: left;"></div>
                                                                                </div>
                                                                          
                                                                                <div style="height: 450px; ">
                                                                                  <!-- tumg series-->
                                                                                  <div id="div_tumg_series" style="width: 50%; height: 100%; float: left;"></div>
                                                                                  <!-- tumg distr-->
                                                                                  <div id="div_tumg_distr" style="width: 50%; height: 100%; float: left;"></div>
                                                                                </div>`)

        // var fileoptions = {{fileoption.requestedFiles|tojson}};
        // console.log(fileoptions);
        // fileoptions_jsonOBJ = JSON.parse(fileoptions);
        // console.log(fileoptions_jsonOBJ);
        console.log(that.fileoptions_jsonOBJ)

        $('#selecte_file_message').dropdown({
          values: that.fileoptions_jsonOBJ['value']
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
              type: 'd00_a02_fho'
            },
            dataType: 'json',
            success: function(data) {
              that.plotdata = JSON.parse(data['value'])

              console.log(that.plotdata)
              setTimeout(function() {
                that.make_plot_d00_a02_fho(
                  that.plotdata,
                  that.fho_series_Chart,
                  that.fho_distr_Chart,
                  that.tumg_series_Chart,
                  that.tumg_distr_Chart
                )
              }, 100)
            }
          })
        }
      },
      //
      make_plot_d00_a02_fho(
        plotdata,
        fho_series_Chart,
        fho_distr_Chart,
        tumg_series_Chart,
        tumg_distr_Chart
      ) {
        fho_series_Chart = Highcharts.chart('div_fho_series', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70
          },
          title: {
            text: 'fho',
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
              text: 'fho'
            }
          },
          legend: {
            enabled: false
          },
          series: [
            {
              data: plotdata['fho_series'],
              turboThreshold: 0,
              lineWidth: 2
            }
          ]
        })

        fho_distr_Chart = Highcharts.chart('div_fho_distr', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1
          },
          title: {
            text: 'altitude distribution',
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
            max: plotdata['fho_distr_x'].length - 1,
            categories: plotdata['fho_distr_x'],
            title: {
              text: 'altitude'
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
              data: plotdata['fho_distr_y'],
              turboThreshold: 0,
              lineWidth: 3
            }
          ]
        })

        tumg_series_Chart = Highcharts.chart('div_tumg_series', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70
          },
          title: {
            text: 'temperature',
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
              text: 'temperature'
            }
          },
          legend: {
            enabled: true
          },
          series: [
            {
              name: 'tumg',
              data: plotdata['tumg_series'],
              turboThreshold: 0,
              lineWidth: 2
            },
            {
              name: 'tans',
              data: plotdata['tans_series'],
              turboThreshold: 0,
              lineWidth: 2
            },
            {
              name: 'tmot',
              data: plotdata['tmot_series'],
              turboThreshold: 0,
              lineWidth: 2
            },
            {
              name: 'tmst',
              data: plotdata['tmst_series'],
              turboThreshold: 0,
              lineWidth: 2
            }
          ]
        })

        tumg_distr_Chart = Highcharts.chart('div_tumg_distr', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1
          },
          title: {
            text: 'temperature distribution',
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
            max: plotdata['tmot_distr_x'].length - 1,
            categories: plotdata['tmot_distr_x'],
            title: {
              text: 'tumg/tans/tmot/tmst'
            }
          },
          yAxis: {
            title: {
              text: 'count'
            }
          },
          legend: {
            enabled: true
          },
          series: [
            {
              name: 'tumg',
              type: 'column',
              data: plotdata['tumg_distr_y'],
              turboThreshold: 0,
              lineWidth: 3
            },
            {
              name: 'tans',
              type: 'column',
              data: plotdata['tans_distr_y'],
              turboThreshold: 0,
              lineWidth: 3
            },
            {
              name: 'tmot',
              type: 'column',
              data: plotdata['tmot_distr_y'],
              turboThreshold: 0,
              lineWidth: 3
            },
            {
              name: 'tmst',
              type: 'column',
              data: plotdata['tmst_distr_y'],
              turboThreshold: 0,
              lineWidth: 3
            }
          ]
        })
      }
    }
  }
</script>

<style>
</style>
