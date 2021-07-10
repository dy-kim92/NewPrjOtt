<template>
  <v-row>
    <v-card
      class="mx-auto"
      max-width="344"
      outlined
      v-for="item in movieRank"
      :key="item"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{item.title}}
          </v-list-item-title>
          <v-list-item-subtitle><b>예매율{{item.bookingrate}}</b></v-list-item-subtitle>
        </v-list-item-content>

        
      </v-list-item>
      <v-img
          width="100px"
          height="150px"
          :src="item.img"
        >
        </v-img>
    </v-card>
      <v-card>
        <!-- <v-img
      src="https://hips.hearstapps.com/digitalspyuk.cdnds.net/17/31/1501854760-certified-fresh.png?resize=480:*"
      height="300px"
      width="300px"
      dark
    ></v-img> -->
        <v-list>
      <v-subheader>POPULAR STREAMING MOVIES</v-subheader>
      <v-list-item-group
        color="primary"
      >
        <v-list-item
          v-for="(item, i) in movieRank"
          :key="i"
        >
          <v-list-item-icon>
            <v-icon>mdi-movie-open</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.popular"></v-list-item-title>
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
import axios from 'axios'
export default {
  components:{
    DoughnutChart,
    BarChart,
  },
  mounted () {
    this.list()
  },
  data () {
    return {
      movieRank: [],
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
  },
  methods:{
    list () {
      console.log("start")
        axios.get('http://localhost:3000/api/movierank/list/rank')
          .then(({ data }) => {
            console.log(data)
            this.movieRank = data.ds
          })
          .catch((e) => {
            this.$store.commit('pop', { msg: e.message, color: 'warning' })
          })
    },

  }
}
</script>

<style>

</style>
