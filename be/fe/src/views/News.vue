<template>
  <v-container class="pa-10" fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
      <v-sheet
        class="mx-auto"
        max-width="100%"
        style="background-color:#101a29;"
        >
          <v-slide-group
            dark
            v-model="model"
            class="pa-4"
            show-arrows="desktop"
          >
            <v-slide-item
              v-for="slide in cine"
              :key="slide"
            >
            <v-card
              class="ma-4 newscard"
              @click="readCine(slide.link)"
              style="background-color:#1E2734; border-radius:0.5vw"
            >
                <v-img
                  class="newsimg"
                  :src="slide.img"
                >
                </v-img>
                <h4 style="text-align:center;  color:#87CEEB;" class="pa-2 mt-3">{{slide.title}}</h4>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
      </v-flex>
        <v-flex xs12>
          <v-data-table
            style="background-color:#101a29; margin-top:2.5%;"
            dark
            hide-default-footer
            :headers="headers"
            :items="articles"
            :loading="loading">
            <template v-slot:item.time="props">
              {{ (props.item.time) }}
            </template>
            <template v-slot:item.title="props">
              <a style="color:skyblue;" @click="link(props.item.link)">{{ props.item.title }}</a>
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
    let lang = localStorage.getItem('language')
              if (lang == "日本語"){
                  this.$i18n.locale="日本語"
              } else if (lang == "English"){
                  this.$i18n.locale="English"
              } else {
                  this.$i18n.locale="한국어"
              }
  },
  methods:{
    list () {
        if (this.loading) return
        this.loading = true
        axios.get('/api/news/list/latest')
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
      axios.get('/api/news/list/cine')
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
<style scoped>
/* 웹 */
@media screen and (min-width:769px) {
.newscard{
  height: 34vh;
  /* height: 260px; */
   width: 22.7vw;
  /* width: 310px; */
}
.newsimg{
  /* height: 24vh; */
  width: 22.7vw;
  height: 21vh;
  /* height: 160px; */
  /* width: 310px; */
}
}
/* 모바일 */
@media screen and (max-width:768px) {
.newscard{
  height: 39vh;
  width: 62vw;
   /* height: 260px; */
  /* width: 300px; */
}
.newsimg{
  height: 24vh;
  width: 62vw;
}
}
</style>