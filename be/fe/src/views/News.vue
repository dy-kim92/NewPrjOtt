<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
      <!-- <v-carousel
      cycle
      height="65vh"
      hide-delimiters
      show-arrows-on-hover
      id="mainCarousel"
     >
    <v-carousel-item
      v-for="slide in cine"
      :key="slide"
      class="carousel-item"
    >
        <v-row >
         <v-col md="9" sm="12" id="movieInfoBanner" >
        <img :width="1000" :src="slide.img" >
         </v-col>
         <v-col md="3" sm="12" class="white--text  intro">
           <div>
          <h1><strong>{{slide.title}}</strong></h1>
           <br/>
          <v-btn dark type="button" @click="readCine(slide.link)" class="detailBtn"> 자세히 보기 </v-btn>
           </div>
      </v-col>
        </v-row>
    </v-carousel-item>
  </v-carousel> -->
      <v-sheet
        class="mx-auto"
        elevation="10"
        max-width="1500"
        style="background-color:white;"
        >
          <v-slide-group
            v-model="model"
            class="pa-4"
            show-arrows
          >
            <v-slide-item
              v-for="slide in cine"
              :key="slide"
              v-slot="{ active, toggle }"
            >
            <v-card
              :color="active ? 'red' : 'white'"
              class="ma-4"
              height="220"
              width="310"
              @click="readCine(slide.link)"
            >
                <v-img
                  width="310px"
                  height="160px"
                  :src="slide.img"
                >
                </v-img>
                <h3 class="pa-2 black--text">{{slide.title}}</h3>  
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>  
      </v-flex>
        <v-flex xs12>
          <v-data-table
            hide-default-footer
            :headers="headers"
            :items="articles"
            :loading="loading">
            <template v-slot:item.time="props">
              {{ (props.item.time) }}
            </template>
            <template v-slot:item.title="props">
              <a @click="link(props.item.link)">{{ props.item.title }}</a>
            </template>
            <template v-slot:item.media="props">
              {{ props.item.media }}
            </template>
          </v-data-table>
        </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      articles: [],
      cine : [],
      headers: [
        { text: '날짜', value: 'time', sortable: true },
        { text: '제목', value: 'title', sortable: true },
        { text: '언론사', value: 'media', sortable: false },
      ],
    }
  },
  mounted () {
    this.list()
    this.cinelist()
  },
  methods:{
    list () {
        if (this.loading) return
        this.loading = true
        axios.get('http://localhost:3000/api/news/list/latest')
          .then(({ data }) => {
            if (!data.success) throw new Error(data.msg)
            this.articles = data.ds
            this.loading = false
          })
          .catch((e) => {
            this.$store.commit('pop', { msg: e.message, color: 'warning' })
            this.loading = false
          })
    },
    link (url) {
      var ret = window.open(url)
    },
    cinelist () {
      axios.get('http://localhost:3000/api/news/list/cine')
          .then(({ data }) => {
            this.cine = data.dr
          })
          .catch((e) => {
            this.$store.commit('pop', { msg: e.message, color: 'warning' })
          })
      
    },
    readCine (url) {
      console.log('this is url',url)
      var ret = window.open(url)
    }
  }

}
</script>
