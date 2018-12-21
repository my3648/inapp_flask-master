<template>
  <div id="plotBody"></div>
</template>

<script>
  // import AMap from 'AMap'
  var map
  export default {
    data() {
      return {
        plotdata: '',
        jsGPS: [],
        speedChart: '',
        gangiChart: '',
        nmotrlChart: '',
        fileoptions_jsonOBJ: []
      }
    },
    props: ['CanvasType', 'slectedfiles', 'str_json'],
    methods: {
      plot_d00_a01_gps() {
        // this.CanvasType = 'gpsroute'
        // $('.options').removeClass('active')
        // $(this).addClass('active')
        this.fileoptions_jsonOBJ = this.slectedfiles
        var that = this

        $('#plotBody').html(`
                                                                                                                                                          <div style="height: 450px; ">
                                                                                                                                                            <!-- gps -->
                                                                                                                                                            <div id="div_gps" style="width: 50%; height: 100%; float: left;"></div>
                                                                                                                                                            <!-- speed time-ser-->
                                                                                                                                                            <div id="div_speedSeries" style="width: 50%; height: 100%; float: left;"></div>
                                                                                                                                                          </div>

                                                                                                                                                          <div style="height: 450px; ">
                                                                                                                                                            <!-- gangi distr-->
                                                                                                                                                            <div id="div_gangiDistr" style="width: 50%; height: 100%; float: left;"></div>
                                                                                                                                                            <!-- nmot/rl scatter-->
                                                                                                                                                            <div id="div_nmotrlScatter" style="width: 50%; height: 1  0%; float: left;"></div>
                                                                                                                                                          </div>`)
        //  that.fileoptions = {{fileoption.requestedFiles|tojson}};
        // that.fileoptions_jsonOBJ = JSON.parse(fileoptions)

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
        if ($('#selecte_file_message').dropdown('get value') != '') {
          console.log(12)
          that.submit()
        }
      },
      // submit() {
      //   this.$emit('submit')
      // },
      submit() {
        var that = this

        if ($('#selecte_file_message').dropdown('get value') != '') {
          $.ajax({
            type: 'POST',
            url:
              'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
            data: {
              fileName: $('#selecte_file_message').dropdown('get value'),
              type: 'd00_a01_gpsroute'
            },
            dataType: 'json',
            success: function(data) {
              that.plotdata = JSON.parse(data['value'])
              if (that.plotdata['gps_series'].length == 0) {
                alert('file corrupted!')
                return
              }
              console.log(that.plotdata)
              setTimeout(function() {
                that.loadMap(that.plotdata, that.jsGPS)
                that.make_plot_d00_a01_gps(
                  that.plotdata,
                  that.speedChart,
                  that.gangiChart,
                  that.nmotrlChart
                )
              }, 100)
            }
          })
        } else {
          alert('please select data first')
        }
      },
      loadMap(plotdata, jsGPS) {
        for (var i = 0; i < plotdata['gps_series'].length; i++) {
          jsGPS.push([
            plotdata['gps_series'][i]['x'],
            plotdata['gps_series'][i]['y']
          ])
        }
        console.log(this.jsGPS)
        this.contructmap(this.plotdata, this.jsGPS)
      },

      contructmap(plotdata, jsGPS) {
        map = new AMap.Map('div_gps', {
          zoom: 12,
          center: [plotdata['gps_centerlon'], plotdata['gps_centerlati']],
          viewMode: '3D'
        })

        var polyline = new AMap.Polyline({
          path: this.jsGPS,
          borderWeight: 20,
          strokeColor: '#3366ff',
          lineJoin: 'round'
        })

        map.add(polyline)
      },
      make_plot_d00_a01_gps(plotdata, _speedChart, _gangiChart, _nmotrlChart) {
        _speedChart = Highcharts.chart('div_speedSeries', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70
          },
          title: {
            text: 'GPS: speed',
            style: {
              color: '#7f7f7f',
              fontWeight: 'bold',
              fontSize: '12px'
            }
          },
          credits: {
            enabled: false
          },
          yAxis: {
            title: {
              text: 'km/h'
            }
          },
          legend: {
            enabled: false
          },
          series: [
            {
              data: plotdata['speed_series'],
              turboThreshold: 0,
              lineWidth: 2
            }
          ]
        })
        _gangiChart = Highcharts.chart('div_gangiDistr', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1
          },
          title: {
            text: 'gangi distribution',
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
            max: plotdata['gangi_distr_x'].length - 1,
            categories: plotdata['gangi_distr_x'],
            title: {
              text: 'gangi'
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
              data: plotdata['gangi_distr_y'],
              turboThreshold: 0,
              lineWidth: 3
            }
          ]
        })
        _nmotrlChart = Highcharts.chart('div_nmotrlScatter', {
          chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            type: 'scatter'
          },
          title: {
            text: 'nmot / rl',
            style: {
              color: '#7f7f7f',
              fontWeight: 'bold',
              fontSize: '12px'
            }
          },
          xAxis: {
            title: {
              text: 'nmot'
            }
          },
          yAxis: {
            title: {
              text: 'rl'
            }
          },
          credits: {
            enabled: false
          },
          legend: {
            enabled: false
          },
          series: [
            {
              data: plotdata['nmotrl_scatter'],
              turboThreshold: 0,
              lineWidth: 0,
              color: 'rgba(109,157,235,0.5)',
              marker: {
                radius: 3,
                symbol: 'circle'
              }
            }
          ],
          tooltip: {
            formatter: function() {
              var s = '<b>nmot: ' + this.point.x + '</b>'
              s += '<br/> <b>rl: ' + this.point.y + '</b>'
              s += '<br/> <b>time: ' + this.point.time + '</b>'
              return s
            }
          }
        })
      }
    }
  }
</script>

<style>
</style>
