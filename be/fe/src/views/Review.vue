<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="70px"
            src="https://demo.ycart.kr/shopboth_marmalade_001/data/editor/1612/cd2f39a0598c81712450b871c218164f_1482469121_0784.jpg"
          >
            <v-container fill-height fluid>
              <v-layout fill-height>
                <v-flex xs6 align-end flexbox>
                  <span class="headline">{{board.name}}</span>
                </v-flex>
                <v-flex xs6 align-end flexbox>
                  <span>{{board.rmk}}</span>
                </v-flex>
              </v-layout>
            </v-container>
          </v-img>
        </v-card>
      </v-flex>

      <v-row >
        <v-col cols="8" offset="2">
          <v-row>
            <v-card
              v-for="n in 30"
              :key="n"
              class="mx-auto ma-10"
              max-width="200"
              max-height="260"
              id="togetherCard"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
              >
              <v-card-title class="justify-center align-center">title</v-card-title>
              </v-img>
              <v-card-subtitle class="font-weight-black rateMovie">평점</v-card-subtitle>
            </v-card>
          </v-row>
        </v-col>
      </v-row>


    </v-layout>
  </v-container>
</template>


<script>
import axios from 'axios'
export default {
  data () {
    return {
      board: {
        name: 'Loading...',
        rmk: ''
      },
      movies: []
    }
  },
  mounted () {
    this.get()
  },
  methods:{
    // board get 
    get () {
      axios.get('http://localhost:3000/api/board/review')
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          console.log('데이터입니다',data)
          this.board = data.d
          // this.list()
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })  
    },
    // movie list 받아오기
    // list () {
    //   axios.get(`http://localhost:3000/api/movie/list/${this.board._id}`,
    //     {params:{ skip:this.startOffset, limit: this.dataPerPage}})
    //     // params skip, limit 보내기 (url)
    //     .then(({ data }) => {
    //       if (!data.success) throw new Error(data.msg)
    //       this.movies = data.ds
    //       // dataTotal 값 갱신
    //       // this.dataTotal = data.t
    //       // console.log('아티클확인',this.articles)
    //     })
    //     .catch((e) => {
    //       this.$store.commit('pop', { msg: e.message, color: 'warning' })
    //     })
    // },
  },

}
</script>