import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: ["Pork Fried Rice","Mapo Tofu","Sambal KangKung","Cereal Prawn","Dry Beef Hor Fun", "Prawn omelette"],
            datasets: [{
                label: "Dish count",
                backgroundColor: ["blue", "purple", "green", "orange", "red"],
                data: [0,0,0,0,0,0]
              }]
        },
        options: {
            scales: {
              yAxes: [{
                ticks: {
                  min: 0,
                  max: 20
            }}]},
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Each Dish'
            },
            responsive: true,
            maintainAspectRatio: false
        },
        temp: []
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
          var obj = doc.data();
          var quantities = Object.values(obj);
          var dishes = Object.keys(obj);
          for (var i = 0; i < 6; i++) {
            var dish = dishes[i];
            var index = this.datacollection.labels.indexOf(dish);
            var prev_qty = this.datacollection.datasets[0].data[index];
            var new_qty = prev_qty + quantities[i]
            this.datacollection.datasets[0].data[index]=new_qty;
          }
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}