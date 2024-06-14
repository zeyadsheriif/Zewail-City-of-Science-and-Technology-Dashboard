// map chart js code
function fetchDataAndUpdateChart2() {
  fetch('/get-datachart2')
      .then(response => response.json())
      .then(data2 => {
          updatechart2(data2);
      })
      .catch(error => console.error('Error:', error));
}
function updatechart2(data_df2){
  am5.ready(function () {

  
    var root = am5.Root.new("chart2");
    root.setThemes([am5themes_Animated.new(root)]);
  
    var chart = root.container.children.push(am5map.MapChart.new(root, {
      panX:"rotateX",
      panY:"none",
      wheelX:"none",
      wheelY:"zoom",
      pinchZoom:false
    }));
  
    var polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
        exclude: ["AQ"]
      })
    );
  
    var bubbleSeries = chart.series.push(
      am5map.MapPointSeries.new(root, {
        valueField: "student",
        calculateAggregates: true,
        polygonIdField: "region"
      })
    );
  
    var circleTemplate = am5.Template.new({});
  
    bubbleSeries.bullets.push(function (root, series, dataItem) {
      var container = am5.Container.new(root, {});
  
      var circle = container.children.push(
        am5.Circle.new(root, {
          radius: 7,
          fillOpacity: 0.7,
          fill: am5.color(0xff0000),
          cursorOverStyle: "pointer",
          tooltipText: `{region}: [bold]{student}[/]`
        }, circleTemplate)
      );
  
      circle.on("radius", function (radius) {
        countryLabel.set("x", radius);
      })
  
      return am5.Bullet.new(root, {
        sprite: container,
        dynamic: true
      });
    });
  
    bubbleSeries.bullets.push(function (root, series, dataItem) {
      return am5.Bullet.new(root, {
        sprite: am5.Label.new(root, {
          text: "{region}",
          fill: am5.color(0xffffff),
          populateText: true,
          centerX: am5.p50,
          centerY: am5.p50,
          textAlign: "center"
        }),
        dynamic: true
      });
    });
  
  
    bubbleSeries.set("heatRules", [
      {
        target: circleTemplate,
        dataField: "student",
        min: 10,
        max: 50,
        minValue: 0,
        maxValue: 100,
        key: "radius"
      }
    ]);
  
    bubbleSeries.data.setAll(data_df2);

  });
}


  document.addEventListener('DOMContentLoaded', function() {
    fetchDataAndUpdateChart2()
  });
    
  
