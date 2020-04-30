// fetch("http://127.0.0.1:8000/globe_data/")
fetch("http://192.168.43.204:8000/globe_data")
        .then(response => response.json())
        .then(rsp => {
am4core.ready(function() {

    // Themes begin
    am4core.useTheme(am4themes_dataviz);
    am4core.useTheme(am4themes_animated);
    // Themes end
    
    // Create map instance
    var chart = am4core.create("chartdiv", am4maps.MapChart);
    var interfaceColors = new am4core.InterfaceColorSet();
    
    try {
        chart.geodata = am4geodata_worldLow;
    }
    catch (e) {
        chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
    }
    
    var data5 = rsp['worldCases']
    var data6 = rsp['worldActive']
    var data7 = rsp['worldRecovered']
    var data8 = rsp['worldDeaths']
    var label = chart.createChild(am4core.Label)
    label.text = "Total Cases : " +data5 + "\n" +"Total Active : " +data6 + "\n" +"Total Recovered : " +data7 + "\n" +"Total Deaths : " +data8;
    label.fontSize = 12;
    label.align = "left";
    label.valign = "bottom"
    label.fill = am4core.color("red");
    label.background = new am4core.RoundedRectangle()
    label.background.cornerRadius(10,10,10,10);
    label.padding(10,10,10,10);
    label.marginLeft = 0;
    label.marginBottom = 30;
    label.background.strokeOpacity = 0.3;
    label.background.stroke =am4core.color("#927459");
    label.background.fill = am4core.color("#0000");
    label.background.fillOpacity = 0.6;
    
    // var dataSource = chart.createChild(am4core.TextLink)
    // //dataSource.text = "Data source: WHO";
    // dataSource.fontSize = 12;
    // dataSource.align = "left";
    // dataSource.valign = "top"
    // dataSource.url = "https://www.who.int/immunization/monitoring_surveillance/burden/vpd/surveillance_type/active/measles_monthlydata/en/"
    // dataSource.urlTarget = "_blank";
    // dataSource.fill = am4core.color("#927459");
    // dataSource.padding(10,10,10,10);
    // dataSource.marginLeft = 30;
    // dataSource.marginTop = 30;
    
    // Set projection
    chart.projection = new am4maps.projections.Orthographic();
    chart.panBehavior = "rotateLongLat";
    chart.padding(20,20,20,20);
    
    // Add zoom control
    // chart.zoomControl = new am4maps.ZoomControl();
    
    var homeButton = new am4core.Button();
    homeButton.events.on("hit", function(){
      chart.goHome();
    });
    
    homeButton.icon = new am4core.Sprite();
    homeButton.padding(7, 5, 7, 5);
    homeButton.width = 30;
    homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
    homeButton.marginBottom = 10;
    // homeButton.parent = chart.zoomControl;
    // homeButton.insertBefore(chart.zoomControl.plusButton);
    
    chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color("#8B0000");
    chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
    chart.deltaLongitude = 20;
    chart.deltaLatitude = -20;
    
    // limits vertical rotation
    chart.adapter.add("deltaLatitude", function(delatLatitude){
        return am4core.math.fitToRange(delatLatitude, -90, 90);
    })
    
    // Create map polygon series
    
    var shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    shadowPolygonSeries.geodata = am4geodata_continentsLow;
    
    try {
        shadowPolygonSeries.geodata = am4geodata_continentsLow;
    }
    catch (e) {
        shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
    }
    
    shadowPolygonSeries.useGeodata = true;
    shadowPolygonSeries.dx = 2;
    shadowPolygonSeries.dy = 2;
    shadowPolygonSeries.mapPolygons.template.fill = am4core.color("#000");
    shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
    shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
    shadowPolygonSeries.fillOpacity = 0.1;
    shadowPolygonSeries.fill = am4core.color("#000");
    
    
    // Create map polygon series
    var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
    polygonSeries.useGeodata = true;
    
    polygonSeries.calculateVisualCenter = true;
    polygonSeries.tooltip.background.fillOpacity = 0.2;
    polygonSeries.tooltip.background.cornerRadius = 20;
    
    var template = polygonSeries.mapPolygons.template;
    template.nonScalingStroke = true;
    template.fill = am4core.color("#f9e3ce");
    template.stroke = am4core.color("#e2c9b0");
    
    polygonSeries.calculateVisualCenter = true;
    template.propertyFields.id = "id";
    template.tooltipPosition = "fixed";
    template.fillOpacity = 1;
    
    template.events.on("over", function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = true;
      }
    })
    template.events.on("out", function (event) {
      if (event.target.dummyData) {
        event.target.dummyData.isHover = false;
      }
    })
    
    var hs = polygonSeries.mapPolygons.template.states.create("hover");
    hs.properties.fillOpacity = 1;
    hs.properties.fill = am4core.color("#B22222");
    
    
    var graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
    graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
    graticuleSeries.fitExtent = false;
    graticuleSeries.mapLines.template.strokeOpacity = 0.2;
    graticuleSeries.mapLines.template.stroke = am4core.color("#fff");
    
    
    var measelsSeries = chart.series.push(new am4maps.MapPolygonSeries())
    measelsSeries.tooltip.background.fillOpacity = 0;
    measelsSeries.tooltip.background.cornerRadius = 20;
    measelsSeries.tooltip.autoTextColor = false;
    measelsSeries.tooltip.label.fill = am4core.color("#000");
    measelsSeries.tooltip.dy = -5;
    
    var measelTemplate = measelsSeries.mapPolygons.template;
    measelTemplate.fill = am4core.color("#bf7569");
    measelTemplate.strokeOpacity = 0;
    measelTemplate.fillOpacity = 0.75;
    measelTemplate.tooltipPosition = "fixed";
    
    
    
    var hs2 = measelsSeries.mapPolygons.template.states.create("hover");
    hs2.properties.fillOpacity = 1;
    hs2.properties.fill = am4core.color("#86240c");
    
    polygonSeries.events.on("inited", function () {
      polygonSeries.mapPolygons.each(function (mapPolygon) {
        var count = data[mapPolygon.id];
        var count2 = data2[mapPolygon.id]
        var count3 = data3[mapPolygon.id]
        var count4 = data4[mapPolygon.id]
    
        if (count > 0) {
          var polygon = measelsSeries.mapPolygons.create();
          polygon.multiPolygon = am4maps.getCircle(mapPolygon.visualLongitude, mapPolygon.visualLatitude, Math.max(0.2, Math.log(count) * Math.LN10 / 10));
          polygon.tooltipText = mapPolygon.dataItem.dataContext.name + "\n" +"Confirmed : " + count+"\n"+ "Active : " + count2+"\n"+ "Recovered : " + count4+"\n"+ "Deaths : " + count3;
          mapPolygon.dummyData = polygon;
          polygon.events.on("over", function () {
            mapPolygon.isHover = true;
          })
          polygon.events.on("out", function () {
            mapPolygon.isHover = false;
          })
        }
        else {
          mapPolygon.tooltipText = mapPolygon.dataItem.dataContext.name + ": no data";
          mapPolygon.fillOpacity = 0.9;
        }
    
      })
    })
    
    let animation;
    setTimeout(function(){
      animation = chart.animate({property:"deltaLongitude", to:100000}, 20000000);
    }, 3000)
    
    chart.seriesContainer.events.on("down", function(){
    if(animation){
      animation.stop();
    }
    })
    
    var data = rsp['confirmed']
    var data2 = rsp['active']
    var data3 = rsp['deaths']
    var data4 = rsp['recovered']
    }); // end am4core.ready()
  });

function WorldCases() {
    // fetch("http://127.0.0.1:8000/graphOne/")
    fetch("http://192.167.43.204:8000/graphOne")
        .then(response => response.json())
        .then(rsp => {
            countries = rsp["countries"]
            cases = rsp["cases"]
    new Chart(document.getElementById("bar-chart"), {
    type: 'bar',
    data: {
      labels: countries,
      datasets: [
        {
          label: "Total Cases in Countries",
          backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850","#FF7F50","#008B8B","#006400","#2F4F4F","#ADFF2F"],
          data: cases

        }
      ]
    },
    options: {
      legend: { 
        display: true ,
        legendText: "2010",
        position: 'top',
      labels: {
                fontColor: "#000080",
            }
          },
      title: {
        display: true,
        text: 'Highest Cases in 10 countries'
      }
    }
});
    });
}
WorldCases()