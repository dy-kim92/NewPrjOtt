<template>
  <v-container class="pa-8" fluid grid-list-md>
    <v-layout row wrap >
      <v-flex xs12>
        <v-card>
          <v-img
            class="white--text"
            height="120px"
            src="https://cdn.pixabay.com/photo/2016/05/11/13/20/keyboard-1385706_960_720.jpg"
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
      <v-text-field
        dark
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-flex xs12>
        <v-data-table
          hide-default-footer
          :headers="headers"
          :items="articles"
          :search="search"
          :loading="loading">
          <template v-slot:item._id="props">
            {{ id2date(props.item._id) }}
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
        </v-data-table>
        <div class="text-xs-center pt-2">
          <v-pagination v-model="curPageNum" :length="numOfPages"></v-pagination>
        </div>
      </v-flex>
    </v-layout>

    <v-btn
      color="blue"
      dark
      small
      absolute
      bottom
      right
      @click="addDialog"
    >
      <v-icon>add</v-icon>
    </v-btn>
    <v-dialog v-model="dialog" persistent max-width="1200px">
      <v-card v-if="!dlMode">
        <v-card-title>
          <span class="headline">{{selArticle.title}}</span>
        </v-card-title>
        <v-card-text>
          <!-- {{selArticle.content}} -->
          <viewer v-if="toggle" :initialValue="selArticle.content"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="mx-2"
            fab
            dark
            small
            @click="heart"
            color="pink"
          >
            <v-icon dark>
              mdi-heart
            </v-icon>
          </v-btn>
          <v-btn color="warning darken-1" @click.native="modDialog()">수정</v-btn>
          <v-btn color="error darken-1" @click.native="ca=true">삭제</v-btn>
          <v-btn color="secondary darken-1" @click.native="dialog = false">닫기</v-btn>
        </v-card-actions>

          <v-card-text v-if="ca">
            <v-alert v-model="ca" type="warning">
              <h4>정말 진행 하시겠습니까?</h4>
              <v-btn color="error" @click="del()">확인</v-btn>
              <v-btn color="secondary" @click="ca=false">취소</v-btn>
            </v-alert>
          </v-card-text>

          <v-divider></v-divider>
        <v-list two-line v-for="comment in selArticle._comments" :key="comment._id">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{comment.content}}</v-list-item-title>
              <v-list-item-subtitle>{{comment._user.name}}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn
                  icon
                  ripple
                  @click="commentDialogOpen(comment)"
              >
                <v-icon right color="warning lighten-1">
                  mdi-keyboard-return
                </v-icon>
              </v-btn>

            </v-list-item-action>
            <v-list-item-action>
              <v-btn
                  icon
                  ripple
                  @click="delComment(comment)"
              >
                <v-icon right color="error">
                  mdi-eraser
                </v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>
        <v-card-text>
          <v-text-field
              label="댓글 작성"
              v-model="formComment.content"
              append-icon="mdi-send"
              @keyup.enter="checkComment"
              @click:append="checkComment"
          >
          </v-text-field>
        </v-card-text>

      </v-card>
      <v-card v-else>
        <v-card-title>
          <span class="headline">글 {{(dlMode === 1) ? '작성' : '수정'}}</span>
          <v-spacer></v-spacer>
          <v-btn
              icon
              @click="dialog=!dialog"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
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
                <!-- editor invoke 반드시해줘야한다 -->
                <editor
                  previewStyle="vertical" 
                  height="400px" 
                  initialEditType="wysiwyg"
                  :initialValue="form.content" 
                  ref="editor"/>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" @click="(dlMode === 1) ? add() : mod()">확인</v-btn>
          <v-btn color="red darken-1" @click.native="dialog = false">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog width="400" v-model="commentDialog">
      <v-card>
        <v-card-text>
          <v-card-title>
            <span class="headline">댓글 수정</span>
          </v-card-title>
          <v-text-field
              label="댓글 수정"
              v-model="selComment.content"
              @keyup.enter="modComment()"
          >

          </v-text-field>

        </v-card-text>
        <v-card-actions>
          <v-btn color="warning" @click="modComment()">
            수정
          </v-btn>
          <v-btn color="secondary" @click="commentDialog = false">닫기</v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </v-container>
</template>
<script>
import axios from 'axios'
// toast ui editor
import 'codemirror/lib/codemirror.css'
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor, Viewer } from '@toast-ui/vue-editor'

