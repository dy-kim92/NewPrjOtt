<template>
  <v-container class="home" fluid>
    <video autoplay muted loop class="mainvideo" >
      <source src="../assets/blackwidow.mp4" type="video/mp4"/>
    </video>
      <v-content>
      <v-row>
        <v-col cols="12">
          <v-sheet
          class="netRec ma-7"
          elevation="8"
          max-width="100vw"
          dark
          >
          <h1 class="font-weight-black" style="font-family:none; margin-left:5px">{{$t('home.boxOffice')}}</h1>
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
              class="ma-7 cards"
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
    <v-row justify="center" class="mb-0 pa-8">
      <v-col cols="4">
        <v-card dark style="background:#202936" height="70vh">
          <v-list style="background:#202936">
            <v-subheader>POPULAR STREAMING MOVIES</v-subheader>
            <v-subheader><small>source of Rotten tomatoes</small></v-subheader>

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
      <v-col cols="4">
        <v-card dark style="background:#202936">
          <v-card-title>{{$t('home.marketShare')}}</v-card-title>
          <v-card-subtitle>{{$t('home.unit')}}</v-card-subtitle>
          <doughnut-chart :chart-data="doughnutCollection" :options="optionss"></doughnut-chart>
        </v-card>
      </v-col>
      <v-col cols="4">
        <v-card dark style="background:#202936">
          <v-card-title>{{$t('home.usageFee')}}</v-card-title>
          <v-card-subtitle>{{$t('home.usageFeeUnit')}}</v-card-subtitle>
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
    let lang = localStorage.getItem('language')
              if (lang == "한국어"){
                  this.$i18n.locale="한국어"
              } else if (lang == "English"){
                  this.$i18n.locale="English"
              } else {
                  this.$i18n.locale="日本語"
              }
    
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
      labels: ["Netflix", "Wavve", "TVing", "Seezn", "WATCHA"],
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
                      text: 'Market',
                      font: {
                        size: '30',
                        weight: 'bold',
                      }
                    },{
                      text: 'Share',
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
        labels: ["Netflix", "Wavve", "TVing", "Seezn", "WATCHA"],
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
        axios.get('/api/movierank/list/rank')
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
  background-color: #101A29;
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
  background: #000C1D;
}
.card1{
  height: 550px;
}
</style>
