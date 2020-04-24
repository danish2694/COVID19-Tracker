function updateIndiaMap(){
    var map_8ba0e74af287495b866334ad89d96395 = L.map(
        "map_8ba0e74af287495b866334ad89d96395",
        {
            center: [22.5937, 79.9629],
            crs: L.CRS.EPSG3857,
            zoom: 4.5,
            zoomControl: false,
            preferCanvas: false,
            touchZoom: false,
            scrollWheelZoom: false,
            doubleClickZoom: false,
            dragging: this.isInDragMode,
        }
    );

    var tile_layer_e4f7324f6b0743cf8eb7710ff19a5fdf = L.tileLayer(
                "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
                {"attribution": "Data by \u0026copy; \u003ca href=\"http://openstreetmap.org\"\u003eOpenStreetMap\u003c/a\u003e, under \u003ca href=\"http://www.openstreetmap.org/copyright\"\u003eODbL\u003c/a\u003e.", "detectRetina": false, "maxNativeZoom": 18, "maxZoom": 18, "minZoom": 0, "noWrap": false, "opacity": 1, "subdomains": "abc", "tms": false}
            ).addTo(map_8ba0e74af287495b866334ad89d96395);

    $.getJSON("/static/js/stateData.json", function(json) {
        jdata = json['state'];
        });

   fetch("https://api.covid19india.org/data.json")
        .then(response => response.json())
        .then(rsp => {
            data = rsp['statewise']
            statesData = data.slice(1,data.keys().length)
            var tot_active = data[0]['active']
            var tot_confirmed = data[0]['confirmed']
            tot_deaths = data[0]['deaths']
            tot_recoverd = data[0]['recovered']
             // console.log(tot_active)
            statesData.forEach(element => {
                stateName = element.state;
                totalCases = element.confirmed;
                activeCases = element.active;
                deaths = element.deaths;
                recovered = element.recovered;

                for (i=0; i<=jdata.length;i++){
                try{
                    if(jdata[i]['name'] === stateName){
                    latitude = jdata[i]['latitude']
                    longitude = jdata[i]['longitude']
                    // console.log(stateName, latitude, longitude)
                    break;
                    }
                }
                catch{
                    console.log('stateName')
                    }
                }

    var marker_b532a993edad4ee5856c292ddaef27de = L.marker(
        [latitude,longitude],
        {}
    ).addTo(map_8ba0e74af287495b866334ad89d96395);
        
    
    var popup_d0503120b5294e8c85b4469c2b285404 = L.popup({"maxWidth": "100%"});

    
        var html_70c5718698154b5cb926620b7747fcb3 = $(`<div id="html_70c5718698154b5cb926620b7747fcb3" style="width: 100.0%; height: 100.0%;"><strong>"`+stateName+`</strong></div>`)[0];
        popup_d0503120b5294e8c85b4469c2b285404.setContent(html_70c5718698154b5cb926620b7747fcb3);
    
    marker_b532a993edad4ee5856c292ddaef27de.bindPopup(popup_d0503120b5294e8c85b4469c2b285404);

        marker_b532a993edad4ee5856c292ddaef27de.bindTooltip(
        `<div>
             <strong>`+stateName+`</strong><BR>
             <strong>Total Cases `+totalCases+`</strong><BR>
             <strong>Active `+activeCases+`</strong><BR>
             <strong>Recovered `+recovered+`</strong><BR>
             <strong>Dead `+deaths+`</strong>
         </div>`,
        {"sticky": true}
        );
    }); 
    });
    };

let interval = 2000;
setInterval( updateIndiaMap, interval); 