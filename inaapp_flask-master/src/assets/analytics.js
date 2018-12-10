
// plot_d00_a01_gps
function plot_d00_a01_gps() {

    var plotdata;
    var jsGPS = [];
    var speedChart, gangiChart, nmotrlChart;

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
        <div id="div_nmotrlScatter" style="width: 50%; height: 100%; float: left;"></div>
      </div>`);

    $('#btn_submit_analysis').on('click',
        function () {
            if ($('#selecte_file_message').dropdown('get value') != "") {
                $.ajax({
                    type: 'POST',
                    url: 'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
                    data: {
                        "fileName": $('#selecte_file_message').dropdown('get value'),
                        "type": "d00_a01_gpsroute"
                    },
                    dataType: 'json',
                    success: function (data) {
                        plotdata = JSON.parse(data['value']);
                        if (plotdata['gps_series'].length == 0) {
                            alert("file corrupted!");
                            return;
                        }
                        console.log(plotdata);
                        setTimeout(function () {
                            loadMap(plotdata, jsGPS, 'div_gps', plotdata['gps_centerlon'], plotdata['gps_centerlati']);
                            make_plot_d00_a01_gps(plotdata, speedChart, gangiChart, nmotrlChart);
                        }, 100);
                    }
                });
            }
            else {
                alert("please select data first");
            }
        });

}

function loadMap(plotdata, jsGPS, _divname, _xcname, _ycname) {
    for (i = 0; i < plotdata['gps_series'].length; i++) {
        jsGPS.push(
            [
                plotdata['gps_series'][i]['x'],
                plotdata['gps_series'][i]['y']
            ]);
    }
    contructmap(jsGPS, _divname, _xcname, _ycname);
}

function contructmap(jsGPS, _divname, _xcname, _ycname) {
    var map = new AMap.Map(_divname, {
        zoom: 12,
        center: [_xcname, _ycname],
        viewMode: '3D'
    });

    var polyline = new AMap.Polyline({
        path: jsGPS,
        borderWeight: 20,
        strokeColor: '#3366ff',
        lineJoin: 'round'
    });

    map.add(polyline);
}

function make_plot_d00_a01_gps(plotdata, _speedChart, _gangiChart, _nmotrlChart) {
    _speedChart = Highcharts.chart("div_speedSeries", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "GPS: speed",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: "km/h"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['speed_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });
    _gangiChart = Highcharts.chart("div_gangiDistr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "gangi distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['gangi_distr_x'].length - 1,
            categories: plotdata['gangi_distr_x'],
            title: {
                text: "gangi"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['gangi_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });
    _nmotrlChart = Highcharts.chart("div_nmotrlScatter", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            type: 'scatter',
        },
        title: {
            text: 'nmot / rl',
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        xAxis: {
            title: {
                text: 'nmot'
            },
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
            formatter: function () {
                var s = '<b>nmot: ' + this.point.x + '</b>';
                s += '<br/> <b>rl: ' + this.point.y + '</b>';
                s += '<br/> <b>time: ' + this.point.time + '</b>';;
                return s;
            }
        }
    });
}


// plot_d00_a02_fho
function plot_d00_a02_fho() {
    var plotdata;
    var fho_series_Chart, fho_distr_Chart, tumg_series_Chart, tumg_distr_Chart;

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
      </div>`);

    $('#btn_submit_analysis').on('click', function () {
        if ($('#selecte_file_message').dropdown('get value') != "") {
            $.ajax({
                type: 'POST',
                url: 'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
                data: {
                    "fileName": $('#selecte_file_message').dropdown('get value'),
                    "type": "d00_a02_fho"
                },
                dataType: 'json',
                success: function (data) {
                    plotdata = JSON.parse(data['value']);
                    console.log(plotdata);
                    setTimeout(function () {
                        make_plot_d00_a02_fho(plotdata, fho_series_Chart, fho_distr_Chart, tumg_series_Chart, tumg_distr_Chart);
                    }, 100);
                }
            });
        }
        else {
            alert("please select data first");
        }

    });
}

