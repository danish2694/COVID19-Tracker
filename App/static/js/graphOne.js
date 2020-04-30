function WorldCases() {
	// fetch("http://127.0.0.1:8000/graphOne/")
  fetch("http://192.168.43.204:8000/graphOne")
        .then(response => response.json())
        .then(rsp => {
            countries = rsp["countries"]
            cases = rsp["cases"]
            console.log(cases)
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


//India Data
// fetch("http://127.0.0.1:8000/allgraphs/")
fetch("http://192.168.43.204:8000/allgraphs")
    .then(response => response.json())
    .then(rsp => {
        states = rsp["states"]
        confirmed = rsp["confirmedCases"]
        active = rsp["activeCases"]
        recovered = rsp["recoveredCases"]
        dead = rsp["deathCases"]
function ConfirmedCases(){
  new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: states,
    datasets: [{ 
        data: confirmed,
        label: "Cases",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'India State Wise Cases'
    },
    scaleShowValues:true,
    scales:{
      xAxes:[{
        ticks:{
          autoSkip:false
        }
      }]
    }
  }
});
}
ConfirmedCases()

function ActiveCases(){
  new Chart(document.getElementById("line-chart3"), {
  type: 'line',
  data: {
    labels: states,
    datasets: [{ 
        data: active,
        label: "Active",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Active Cases'
    },
    scaleShowValues:true,
    scales:{
      xAxes:[{
        ticks:{
          autoSkip:false
        }
      }]
    }
  }
});
}
ActiveCases()

function RecoveredCases(){
  new Chart(document.getElementById("line-chart2"), {
  type: 'line',
  data: {
    labels: states,
    datasets: [{ 
        data: recovered,
        label: "Recovered",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Recovered Cases'
    },
    scaleShowValues:true,
    scales:{
      xAxes:[{
        ticks:{
          autoSkip:false
        }
      }]
    }
  }
});
}
RecoveredCases()

function DeathCases(){
  new Chart(document.getElementById("line-chart4"), {
  type: 'line',
  data: {
    labels: states,
    datasets: [{ 
        data: dead,
        label: "Deaths",
        borderColor: "#3e95cd",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'Deaths Cases'
    },
    scaleShowValues:true,
    scales:{
      xAxes:[{
        ticks:{
          autoSkip:false
        }
      }]
    }
  }
});
}
DeathCases()

});