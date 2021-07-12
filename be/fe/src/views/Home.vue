<template>
  <v-container class="" fluid>
    <video autoplay muted loop class="mainvideo" >
      <source src="../assets/blackwidow.mp4" type="video/mp4"/>
    </video>
      <v-content>
      <v-row>
        <v-col cols="12">
          <v-sheet
          class="netRec ma-8"
          elevation="8"
          max-width="92vw"
          dark
          >
          <h1 class="font-weight-black" style="font-family:none; margin-left:5px">박스오피스 TOP7</h1>
          <v-slide-group
            class="pa-5"
            show-arrows
          >
            <v-slide-item
              class="card-item"
              v-for="(slide,i) in movieRank"
              :key="slide"
              v-slot="{ active, toggle }"
            >
              <v-card
              :color="active ? 'red' : 'black'"
              class="ma-5 cards"
              max-height="300px"
              width="280px"
              @click="toggle"
              to="/"
              hover
              >
              <h1 style="right:-16%; color:transparent;">{{i+1}}</h1>
              <v-img
                class="white--text align-end"
                width="150px"
                height="240px"
                :src="slide.img"
              >
                <!-- <v-card-title class="cards-title">{{slide.title}}</v-card-title> -->
              </v-img>
            </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-content>
    <v-row justify="center" >
      <v-col cols="3">
        <v-card dark class="card1">
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
      </v-col>
      <v-col cols="3" offset="1">
        <v-card dark class="card2">
          <v-card-title>국내 OTT 시장 점유율</v-card-title>
          <v-card-subtitle>단위:만</v-card-subtitle>
          <doughnut-chart :chart-data="doughnutCollection" :options="optionss"></doughnut-chart>
        </v-card>
      </v-col>
      <v-col cols="3" offset="1">
        <v-card dark class="card3">
          <v-card-title>OTT 이용요금</v-card-title>
          <v-card-subtitle>단위:백원(기본요금기준)</v-card-subtitle>
          <bar-chart :chart-data="barchartdata" :options="options"></bar-chart>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  
  
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

<style scoped>
.mainvideo{
  position: relative;
  max-height: 90vh;
  width: 100%;
  object-fit: fill;
  overflow: hidden;
}
.container {
  padding: 0;
}
.netRec{
  background-color: black;
  /* border: solid 1px white; */
  margin-bottom: 10px;
  padding: 0px;
  top: -10%;
}
.card-item{
    margin: 30px;
    transform-style: preserve-3d;
    perspective: 700px;
    animation: spin 3s infinite linear;
}
.cards{
    display: flex;
    margin: 30px;
    transform-style: preserve-3d;
    perspective: 700px;
    animation: spin 5s infinite linear;
    /* background-color: black; */
    margin: 0px;
    padding: 0px;
}
.cards h1{
    font-size: 12em;
    font-family: 'Babas Neue' !important;
    width: 140px;
    height: 200px;
    margin:0px;
    transform: translateZ(1px);
    position: relative;
    -webkit-text-stroke: grey 3px;
}
@keyframes spin {
   from{
    transform: rotateY(-20deg);
  }to{
    transform: rotateY(20deg);
  }
}

.mainvideo{
  position: relative;
  max-height: 90vh;
  width: 100%;
  object-fit: fill;
  overflow: hidden;
}
.container{
  background: #101010;
}
.card1{
  height: 550px;
}
</style>