function make_plot_d00_a02_fho(plotdata, fho_series_Chart, fho_distr_Chart, tumg_series_Chart, tumg_distr_Chart) {
    var fho_series_Chart = Highcharts.chart("div_fho_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "fho",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            title: {
                text: "fho"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['fho_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var fho_distr_Chart = Highcharts.chart("div_fho_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "altitude distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['fho_distr_x'].length - 1,
            categories: plotdata['fho_distr_x'],
            title: {
                text: "altitude"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['fho_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });

    var tumg_series_Chart = Highcharts.chart("div_tumg_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "temperature",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            title: {
                text: "temperature"
            }
        },
        legend: {
            enabled: true
        },
        series: [{
            name: "tumg",
            data: plotdata['tumg_series'],
            turboThreshold: 0,
            lineWidth: 2
        },
        {
            name: "tans",
            data: plotdata['tans_series'],
            turboThreshold: 0,
            lineWidth: 2
        },
        {
            name: "tmot",
            data: plotdata['tmot_series'],
            turboThreshold: 0,
            lineWidth: 2
        },
        {
            name: "tmst",
            data: plotdata['tmst_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var tumg_distr_Chart = Highcharts.chart("div_tumg_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "temperature distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['tmot_distr_x'].length - 1,
            categories: plotdata['tmot_distr_x'],
            title: {
                text: "tumg/tans/tmot/tmst"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: true
        },
        series: [{
            name: "tumg",
            type: 'column',
            data: plotdata['tumg_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        },
        {
            name: "tans",
            type: 'column',
            data: plotdata['tans_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        },
        {
            name: "tmot",
            type: 'column',
            data: plotdata['tmot_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        },
        {
            name: "tmst",
            type: 'column',
            data: plotdata['tmst_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });
}

// plot_d00_b01_epm
function plot_d00_b01_epm() {

    var plotdata;
    var epm0_series_chart, epm0_distr_chart, epm1_series_chart, epm1_distr_chart, epmct_series_chart, epmct_distr_chart;
    $('#plotBody').html(`
    <div style="height: 350px; ">
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
    </div> `);

    $('#btn_submit_analysis').on('click', function () {

        if ($('#selecte_file_message').dropdown('get value') != "") {
            $.ajax({
                type: 'POST',
                url: 'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
                data: {
                    "fileName": $('#selecte_file_message').dropdown('get value'),
                    "type": "d00_b01_epm"
                },
                dataType: 'json',
                success: function (data) {
                    plotdata = JSON.parse(data['value']);
                    console.log(plotdata);
                    setTimeout(function () {
                        make_plot_d00_b01_epm(plotdata, epm0_series_chart, epm0_distr_chart, epm1_series_chart, epm1_distr_chart, epmct_series_chart, epmct_distr_chart);
                    }, 100);
                }
            });
        }
        else {
            alert("please select data first");
        }
    });
}

function make_plot_d00_b01_epm(plotdata, epm0_series_chart, epm0_distr_chart, epm1_series_chart, epm1_distr_chart, epmct_series_chart, epmct_distr_chart) {
    var epm0_series_chart = Highcharts.chart("div_epm0_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "EpmCaS_phiCaSOfsAvg_[0] timeseries",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            title: {
                text: "EpmCaS_phiCaSOfsAvg_[0]"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['epm0_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var epm0_distr_chart = Highcharts.chart("div_epm0_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "EpmCaS_phiCaSOfsAvg_[0] distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['epm0_distr_x'].length - 1,
            categories: plotdata['epm0_distr_x'],
            title: {
                text: "EpmCaS_phiCaSOfsAvg_[0]"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['epm0_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });

    var epm1_series_chart = Highcharts.chart("div_epm1_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "EpmCaS_phiCaSOfsAvg_[1] timeseries",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            title: {
                text: "EpmCaS_phiCaSOfsAvg_[1]"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['epm1_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var epm1_distr_chart = Highcharts.chart("div_epm1_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "EpmCaS_phiCaSOfsAvg_[1] distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['epm1_distr_x'].length - 1,
            categories: plotdata['epm1_distr_x'],
            title: {
                text: "EpmCaS_phiCaSOfsAvg_[1]"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['epm1_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });

    var epmct_series_chart = Highcharts.chart("div_epmct_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "Epm_ctReSync timeseries",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            title: {
                text: "Epm_ctReSync"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['ctReSync_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var epmct_distr_chart = Highcharts.chart("div_epmct_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "Epm_ctReSync distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['ctReSync_distr_x'].length - 1,
            categories: plotdata['ctReSync_distr_x'],
            title: {
                text: "Epm_ctReSync"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['ctReSync_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });
}

// plot_d00_b02_lambdaadap
function plot_d00_b02_lambdaadap() {
    var plotdata;
    var fra_series_chart, fra_distr_chart, frm_series_chart, frm_distr_chart;
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
    </div>`);

    $('#btn_submit_analysis').on('click', function () {

        if ($('#selecte_file_message').dropdown('get value') != "") {
            $.ajax({
                type: 'POST',
                url: 'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
                data: {
                    "fileName": $('#selecte_file_message').dropdown('get value'),
                    "type": "d00_b02_lambdaadap"
                },
                dataType: 'json',
                success: function (data) {
                    plotdata = JSON.parse(data['value']);
                    console.log(plotdata);
                    setTimeout(function () {
                        make_plot_d00_b02_lambdaadap(plotdata, fra_series_chart, fra_distr_chart, frm_series_chart, frm_distr_chart);
                    }, 100);
                }
            });
        }
        else {
            alert("please select data first");
        }
    });
}

function make_plot_d00_b02_lambdaadap(plotdata, fra_series_chart, fra_distr_chart, frm_series_chart, frm_distr_chart) {
    var fra_series_chart = Highcharts.chart("div_fra_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "fra timeseries",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            min: 0.75,
            max: 1.25,
            title: {
                text: "fra"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['fra_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var fra_distr_chart = Highcharts.chart("div_fra_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "fra distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['fra_distr_x'].length - 1,
            categories: plotdata['fra_distr_x'],
            title: {
                text: "fra"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['fra_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });

    var frm_series_chart = Highcharts.chart("div_frm_series", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "frm timeseries",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            title: {
                text: "time"
            }
        },
        yAxis: {
            min: 0.75,
            max: 1.25,
            title: {
                text: "frm"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['frm_series'],
            turboThreshold: 0,
            lineWidth: 2
        }]
    });

    var frm_distr_chart = Highcharts.chart("div_frm_distr", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: "frm distribution",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        xAxis: {
            max: plotdata['frm_distr_x'].length - 1,
            categories: plotdata['frm_distr_x'],
            title: {
                text: "frm"
            }
        },
        yAxis: {
            title: {
                text: "count"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            type: 'column',
            data: plotdata['frm_distr_y'],
            turboThreshold: 0,
            lineWidth: 3
        }]
    });



}


// plot_d00_b07_iumpr
function plot_d00_b07_iumpr() {
    var plotdata;
    var jsGPS = [];
    var detailChart, scatterChart, numChart;
    $('#plotBody').html(`
    <div>
    <div id="div_gps" style="width: 50%; height: 600px; float: left;"></div>
    <div style="width: 50%; height: 600px; margin-left:50%;">
      <div id="detailContainer" style="height: 50%;"></div>
      <div id="scatterContainer" style="height: 50%;"></div>
    </div>
  </div>
    <div id="diumpr_numerator" style="width: 100%; height: 350px; "></div>`);

    $('#btn_submit_analysis').on('click', function () {

        if ($('#selecte_file_message').dropdown('get value') != "") {
            $.ajax({
                type: 'POST',
                url: 'http://139.224.5.105:30002/uaes-intelligent-calibration/v1/wc/hbase/selectHbase',
                data: {
                    "fileName": $('#selecte_file_message').dropdown('get value'),
                    "type": "d00_b07_iumpr"
                },
                dataType: 'json',
                success: function (data) {
                    plotdata = JSON.parse(data['value']);
                    if (plotdata['gps_series'].length == 0) {
                        alert("file corrupted!");
                        return;
                    }
                    console.log(plotdata);
                    setTimeout(function () {
                        loadMap(plotdata, jsGPS, 'div_gps', plotdata['gps_centerLongi'], plotdata['gps_centerLati']);
                        make_plot_d00_b07_iumpr(plotdata, detailChart, scatterChart, numChart);
                    }, 100);
                }
            });
        }
        else {
            alert("please select data first");
        }
    });
}

function make_plot_d00_b07_iumpr(plotdata, detailChart, scatterChart, numChart) {

    var detailChart = Highcharts.chart("detailContainer", {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
            marginLeft: 70,
        },
        title: {
            text: "GPS: speed",
            style: {
                color: '#7f7f7f',
                fontWeight: 'bold',
                fontSize: "12px"
            }
        },
        credits: {
            enabled: false
        },
        yAxis: {
            title: {
                text: "km/h"
            }
        },
        legend: {
            enabled: false
        },
        series: [{
            data: plotdata['speed_series'],
            turboThreshold: 0,
            lineWidth: 3
        }]

    });

    var scatterChart = Highcharts.chart('scatterContainer',
        {
            chart: {
                borderColor: '#cccccc',
                borderWidth: 1,
                type: 'scatter',
            },
            title: {
                text: 'nmot / rl',
                style: {
                    color: '#7f7f7f',
                    fontWeight: 'bold',
                    fontSize: "12px"
                }
            },
            xAxis: {
                title: {
                    text: 'nmot'
                },
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
                    color: 'rgba(109,157,235,0.65)',
                    marker: {
                        radius: 2.5,
                        symbol: 'circle'
                    }
                }
            ],
            tooltip: {
                formatter: function () {
                    var s = '<b>nmot: ' + this.point.x + '</b>';
                    s += '<br/> <b>rl: ' + this.point.y + '</b>';
                    s += '<br/> <b>time: ' + this.point.time + '</b>';;
                    return s;
                }
            }
        });

    var numChart = Highcharts.chart('diumpr_numerator', {
        chart: {
            borderColor: '#cccccc',
            borderWidth: 1,
        },
        title: {
            text: 'numerator'
        },
        credits: {
            enabled: false
        },
        series: [
            { data: plotdata['timeseries_DIUMPR_Num.FID_BDLSU'], marker: { radius: 1 }, name: 'DIUMPR_Num.FID_BDLSU', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FID_BPLSU'], marker: { radius: 1 }, name: 'DIUMPR_Num.FID_BPLSU', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FID_CHSV'], marker: { radius: 1 }, name: 'DIUMPR_Num.FID_CHSV', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FId_FlDevPlauDiagFuSnsr'], marker: { radius: 1 }, name: 'DIUMPR_Num.FId_FlDevPlauDiagFuSnsr', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FId_HEGOS2B1DHtg'], marker: { radius: 1 }, name: 'DIUMPR_Num.FId_HEGOS2B1DHtg', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FId_HEGOS2B1TranRL'], marker: { radius: 1 }, name: 'DIUMPR_Num.FId_HEGOS2B1TranRL', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FID_CULSU'], marker: { radius: 1 }, name: 'DIUMPR_Num.FID_CULSU', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FId_HEGOS2B1VirtTarLeanLim'], marker: { radius: 1 }, name: 'DIUMPR_Num.FId_HEGOS2B1VirtTarLeanLim', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FId_HEGOS2B1VirtTarRichLim'], marker: { radius: 1 }, name: 'DIUMPR_Num.FId_HEGOS2B1VirtTarRichLim', lineWidth: 4 },
            { data: plotdata['timeseries_DIUMPR_Num.FId_TWCDPriCatB1'], marker: { radius: 1 }, name: 'DIUMPR_Num.FId_TWCDPriCatB1', lineWidth: 4 },

        ]
    });
}