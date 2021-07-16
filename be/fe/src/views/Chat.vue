<template>
  <v-containers class="pa-10" fluid>
    <v-row>
      <v-col cols="11" class="mx-auto">
        <v-card class="" style="padding:0; margin:0; border-radius:30px;">
          <v-img
            class="white--text"
            height="120px"
            src="https://cdn.pixabay.com/photo/2017/11/06/08/42/personal-2923048__340.jpg"
            style="border-radius:10px;"
          >
            <v-card-title>채팅방</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <v-row style="text-align:center; margin-top:50px;">
      <v-col col="10" offset="1" >
        <!-- 채팅방이름 ,참여인원수변수 , 클릭이벤트 -->
        <v-card class="chatroom " >
          <v-img
            class="white--text"
            height="240px"
            src="../assets/chatimg1.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          영화
          </v-img>
            <div class="d-inline-flex">
              <v-icon class="icon">mdi-account-circle</v-icon>
              <h4>{{chat1cnt}}</h4>
              <button type="button" @click="chat1">
                입장하기
              </button>
            </div>
        </v-card>
        <v-card class="chatroom" >
          <v-img
            class="white--text"
            height="240px"
            src="../assets/chatimg2.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          드라마
          </v-img>
            <div class="d-inline-flex">
              <v-icon class="icon">mdi-account-circle</v-icon>
              <h4>{{chat2cnt}}</h4>
              <button type="button" @click="chat2">
                입장하기
              </button>
            </div>
        </v-card>
        <v-card class="chatroom" >
          <v-img
            class="white--text"
            height="240px"
            src="../assets/chatimg3.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          TV/예능
          </v-img>
            <div class="d-inline-flex">
              <v-icon class="icon">mdi-account-circle</v-icon>
              <h4>{{chat3cnt}}</h4>
              <button type="button" @click="chat3">
                입장하기
              </button>
            </div>
        </v-card>
        <v-card class="chatroom" >
          <v-img
            class="white--text"
            height="240px"
            src="https://t1.daumcdn.net/cfile/tistory/9917503E5AB207E12E"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          애니
          </v-img>
            <div class="d-inline-flex">
              <v-icon class="icon">mdi-account-circle</v-icon>
              <h4>{{chat4cnt}}</h4>
              <button type="button" @click="chat4">
                입장하기
              </button>
            </div>
        </v-card>
      </v-col>
    </v-row>
    <v-row >
      <v-col cols="12" >
        <div class="void" style="height:1000px;" >
        </div>
      </v-col>
    </v-row >
    <!-- 채팅방 다이얼로그 -->
      <v-dialog v-model="dialog" persistent width="1000">
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          {{flag}}
        </v-card-title>

        <v-card-text>
          <!-- <label>내용</label> -->
          <md-field>
          <md-textarea class="ta" v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
          </md-field>
          <!-- <label>입력</label> -->
          <v-text-field
              label="내용 입력 후 Enter"
              v-model="message"
              @keyup.enter="sendMessage()"
              />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="exitRoom">
            나가기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog> 
  </v-containers>

      

</template>


<script>

import axios from 'axios'

    export default {
        name: 'HelloWorld',
        created() {
            var vm = this;
            axios.get('http://localhost:3000/auth/info')
                .then(res => {
                // console.log("front :: " , res);
                vm = res.data;
                this.authName = vm.name;
                this.authEmail = vm.email;
                this.authId = vm._id;
                })
                .catch(err => {
                // console.log(err);
            })

            //  클라이언트로부터 새로운 대화내용 받아와 표시
            this.$socket.on('chat', (data)=> {
                this.textarea += "[" + data.authName + "] " + data.message + "\n"
            })
        },
        data() {
            return {
                authId: '',
                authName:'',
                authEmail:'',
                textarea: "",
                message: '',
            }

        },
        methods: {
            sendMessage () {
                //  입력 내용 전송
                this.$socket.emit('chat',{
                    message: this.message,
                    authName: this.authName,
                    room: 'free'
                });

                this.textarea += "[" + this.authName + "] " + this.message + "\n"
                this.message = ''
            }
        }
    }
</script>

<style>
    .md-app {
        height: 800px;
        border: 1px solid rgba(#000, .12);
    }

    .md-textarea {
        height: 300px;
    }
</style>