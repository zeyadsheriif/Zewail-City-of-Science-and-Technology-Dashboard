// smart gauge chart js code
function fetchDataAndUpdateChart5() {
  fetch('/get-datachart5')
      .then(response => response.json())
      .then(data5 => {
          updateChart5(data5);
      })
      .catch(error => console.error('Error:', error));
}

function updateChart5(data5) {

  am5.ready(function() {

    // Create root element
    // https://www.amcharts.com/docs/v5/getting-started/#Root_element
    var root = am5.Root.new("chart5");
    
    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root.setThemes([
      am5themes_Animated.new(root)
    ]);
    
    // Create chart
    // https://www.amcharts.com/docs/v5/charts/radar-chart/
    var chart = root.container.children.push(am5radar.RadarChart.new(root, {
      panX: false,
      panY: false,
      wheelX: "panX",
      wheelY: "zoomX",
      innerRadius: am5.percent(20),
      startAngle: -90,
      endAngle: 180,
      numberFormat: "#",
    }));
    
    
    // Add cursor
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Cursor
    var cursor = chart.set("cursor", am5radar.RadarCursor.new(root, {
      behavior: "zoomX"
    }));
    
    cursor.lineY.set("visible", false);
    
    // Create axes and their renderers
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_axes
    var xRenderer = am5radar.AxisRendererCircular.new(root, {
      //minGridDistance: 50
    });
    
    xRenderer.labels.template.setAll({
      radius: 10,
      numberFormat: "#",
      
    });
    
    xRenderer.grid.template.setAll({
      forceHidden: true
    });
    
    var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
      renderer: xRenderer,
      min: 0,
      max: "full",
      strictMinMax: true,
      numberFormat: "#",
      tooltip: am5.Tooltip.new(root, {})
    }));
    
    
    var yRenderer = am5radar.AxisRendererRadial.new(root, {
      minGridDistance: 20
    });
    
    yRenderer.labels.template.setAll({
      centerX: am5.p100,
      fontWeight: "500",
      fontSize: 18,
      numberFormat: "#",
      templateField: "columnSettings"
    });
    
    yRenderer.grid.template.setAll({
      forceHidden: true
    });
    
    var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
      categoryField: "category",
      numberFormat: "#",
      renderer: yRenderer
    }));
    
    yAxis.data.setAll(data5);
    
    
    // Create series
    // https://www.amcharts.com/docs/v5/charts/radar-chart/#Adding_series
    var series1 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "full",
      categoryYField: "category",
      numberFormat: "#",
      fill: root.interfaceColors.get("alternativeBackground")
    }));
    
    series1.columns.template.setAll({
      width: am5.p100,
      fillOpacity: 0.08,
      strokeOpacity: 0,
      cornerRadius: 20
    });
    
    series1.data.setAll(data5);
    
    
    var series2 = chart.series.push(am5radar.RadarColumnSeries.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      clustered: false,
      valueXField: "student",
      categoryYField: "category",
      numberFormat: "#",
    }));
    
    series2.columns.template.setAll({
      width: am5.p100,
      strokeOpacity: 0,
      tooltipText: "{category}: {valueX}%",
      cornerRadius: 20,
      templateField: "columnSettings",
      numberFormat: "#",
    });
    
    series2.data.setAll(data5);
    
    // Animate chart and series in
    // https://www.amcharts.com/docs/v5/concepts/animations/#Initial_animation
    series1.appear(1000);
    series2.appear(1000);
    chart.appear(1000, 100);
    
    }); // end am5.ready()
 }

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdateChart5();
});
