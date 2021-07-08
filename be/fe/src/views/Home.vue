<template>
  <v-row>
      <v-card>
        <v-list>
      <v-subheader>씨네21 박스오피스순위</v-subheader>
      <v-list-item-group
        v-model="selectedItem"
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title><small>관객수</small>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
      </v-card>
      <v-card>
        <v-card-title>국내 OTT 점유율</v-card-title>
        <v-card-subtitle>단위:만</v-card-subtitle>
        <doughnut-chart :chart-data="doughnutCollection" :options="optionss"></doughnut-chart>
      </v-card>
      <v-card>
        <v-card-title>OTT 이용요금</v-card-title>
        <v-card-subtitle>단위:백원(기본요금기준)</v-card-subtitle>
        <bar-chart :chart-data="barchartdata" :options="options"></bar-chart>
      </v-card>
  </v-row>
  
</template>

<script>
import DoughnutChart from './DoughtnutChart.vue'
import BarChart from './BarChart.vue'
export default {
  components:{
    DoughnutChart,
    BarChart,
  },
  data () {
    return {
      langs: ['ko', 'en'],
      items: [
        { text: 'Real-Time', icon: 'mdi-numeric-1-box' },
        { text: 'Audience', icon: 'mdi-numeric-2-box' },
        { text: 'Conversions', icon: 'mdi-numeric-3-box' },
      ],
      doughnutCollection: {
      labels: ["넷플릭스", "웨이브", "티빙", "시즌", "왓챠"],
      datasets: [
        {
          borderWidth: 5,
          backgroundColor: ["#E50914", "#011FFD", "#D81B60", "#FFC300", "#FF5733"],
          hoverBackgroundColor: ["#E50914", "#011FFD", "#D81B60", "#FFC300", "#FF5733"],
          hoverBorderColor: ["#E50914", "#011FFD", "#D81B60", "#FFC300", "#FF5733"],
          data: [1000, 395, 265, 168, 139]
        }
      ],
      },
      optionss:{
        plugins: {
                doughnutlabel: {
                  labels: [	
                    {
                      text: '국내 OTT 시장',
                      font: {
                        size: '30',
                        weight: 'bold',
                      }
                    },{
                      text: '점유율',
                      font: {
                        size: '20',
                        weight: 'bold',
                      }
                    },
                  ],
                },
              },
        },
      barchartdata:{
        labels: ["넷플릭스", "웨이브", "티빙", "시즌", "왓챠"],
        datasets:[
          {
            borderWidth: 5,
            backgroundColor: ["#E50914", "#011FFD", "#D81B60", "#FFC300", "#FF5733"],
            hoverBackgroundColor: ["#E50914", "#011FFD", "#D81B60", "#FFC300", "#FF5733"],
            hoverBorderColor: ["#E50914", "#011FFD", "#D81B60", "#FFC300", "#FF5733"],
            data: [95, 79, 79, 55, 79]
          },
        ]
      },
      options: {
        title: {
          display:false
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        legend: {
          display: false
        },
      }

      
    }
  }
}
</script>

<style>

</style>
