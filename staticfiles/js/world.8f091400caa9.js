function updateWorldMap(){
    var map_8ba0e74af287495b866334ad89d96395 = L.map(
        "map_8ba0e74af287495b866334ad89d96395",
        {
            center: [22.5937, 30.9629],
            crs: L.CRS.EPSG3857,
            zoom: 3,
            zoomControl: true,
            preferCanvas: false,
            // touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            // dragging: this.isInDragMode,
        }
    );

    var tile_layer_e4f7324f6b0743cf8eb7710ff19a5fdf = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(map_8ba0e74af287495b866334ad89d96395);

    $.getJSON("/static/js/countriesSorted.json", function(json) {
        jdata = json['country'];
        });

   fetch("https://covid19-records.herokuapp.com/worlddata/")
        .then(response => response.json())
        .then(rsp => {
            data = rsp['cases']
            worldData = data.slice(5,data.keys().length) 
            worldData.forEach(element => {
                countryName = element.country;
                totalCases = element.totalCases;
                newCases = element.newCases;
                deaths = element.deaths;
                newDeaths = element.newDeaths;
                recovered = element.recovered;
                activeCases = element.activeCases;
                seriousCritical = element.seriousCritical;
                totalTests = element.totalTests;

                for (i=0; i<=jdata.length;i++){
                try{
                    if(jdata[i]['name'] === countryName){
                    latitude = jdata[i]['latitude']
                    longitude = jdata[i]['longitude']
                    break;
                    }
                }
                catch{
                    console.log(countryName)
                    }
                }

    var marker_b532a993edad4ee5856c292ddaef27de = L.marker(
        [latitude,longitude],
        {}
    ).addTo(map_8ba0e74af287495b866334ad89d96395);
        
    // var color = "FF0000";
    var icon_40931d26b7ca48c6ab95fb32fb50d33d = L.AwesomeMarkers.icon(
                {"extraClasses": "fa-rotate-0", "icon": "info-sign", "iconColor": "white", "markerColor": "red", "prefix": "glyphicon"}
            );
            marker_b532a993edad4ee5856c292ddaef27de.setIcon(icon_40931d26b7ca48c6ab95fb32fb50d33d);

    var popup_d0503120b5294e8c85b4469c2b285404 = L.popup({"maxWidth": "100%"});

    
        var html_70c5718698154b5cb926620b7747fcb3 = $(`<div id="html_70c5718698154b5cb926620b7747fcb3" style="width: 100.0%; height: 100.0%;"><strong>"`+countryName+`</strong></div>`)[0];
        popup_d0503120b5294e8c85b4469c2b285404.setContent(html_70c5718698154b5cb926620b7747fcb3);
    
    marker_b532a993edad4ee5856c292ddaef27de.bindPopup(popup_d0503120b5294e8c85b4469c2b285404);

        marker_b532a993edad4ee5856c292ddaef27de.bindTooltip(
        `<div>
             <strong>`+countryName+`</strong><BR>
             <strong>Total Cases `+totalCases+`</strong><BR>
             <strong>Active `+activeCases+`</strong><BR>
             <strong>Dead `+deaths+`</strong><BR>
             <strong>New Deaths `+newDeaths+`</strong><BR>
             <strong>Recovered `+recovered+`</strong><BR>
             <strong>Serious Critical `+seriousCritical+`</strong><BR>
             <strong>Total Tests `+totalTests+`</strong><BR>
         </div>`,
        {"sticky": true}
        );
    }); 
    });
    };

let interval = 2000;
// map.off();
setInterval( updateWorldMap, interval); 