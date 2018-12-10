<template>
  <div id="plotBody">

  </div>
</template>

<script type="text/javascript" src="https://webapi.amap.com/maps?v=1.4.10&key=146f38cff16fee22715f107edad81eac"></script>
<script>
  export default {
    data() {
      return {
        plotdata: '',
        jsGPS: [],
        fileoptions_jsonOBJ: []
      }
    },
    props: ['startTime', 'endTime', 'slectedfiles', 'str_json'],
    methods: {
      plot_d00_b07_iumpr() {
        this.fileoptions_jsonOBJ = this.slectedfiles
        var that = this
        if ($('#selecte_file_message').dropdown('get value') != '') {
          that.submit()
        }
        $('#plotBody').html(`
                                      <div>
                                  <div id="container" style="width: 50%; height: 600px; float: left;"></div>
                                  <div style="width: 50%; height: 600px; margin-left:50%;">
                                    <div id="detailContainer" style="height: 50%;"></div>
                                    <div id="scatterContainer" style="height: 50%;"></div>
                                  </div>
                                </div>

                                <div id="diumpr_ratio" style="width: 100%; height: 350px; "></div>
                                <div id="diumpr_numerator" style="width: 100%; height: 350px; "></div>
                                      `)
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
              fileName:
                '6034_788-4415ET18-ECU DI 0_user-undefined_D-O2_ok test_iupr_00006034_2018-11-03_12-26-44_2018-11-03_12-40-58_sorted.dat',
              type: 'd00_b07_iumpr'
            },
            dataType: 'json',
            // url: "/d00_b07_iumpr_data",
            // type: "get",
            // dataType: "json",
            success: function(data) {
              console.log(data)
              that.plotdata = JSON.parse(data['value'])
              console.log(that.plotdata)
              setTimeout(function() {
                that.loadMap()

                var detailChart = Highcharts.chart('detailContainer', {
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
                      data: that.plotdata['speed_series'],
                      turboThreshold: 0,
                      lineWidth: 3
                    }
                  ]
                })

                var scatterChart = Highcharts.chart('scatterContainer', {
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
                      data: that.plotdata['nmotrl_scatter'],
                      turboThreshold: 0,
                      lineWidth: 0,
                      color: 'rgba(109,157,235,0.65)',
                      marker: {
                        radius: 2.5,
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

                var ratioChart = Highcharts.chart('diumpr_ratio', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'iumpr'
                  },
                  credits: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[0]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[0]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[1]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[1]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[2]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[2]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[3]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[3]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[4]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[4]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[5]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[5]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[6]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[6]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[7]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[7]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[8]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[8]',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_rValRatMin_[9]'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_rValRatMin_[9]',
                      lineWidth: 4
                    }
                  ]
                })

                var numChart = Highcharts.chart('diumpr_numerator', {
                  chart: {
                    borderColor: '#cccccc',
                    borderWidth: 1
                  },
                  title: {
                    text: 'numerator'
                  },
                  credits: {
                    enabled: false
                  },
                  series: [
                    {
                      data: that.plotdata['timeseries_DIUMPR_Num.FID_BDLSU'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FID_BDLSU',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_Num.FID_BPLSU'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FID_BPLSU',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_Num.FID_CHSV'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FID_CHSV',
                      lineWidth: 4
                    },
                    {
                      data:
                        that.plotdata[
                          'timeseries_DIUMPR_Num.FId_FlDevPlauDiagFuSnsr'
                        ],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FId_FlDevPlauDiagFuSnsr',
                      lineWidth: 4
                    },
                    {
                      data:
                        that.plotdata['timeseries_DIUMPR_Num.FId_HEGOS2B1DHtg'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FId_HEGOS2B1DHtg',
                      lineWidth: 4
                    },
                    {
                      data:
                        that.plotdata['timeseries_DIUMPR_Num.FId_HEGOS2B1TranRL'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FId_HEGOS2B1TranRL',
                      lineWidth: 4
                    },
                    {
                      data: that.plotdata['timeseries_DIUMPR_Num.FID_CULSU'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FID_CULSU',
                      lineWidth: 4
                    },
                    {
                      data:
                        that.plotdata[
                          'timeseries_DIUMPR_Num.FId_HEGOS2B1VirtTarLeanLim'
                        ],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FId_HEGOS2B1VirtTarLeanLim',
                      lineWidth: 4
                    },
                    {
                      data:
                        that.plotdata[
                          'timeseries_DIUMPR_Num.FId_HEGOS2B1VirtTarRichLim'
                        ],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FId_HEGOS2B1VirtTarRichLim',
                      lineWidth: 4
                    },
                    {
                      data:
                        that.plotdata['timeseries_DIUMPR_Num.FId_TWCDPriCatB1'],
                      marker: { radius: 1 },
                      name: 'DIUMPR_Num.FId_TWCDPriCatB1',
                      lineWidth: 4
                    }
                  ]
                })
              }, 100)
            }
          })
        }
      },
      loadMap() {
        var that = this
        for (var i = 0; i < that.plotdata['gps_series'].length; i++) {
          that.jsGPS.push([
            that.plotdata['gps_series'][i]['x'],
            that.plotdata['gps_series'][i]['y']
          ])
        }
        that.contructmap(that.jsGPS)
      },

      contructmap(_jsGPS) {
        var that = this
        var map = new AMap.Map('container', {
          zoom: 15,
          center: [
            that.plotdata['gps_centerLongi'],
            that.plotdata['gps_centerLati']
          ],
          viewMode: '3D'
        })

        var polyline = new AMap.Polyline({
          path: _jsGPS,
          borderWeight: 20,
          strokeColor: '#3366ff',
          lineJoin: 'round'
        })

        map.add(polyline)
      }
    }
  }
</script>


<style>
</style>
