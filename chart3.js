// column chart js code

function fetchDataAndUpdateChart3() {
  fetch('/get-datachart3')
      .then(response => response.json())
      .then(data => {
          updateChart3(data);
      })
      .catch(error => console.error('Error:', error));
}

function updateChart3(data) {
  am5.ready(function () {
      var root = am5.Root.new("chart3");

      root.setThemes([
          am5themes_Animated.new(root)
      ]);

      var chart = root.container.children.push(am5xy.XYChart.new(root, {
          panX: true,
          panY: true,
          wheelX: "panX",
          wheelY: "zoomX",
          pinchZoomX: true,
          paddingLeft: 0,
          paddingRight: 1
      }));

      var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
      cursor.lineY.set("visible", false);

      var xRenderer = am5xy.AxisRendererX.new(root, {
          minGridDistance: 30,
          minorGridEnabled: true
      });

      xRenderer.labels.template.setAll({
          rotation: 45,
          centerY: am5.p50,
          centerX: am5.p100,
          paddingRight: 15
      });

      xRenderer.grid.template.setAll({
          location: 1
      })

      var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
          maxDeviation: 0.3,
          categoryField: "country",
          renderer: xRenderer,
          tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "down",
              getHTML: function (tooltip, value, fields) {
                  return "<strong>" + fields.categoryX + "</strong>: " + value;
              }
          })
      }));

      var yRenderer = am5xy.AxisRendererY.new(root, {
          strokeOpacity: 0.1
      })

      var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
          maxDeviation: 0.3,
          renderer: yRenderer
      }));

      var series = chart.series.push(am5xy.ColumnSeries.new(root, {
          name: "Series 1",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          sequencedInterpolation: true,
          categoryXField: "country",
          tooltip: am5.Tooltip.new(root, {
              pointerOrientation: "down",
              getHTML: function (tooltip, value, fields) {
                  return "<strong>" + fields.categoryX + "</strong>: " + value;
              }
          })
      }));

      series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
      series.columns.template.adapters.add("fill", function (fill, target) {
          return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      series.columns.template.adapters.add("stroke", function (stroke, target) {
          return chart.get("colors").getIndex(series.columns.indexOf(target));
      });

      xAxis.data.setAll(data);
      series.data.setAll(data);

      series.appear(1000);
      chart.appear(1000, 100);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  fetchDataAndUpdateChart3();
});


