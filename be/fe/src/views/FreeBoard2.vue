<template>
  <v-containers>
    <v-row>
      <v-col cols="11" class="mx-auto">
        <v-card class="" style="padding:0; margin:0; border-radius:30px;">
          <v-img
            class="white--text"
            height="120px"
            src="https://cdn.pixabay.com/photo/2016/05/11/13/20/keyboard-1385706_960_720.jpg"
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
            src="https://cdn.pixabay.com/photo/2016/05/11/13/20/keyboard-1385706_960_720.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          비트컴퓨터1
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
            src="https://cdn.pixabay.com/photo/2016/05/11/13/20/keyboard-1385706_960_720.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          비트컴퓨터2
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
            src="https://cdn.pixabay.com/photo/2016/05/11/13/20/keyboard-1385706_960_720.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          비트컴퓨터3
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
            src="https://cdn.pixabay.com/photo/2016/05/11/13/20/keyboard-1385706_960_720.jpg"
            style="border-top-left-radius:20px; border-top-right-radius:20px;"
          >
          비트컴퓨터4
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
  </v-containers>

      <!-- 채팅방 다이얼로그 -->
      <v-dialog v-model="dialog" persistent width="500">
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

</template>


<script>
import axios from 'axios'

export default {
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
        });

        //  방 접속 알림
        this.$socket.on('noti_join_room', (res) => {
          this.textarea += "  SYSTEM : [" + res.authName + "] " + res.message + "\n"
          if(this.flag == 'chat1'){
            this.chat1cnt = res.cnt
            console.log('chat1 : ' + this.chat1cnt)
          }else if(this.flag == 'chat2'){
            this.chat2cnt = res.cnt
            console.log('chat2 : ' + this.chat2cnt)
          }else if(this.flag == 'chat3'){
            this.chat2cnt = res.cnt
            console.log('chat3 : ' + this.chat3cnt)
          }else if(this.flag == 'chat4'){
            this.chat2cnt = res.cnt
            console.log('chat4 : ' + this.chat4cnt)
          }
        });

        //  방 퇴장 알림
        this.$socket.on('noti_exit_room', (res) => {
          this.textarea += "  SYSTEM : [" + res.authName + "] " + res.message + "\n"
          if(this.flag == 'chat1'){
            this.chat1cnt = res.cnt
            console.log('chat1 : ' + this.chat1cnt)
          }else if(this.flag == 'chat2'){
            this.chat2cnt = res.cnt
            console.log('chat2 : ' + this.chat2cnt)
          }else if(this.flag == 'chat3'){
            this.chat3cnt = res.cnt
            console.log('chat3 : ' + this.chat3cnt)
          }else if(this.flag == 'chat4'){
            this.chat4cnt = res.cnt
            console.log('chat4 : ' + this.chat4cnt)
          }
        });

        //  방별 새로운 메세지 받아오기
        this.$socket.on('getMsg', (res) => {
          this.textarea += "[" + res.authName + "] " + res.message + "\n"
        });

        //  접속자 수 업데이트
        this.$socket.on('update', (res) => {
          this.chat1cnt = res.cnt1,
          this.chat2cnt = res.cnt2,
          this.chat3cnt = res.cnt3,
          this.chat4cnt = res.cnt4
        })
    },
  data () {
    return {
      dialog : false,
      roomName : '',
      authName : '',
      textarea: "",
      message: '',
      chat1cnt: null,
      chat2cnt: null,
      chat3cnt: null,
      chat4cnt: null,
      flag: ''
    }
  },
  methods: {
    chat1 () {
      this.dialog = true
      this.flag = 'chat1'
      this.roomName = 'chat1';
      this.$socket.emit('req_join_room', {
        roomName: this.roomName,
        authName: this.authName 
      });
    },
    chat2 () {
      this.dialog = true
      this.flag = 'chat2'
      this.roomName = 'chat2';
      this.$socket.emit('req_join_room', {
        roomName: this.roomName,
        authName: this.authName
      });
    },
    chat3 () {
      this.dialog = true
      this.flag = 'chat3'
      this.roomName = 'chat3';
      this.$socket.emit('req_join_room', {
        roomName: this.roomName,
        authName: this.authName
      });
    },
    chat4 () {
      this.dialog = true
      this.flag = 'chat4'
      this.roomName = 'chat4';
      this.$socket.emit('req_join_room', {
        roomName: this.roomName,
        authName: this.authName
      });
    },
    sendMessage () {
      //  입력 내용 전송
      this.$socket.emit('chatMsg',{
          message: this.message,
          authName: this.authName,
          roomName: this.roomName
      });

      //  내가 전송한 메세지는 [나]로 표시
      this.textarea += "[나] " + this.message + "\n"
      this.message = ''
    },
    exitRoom () {
      this.$socket.emit('req_exit_room', {
        roomName: this.roomName,
        authName: this.authName
      });
      this.roomName = ''
      this.dialog = false
      //  리렌더링 문제로 강제 새로고침
      this.$router.go();
    }
  }

}
</script>

<style scoped>
.chatroom{
  display: inline-block;
  position: relative;
  margin-right: 130px;
  margin-top: 50px;
  height: 300px;
  width: 300px;
  /* right: -50%; */
  padding: 0px;
  border-radius: 30px;
}
.chatroom button{
  background-color:red; 
  color:white; 
  padding:10px; 
  margin:10px; 
  position: relative;
  right: -50px;
  border-radius: 30px;
}
.chatroom h4{
  top: 17px;
  left: -30px;
  position: relative;
}
.icon {
  left: -35px;
}

.ta {
  width: 100%;
}

</style>