export default {
  components:{
    editor : Editor,
    viewer : Viewer
  },

  data () {
    return {
      board: {
        name: 'Loading...',
        rmk: ''
      },
      editorText:'',
      curPageNum:1,
      dataPerPage:5,
      search:'',
      articles: [],
      dialog: false,

      commentDialog: false,
      selArticle: {
        _comments: []
      },
      selComment: {
        content: ''
      },
      formComment: {
        content: '',
      },

      form: {
        title: '',
        content: '',
      },
       headers: [
        { text: '날짜', value: '_id', sortable: true, class: 'hidden-sm-and-down' },
        { text: '제목', value: 'title', sortable: true, align: 'left' },
        { text: '글쓴이', value: '_user.name', sortable: false },
        { text: '조회수', value: 'cnt.view', sortable: true },
        { text: '추천', value: 'cnt.like', sortable: true }
      ],
      loading: false,
      dataTotal: 0,
      pagination: {},
      getTotalPage: 1,
      dlMode: 0, // 0: read, 1: write, 2: modify
      selArticle: {},
      ca: false, // 한번더 확인
      toggle: false, // toggle
    }
  },
  watch: {
    curPageNum: {
      handler() {
        this.list()
      },
      deep: true
    },
  },
  computed:{
    // 페이지값 
    startOffset() {
        return ((this.curPageNum - 1) * this.dataPerPage);
      },
    // 페이지 length 값 쓰기위해 총데이터/페이지값 세팅
    numOfPages() {
      return Math.ceil(this.dataTotal / this.dataPerPage);
    },

  },
  mounted () {
    this.get()
  },
  methods: {
    commentDialogOpen (c) {
      this.commentDialog = true
      this.selComment = c
    },
    checkComment () {
      if (this.dlMode === 0) this.addComment()
      else if (this.dlMode === 1) this.add()
    },
    addDialog () {
      this.dialog = true
      this.dlMode = 1
      this.form = {
        title: '',
        content: '',
      }
    },
    modDialog () {
      this.dlMode = 2
      this.form = {
        title: this.selArticle.title,
        content: this.selArticle.content
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
          // this.pop(e.message, 'error')
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })  
    },
    add () {
      this.form.content = this.$refs.editor.invoke('getMarkdown')
      if (!this.form.title) return this.$store.commit('pop', { msg: '제목을 작성해주세요', color: 'warning' })
      if (!this.form.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      axios.post(`http://localhost:3000/api/article/${this.board._id}`, this.form)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.dialog = false
          this.list()
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    list () {
      if (this.loading) return
      this.loading = true
      axios.get(`http://localhost:3000/api/article/list/${this.board._id}`,
        {params:{ skip:this.startOffset, limit: this.dataPerPage}})
        // params skip, limit 보내기 (url)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.articles = data.ds
          // dataTotal 값 갱신
          this.dataTotal = data.t
          // console.log('아티클확인',this.articles)
          // console.log(this.numOfPages)
          this.loading = false
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    read (atc) {
      // toggle 로 렌더링 분기처리해줘야한다
      this.toggle=!this.toggle
      this.selArticle = atc
      this.loading = true
      axios.get(`http://localhost:3000/api/article/read/${atc._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.dlMode = 0
          this.dialog = true
          this.selArticle.content = data.d.content
          this.selArticle.cnt.view = data.d.cnt.view
          this.selArticle._comments = data.d._comments
          this.loading = false
          this.toggle = true
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
          this.loading = false
        })
    },
    heart() {
      axios.put(`http://localhost:3000/api/article/${this.selArticle._id}/heart`, this.like)
        .then((r) => {
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    mod () {
      if (!this.form.title) return this.$store.commit('pop', { msg: '제목을 작성해주세요', color: 'warning' })
      if (!this.form.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      this.form.content = this.$refs.editor.invoke('getMarkdown')
      if (this.selArticle.title === this.form.title && this.selArticle.content === this.form.content)
        return this.$store.commit('pop',{msg:'변경된 내용이 없습니다',color: 'warning'})
      axios.put(`http://localhost:3000/api/article/${this.selArticle._id}`, this.form)
        .then(({ data }) => {
          this.dialog = false
          if (!data.success) throw new Error(data.msg)
          console.log(this.selArticle)
          this.selArticle.title = data.d.title
          this.selArticle.content = data.d.content
          this.list()
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    del () {
      axios.delete(`http://localhost:3000/api/article/${this.selArticle._id}`)
        .then(({ data }) => {
          this.dialog = false
          if (!data.success) throw new Error(data.msg)
          this.list()
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    id2date (val) {
      if (!val) return '잘못된 시간 정보'
      // 앞 8글자 16진수 변환후 1000 곱하기
      return new Date(parseInt(val.substring(0, 8), 16) * 1000).toLocaleString()
    },
    addComment () {
      axios.post(`http://localhost:3000/api/comment/${this.selArticle._id}`, this.formComment)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.formComment.content = ''
          console.log(this.selArticle._comments)
          this.read(this.selArticle)
          // this.list()
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    delComment (cmt) {
      axios.delete(`http://localhost:3000/api/comment/${cmt._id}`)
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.$store.commit('pop', { msg: '삭제완료', color: 'success' })
          this.read(this.selArticle)
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    },
    modComment () {
      if (!this.selComment.content) return this.$store.commit('pop', { msg: '내용을 작성해주세요', color: 'warning' })
      this.commentDialog = false
      axios.put(`http://localhost:3000/api/comment/${this.selComment._id}`, { content: this.selComment.content })
        .then(({ data }) => {
          if (!data.success) throw new Error(data.msg)
          this.$store.commit('pop', { msg: '수정완료', color: 'success' })
          this.read(this.selArticle)
        })
        .catch((e) => {
          this.$store.commit('pop', { msg: e.message, color: 'warning' })
        })
    }
  }
}
</script>
<style scoped>
</style>