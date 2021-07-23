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
          <h1 >{{$t('home.boxOffice')}}</h1>
          <v-slide-group
            class="pa-5"
            show-arrows="desktop"
            center-active
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
              @click="toggle"
              to="/"
              hover
              >
              <h1>{{i+1}}</h1>
              <v-img
                class="white--text align-end img"
                :src="slide.img"
              >
              </v-img>
            </v-card>
              </v-slide-item>
            </v-slide-group>
          </v-sheet>
        </v-col>
      </v-row>
    </v-content>
    <v-row justify="center" class="mb-0 pa-8">
      <v-col md="4" sm="12">
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
      <v-col md="4" sm="12">
        <v-card dark style="background:#202936">
          <v-card-title>{{$t('home.marketShare')}}</v-card-title>
          <v-card-subtitle>{{$t('home.unit')}}</v-card-subtitle>
          <doughnut-chart :chart-data="doughnutCollection" :options="optionss"></doughnut-chart>
        </v-card>
      </v-col>
      <v-col md="4" sm="12">
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
              if (lang == "日本語"){
                  this.$i18n.locale="日本語"
              } else if (lang == "English"){
                  this.$i18n.locale="English"
              } else {
                  this.$i18n.locale="한국어"
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
@media screen and (min-width:769px) {
/* 메인 동영상 */
.mainvideo{
  position: relative;
  max-height: 90vh;
  width: 100%;
  object-fit: fill;
  overflow: hidden;
}
.container {
  padding: 0;
  background: #000C1D;
}
/* 박스오피스 영역 */
.netRec{
  background-color: #101A29;
  /* border: solid 1px white; */
  margin-bottom: 10px;
  padding: 0px;
  top: -10%;
}
/* 박스오피스 텍스트 */
.netRec h1{
  font-weight: black;
  font-family:none;
  margin-left:5px;
}
/* 박스오피스 카드 */
.card-item{
    /* margin: 30px; */
    transform-style: preserve-3d;
    perspective: 700px;
    animation: spin 3s infinite linear;
}
/* 박스오피스 카드 */
.cards{
    display: flex;
    margin: 30px;
    transform-style: preserve-3d;
    perspective: 700px;
    animation: spin 5s infinite linear;
    /* background-color: black; */
    margin: 0px;
    padding: 0px;
    width: 20vw;
    height: 31vh;
    max-height: 31vh;
}
/* 박스오피스 넘버 */
.cards h1{
    font-size: 12em;
    font-family: 'Babas Neue' !important;
    width: 10vw;
    height: 30vh;
    margin:0px;
    transform: translateZ(1px);
    position: relative;
    -webkit-text-stroke: grey 3px;
    right: -13%;
    color:black;
}
/* 박스오피스 이미지 */
.cards .img{
   width:10vw ;
   height:31vh ;
}
/* 박스오피스 애니메이션 */
@keyframes spin {
   from{
    transform: rotateY(-20deg);
  }to{
    transform: rotateY(20deg);
  }
}
}
/* 분기점 */
@media screen and (max-width:768px) {
.container {
  padding: 0;
  background: #000C1D;
}
/* 메인동영상 */
.mainvideo{
  position: relative;
  max-height: 90vh;
  width: 100%;
  object-fit: fill;
  overflow: hidden;
  /* min-height: 40vh; */
}
/* 모바일 패딩삭제 */
.col-12,.col-sm-12 {
  padding:0px;
  margin: 1px;
}
/* 모바일 박스오피스 */
.netRec{
  background-color: #101A29;
  /* background-color: rgb(240, 236, 236); */
  /* border: solid 1px white; */
  /* margin-bottom: 10px; */
  padding: 0px;
  margin: 0px;
  /* top: -10%; */
}
/* 모바일 박스오피스 애니메이션 영역 */
.card-item{
    /* margin: 30px; */
    padding: 0px;
    transform-style: preserve-3d;
    perspective: 700px;
    animation: spin 3s infinite linear;
    width: 40vw;
}
@keyframes spin {
   from{
    transform: rotateY(-20deg);
  }to{
    transform: rotateY(20deg);
  }
}
/* 박스오피스 카드이미지 */
.cards .img{
  height: 40vh;
  width: 50vw;
}
/* 박스오피스 카드 */
.cards{
    display: flex;
    transform-style: preserve-3d;
    perspective: 700px;
    animation: spin 5s infinite linear;
    margin: 0px;
    padding: 0px;
    width: 75vw;
    height: 40vh;
}
/* 박스오피스 랭킹 */
.cards h1{
    font-size: 10em;
    font-family: 'Babas Neue' !important;
    margin:0px;
    /* width: 5vw;
    height: 10vh; */
    height: 40vh;
    width: 25vw;
    transform: translateZ(1px);
    position: relative;
    -webkit-text-stroke: grey 3px;
     right: -5%;
    color:black;
}
}
</style>