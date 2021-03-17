import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
              data: [],
              label: "",
              borderColor: "#3e95cd",
              fill: false
            }, {
              data: [],
              label: "",
              borderColor: "#8e5ea2",
              fill: false             
            }, {
              data: [],
              label: "",
              borderColor: "#3cba9f",
              fill: false             
            }, {
              data: [],
              label: "",
              borderColor: "#e8c3b9",
              fill: false             
            }, {
              data: [],
              label: "",
              borderColor: "#c45850",
              fill: false             
            }, {
              data: [],
              label: "",
              borderColor: "#eba134",
              fill: false                   
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Four Hourly (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      var retrievedData = {};
      axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
          response.data.items.forEach(data => {
            var key1;
            var psi = data.readings.psi_twenty_four_hourly;
            for (key1 in psi) {
              if (!(key1 in retrievedData)) {
                retrievedData[key1] = []; 
              }
              retrievedData[key1].push(psi[key1]);
            }
            this.datacollection.labels.push(data.timestamp);
          })
          var key2;
          var index = 0;
          for (key2 in retrievedData) {
            this.datacollection.datasets[index].label = key2;
            this.datacollection.datasets[index].data = retrievedData[key2];
            index += 1;
          }
          this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}
