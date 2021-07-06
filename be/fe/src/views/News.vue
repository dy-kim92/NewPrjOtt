<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        
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
            console.log(data)
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
            console.log('cine data', data)
            this.cine = data.dr
          })
          .catch((e) => {
            this.$store.commit('pop', { msg: e.message, color: 'warning' })
          })
      
    }
  }

}
</script>
