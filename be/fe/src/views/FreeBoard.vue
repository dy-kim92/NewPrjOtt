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
      <!-- <v-flex xs12 sm6 md4 v-for="article in articles" :key="article._id">
        {{article}}　
      </v-flex>  -->
      <v-flex xs12>
        <v-data-table
          :headers="headers"
          :items="articles"
          :loading="loading">
          <template v-slot:item._id="props">
            {{ id2date(props.item.title) }}
          </template>
          <template v-slot:item.title="props">
            <a @click="read(props.item)">{{ props.item.title }}</a>
          </template>
          <template v-slot:item._user.name="props">
            {{ props.item._user.name }}
          </template>
          <template v-slot:item.cnt.view="props">
            {{ props.item.cnt.view }}
          </template>
          <template v-slot:item.cnt.like="props">
            {{ props.item.cnt.like }}
          </template>
            <!-- <td :class="headers[1].class"><a @click="read(props.item)"> {{ props.item.title }}</a></td>
            <td :class="headers[2].class">{{ props.item._user.name }}</td>
            <td :class="headers[3].class">{{ props.item.cnt.view }}</td>
            <td :class="headers[4].class">{{ props.item.cnt.like }}</td>
          </template> -->
        </v-data-table>
      <a @click="ck">this is a tag</a>
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
    <v-dialog v-model="dlRead" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">{{rd.title}}</span>
        </v-card-title>
        <v-card-text>
          {{rd.content}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click.native="dlRead = false">닫기</v-btn>
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
        name: 'Loading...',
        rmk: ''
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
      },
       headers: [
        { text: '날짜', value: '_id', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'title', sortable: true, align: 'left' },
        { text: '글쓴이', value: '_user.name', sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true },
        { text: '추천', value: 'cnt.like', sortable: true }
      ],
      loading: false,
      itemTotal: 0,
      pagination: {},
      getTotalPage: 1,
      dlRead: false,
      rd: {
        title: '',
        content: ''
      }
    }
  },
  mounted () {
    this.get()
  },
  methods: {
    ck () {
      alert('click!')
    },
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
      
      if (this.loading) return
      this.loading = true
      axios.get(`http://localhost:3000/api/article/list/${this.board._id}`)
        .then(({ data }) => {
          // console.log('아티클입니다',data)
          this.articles = data.ds
          // console.log('아티클확인',this.articles)
          this.loading = false
        })
        .catch((e) => {
          this.pop(e.message, 'error')
          this.loading = false
        })
    },
    read (atc) {
      this.rd.title = atc.title
      this.loading = true
      axios.get(`http://localhost:3000/api/article/read/${atc._id}`)
        .then(({ data }) => {
          this.dlRead = true
          this.rd.content = data.d.content
          this.loading = false
        })
        .catch((e) => {
          this.pop(e.message, 'error')
          this.loading = false
        })
    },
    pop (m, c) {
      this.sb.act = true
      this.sb.msg = m
      this.sb.color = c
    },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      // 앞 8글자 16진수 변환후 1000 곱하기
      // console.log('hi',val)
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    }
  }
}
</script>