<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="70px"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
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
      <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}　
      </v-flex> 
    </v-layout>

    <v-btn
      color="pink"
      dark
      small
      absolute
      bottom
      right
      fab
      @click="addDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">글 작성</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field
                  label="제목"
                  persistent-hint
                  required
                  v-model="form.title"
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  label="내용"
                  persistent-hint
                  required
                  v-model="form.content"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1"  @click="add()">확인</v-btn>
          <v-btn color="red darken-1"  @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="sb.act"
    >
      {{ sb.msg }}
      <v-btn
        :color="sb.color"
        @click="sb.act = false"
      >
        닫기
      </v-btn>
    </v-snackbar>
  </v-container>
</template>
<script>
import axios from 'axios'


export default {
  data () {
    return {
      board: {
        name: '로딩중...',
        rmk: '무엇?'
      },
      articles: [],
      dialog: false,
      form: {
        title: '',
        content: ''
      },
      sb: {
        act: false,
        msg: '',
        color: 'error'
      }
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    addDialog () {
      this.dialog = true
      this.form = {
        title: '',
        content: ''
      }
    },
    get () {
      axios.get('http://localhost:3000/api/board/freeboard')
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          // console.log('데이터입니다',data)
          this.board = data.d
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    add () {
      if (!this.form.title) return this.pop('제목을 작성해주세요', 'warning')
      if (!this.form.content) return this.pop('내용을 작성해주세요', 'warning')
      axios.post(`http://localhost:3000/api/article/${this.board._id}`, this.form)
        .then((r) => {
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    list () {
      axios.get(`http://localhost:3000/api/article/${this.board._id}`)
        .then(({ data }) => {
          // console.log('아티클입니다',data)
          this.articles = data.ds
          console.log('아티클확인',this.articles)
        })
        .catch((e) => {
          this.pop(e.message, 'error')
        })
    },
    pop (m, c) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = c
    }
  }
}
</script>