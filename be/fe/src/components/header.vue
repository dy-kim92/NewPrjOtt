<template>
    <!-- <a href="/">{{$t('nav.main')}}&emsp;</a>
    <a href="/review">{{$t('nav.review')}}&emsp;</a>
    <a href="/freeboard">{{$t('nav.board')}}&emsp;</a>
    <a href="/board2">{{$t('nav.with')}}&emsp;</a>
    <a href="/rank">{{$t('nav.realTime')}}&emsp;</a>
    <a href="/chat">{{$t('nav.chat')}}&emsp;</a>
    <a href="/news">{{$t('nav.news')}}&emsp;</a>
     -->
    <v-container class="pa-0 ma-0" fluid>
        <v-row class="header">
            <div class="col-md-1">
                <a href="/" id="gohome">
                    <img  class="logo" src="../assets/001.png">
                </a>
            </div>
            <div class="col-md-2">
                <a href="/review" class="menu white--text">
                    {{$t('nav.review')}}
                </a>
            </div>
            <div class="col-md-2">
                <a href="/freeboard" class="menu white--text">
                    {{$t('nav.board')}}
                </a>
            </div>
            <div class="col-md-2">
                <a href="/news" class="menu white--text">
                    {{$t('nav.news')}}
                </a>
            </div>
            <div class="col-md-2">
                <a href="/chat" class="menu white--text">
                    {{$t('nav.chat')}}
                </a>
            </div>
            <!-- 언어변경 -->
            <v-col
            class="col-md-2">
                <!-- <v-select v-model="$i18n.locale" -->
                <v-select v-model="locale"
                dark
                dense
                label="Language"
                class="language pt-1"
                @change="changeLocale"
                outlined
                :items="langs">
                <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">
                    {{ lang }}
                </option>
                </v-select>
            </v-col>
            <v-col cols="1" v-if="authEmail">
                <a href="http://localhost:3000/auth/logout" class="menu white--text"><v-btn dark>{{$t('nav.logout')}}</v-btn></a>
            </v-col>
            <!-- 로그인 다이얼로그 -->
            <v-col v-else class="col-md-1">
                <v-btn class="mt-1" dark @click="mdUp">{{$t('nav.login')}}</v-btn>                    
                    <v-dialog v-model="dialog" persistent max-width="500px">
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{$t('nav.login')}}</span>
                            </v-card-title>
                            <v-card-text>
                            <validation-observer>
                            <v-form>
                                <v-container fluid>
                                <v-row>
                                    <v-col cols="12" sm="6">
                                    <validation-provider
                                        v-slot="{errors}"
                                        name="Email"
                                        :rules="{
                                            required:true,
                                            email:true,
                                            }">
                                        <v-text-field
                                            v-model="email"
                                            label="E-mail"
                                            :error-messages="errors"
                                        ></v-text-field>
                                    </validation-provider>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                    <validation-provider
                                        v-slot="{errors}"
                                        name="Password"
                                        :rules="{
                                            required:true,
                                            min:8,
                                            }"
                                    >
                                    <v-text-field
                                        v-model="password"
                                        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show1 ? 'text' : 'password'"
                                        name="input-10-1"
                                        label="Password"
                                        :counter=8
                                        @click:append="show1 = !show1"
                                        :error-messages="errors"
                                    ></v-text-field>
                                    </validation-provider>
                                    </v-col>
                                </v-row>
                                </v-container>
                                <small type="button" @click="mdUp3">{{$t('nav.findPwd')}}</small>
                                <v-checkbox
                                    v-model="remember"
                                    :label="$t('nav.keepLogin')"
                                ></v-checkbox>
                            </v-form>
                            </validation-observer>
                            <v-col >
                                <a href="/auth/kakao" alt="kakao login">
                                    <img src="../assets/kakao_login_medium_wide.png" alt="kakao" width="100%">
                                </a>
                                <a href="/auth/naver" alt="naver login">
                                    <img src="../assets/naver_login.png" alt="naver" width="100%">
                                </a>
                            </v-col>
                            </v-card-text>
                            <v-card-actions>    
                            <v-spacer></v-spacer>
                            <v-btn color="primary" @click="mdUp2">{{$t('nav.signIn')}}</v-btn>
                            <v-btn color="primary" @click="postLoginData" router-link to="/">{{$t('nav.login')}}</v-btn>
                            <v-btn color="primary" @click.native="dialog = false"><v-icon>mdi-close</v-icon></v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <!-- 회원가입 다이얼로그 -->
                    <v-dialog v-model="dialog2" width="500">
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                        {{$t('nav.signIn')}}
                        </v-card-title>

                        <br>
                        <v-card-text>
                        <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                        >
                        <v-form @submit.prevent="postData">
                            <!-- 닉네임 -->
                            <validation-provider
                                v-slot="{errors}"
                                name="Nickname"
                                :rules="{
                                    required:true,
                                    max:8,
                                    }"
                            >
                            <v-text-field v-model="name" :counter="8" label="NickName" :error-messages="errors"></v-text-field>
                            </validation-provider>
                            <!-- 이메일 -->
                            <validation-provider
                                v-slot="{errors}"
                                name="Email"
                                :rules="{
                                    required:true,
                                    email:true,
                                    }"
                            >
                            <v-text-field v-model="joinEmail" label="E-mail" :error-messages="errors"></v-text-field>
                            </validation-provider>
                            <!-- 비밀번호 & 비밀번호 확인 -->
                            <validation-provider
                                v-slot="{errors}"
                                name="Password"
                                :rules="{
                                    required:true,
                                    min:8,
                                    }"
                            >
                            <v-text-field v-model="joinPassword"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show1 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Password"
                                    counter
                                    @click:append="show1 = !show1"
                                    :error-messages="errors"
                            ></v-text-field>
                            </validation-provider>
                            <!--비밀번호 일치 Validation -->
                            <validation-provider
                                v-slot="{errors}"
                                name="Confirm Password"
                                :rules="{
                                    required:true,
                                    confirmed:'Password'
                                    }"
                            >
                            <v-text-field v-model="checkPassword"
                                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show2 ? 'text' : 'password'"
                                    name="input-10-1"
                                    label="Confirm Password"
                                    counter
                                    @click:append="show2 = !show2"
                                    :error-messages="errors"
                            ></v-text-field>
                            </validation-provider>

                        <v-divider></v-divider>

                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" type="submit" :disabled="invalid">{{$t('nav.submit')}}</v-btn>
                        <v-btn color="primary" @click="dialog2 = false"><v-icon>mdi-close</v-icon></v-btn>
                        </v-card-actions>
                        </v-form>
                        </validation-observer>
                        </v-card-text>
                    </v-card>
                    </v-dialog>
                    <!-- 비밀번호찾기 다이얼로그 -->
                    <v-dialog
                    v-model="dialog3"
                    max-width="600px"
                    >
                    <v-card>
                        <!-- 다이얼로그 타이틀 -->
                        <v-card-title>
                        <span class="text-h5">{{$t('nav.findPwd')}}</span>
                        </v-card-title>
                        <validation-observer
                            ref="observer"
                            v-slot="{ invalid }"
                        >
                        <v-form @submit.prevent="postUpdateData">
                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="8">
                                    <validation-provider
                                        v-slot="{errors}"
                                        name="Email"
                                        :rules="{
                                            required:true,
                                            email:true,
                                            }"
                                    >
                                    <v-text-field
                                    label="Write your Email"

                                    :error-messages="errors"
                                    v-model="findemail"
                                    ></v-text-field>
                                    </validation-provider>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn
                                    elevation="2"
                                    plain
                                    @click="postFindPwdData"
                                    >{{$t('nav.sendCode')}}</v-btn>
                                </v-col>
                                <v-col cols="12">
                                    <validation-provider
                                        v-slot="{errors}"
                                        name="Authentication code"
                                        :rules="{
                                            required:true,
                                            confirmed:'Confirm Authentication code'
                                            }"
                                    >
                                    <v-text-field
                                    label="Write your Authentication code"
                                    v-model="inputcfcode"
                                    :error-messages="errors"
                                    ></v-text-field>
                                    </validation-provider>
                                </v-col>
                                <validation-provider
                                name="Confirm Authentication code">
                                <v-text-field 
                                v-model="cfcode" :type="password"
                                    class="hiddenfield">
                                </v-text-field>
                                </validation-provider>
                                <v-col cols="12">
                                <validation-provider
                                    v-slot="{errors}"
                                    name="New Password"
                                    :rules="{
                                        required:true,
                                        min:8,
                                        }"
                                >
                                <v-text-field v-model="newpassword"
                                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show3 ? 'text' : 'password'"
                                        name="input-10-1"
                                        label="Write a New Password"
                                        counter
                                        @click:append="show3 = !show3"
                                        :error-messages="errors"
                                    ></v-text-field>
                                </validation-provider>
                                </v-col>
                            <!--비밀번호 일치 Validation -->
                            <v-col cols="12">
                                <validation-provider
                                    v-slot="{errors}"
                                    name="Confirm New Password "
                                    :rules="{
                                        required:true,
                                        confirmed:'New Password'
                                        }"
                                >
                                <v-text-field v-model="newpasswordck"
                                        :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                        :type="show4 ? 'text' : 'password'"
                                        name="input-10-1"
                                        label="Confirm New Password "
                                        counter
                                        @click:append="show4 = !show4"
                                        :error-messages="errors"
                                ></v-text-field>
                                </validation-provider>
                                </v-col>
                            </v-row>
                            </v-container>
                            </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog3 = false"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-btn
                            color="blue darken-1"
                            type="submit"
                            :disabled='invalid'
                        >
                            {{$t('nav.submit')}}
                        </v-btn>
                        </v-card-actions>
                        </v-form>
                        </validation-observer>
                    </v-card>
                    </v-dialog>
                
            </v-col>
        </v-row>
    </v-container>
</template>
 
<script async src="https://www.googletagmanager.com/gtag/js?id=G-QPJGZBZSSJ"></script>

<script>

import axios from 'axios'

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'G-QPJGZBZSSJ');

export default {
  name: 'main-header',
    created(){
    var vm = this;
    axios.get('http://localhost:3000/auth/info')
        .then(res => {
        // console.log("front :: " , res);
        vm = res.data;
        this.authId = vm._id;
        this.authName = vm.name;
        this.authEmail = vm.email;
        })
        .catch(err => {
        // console.log(err);
        })
    },
    data () {
        return {
                locale:'',
                langs: ['한국어', 'English', '日本語'],
                dialog: false,
                dialog2: false,
                dialog3: false,
                dialog4: false,
                show1: false,
                show2: false,
                show3: false,
                show4: false,
                authId: '',
                authName:'',
                authEmail:'',
                email: '',
                password: '',
                name: '',
                joinEmail: '',
                joinPassword: '',
                checkPassword: '',
                remember: false,
                findemail: '',
                inputcfcode:'',
                cfcode: '',
                newpassword: '',
                newpasswordck: '',
                
        }
    },
    watch:{
        locale: function(){
            let lang = localStorage.getItem('language')
            if (lang == "한국어"){
                this.$i18n.locale="한국어"
            } else if (lang == "English"){
                this.$i18n.locale="English"
            } else {
                this.$i18n.locale="日本語"
            }
        }
    },
    methods: {  
        changeLocale() {
            localStorage.setItem("language",this.locale)
        },
        mdUp () {
            this.dialog = true
        },
        mdUp2 () {
            this.dialog2 = true
        },
        mdUp3 () {
            this.dialog3 = true
        },
        postUpdateData () {
            this.dialog3 = false,
            this.dialog4 = true,
            this.$refs.observer.validate().then(result => {
                if (result) {
                    axios.post('http://localhost:3000/api/findpwd/updatepwd',{
                        email:this.findemail,
                        password:this.newpassword
                    })
                    .then((r) => {
                        console.log(r)
                    })
                    .catch((e) => {
                        this.$store.commit('pop', { msg: e.message, color: 'warning' })
                    })
                }
            })
               
        },
        postFindPwdData () {
            console.log(this.findemail)
            axios.post('http://localhost:3000/api/findpwd',{
                email: this.findemail
            })
            .then((r) => {
                console.log(r)
                this.cfcode = r.data.cfcode
                // console.log(r.data.cfcode)
            })
            .catch((e) => {
                this.$store.commit('pop', { msg: e.message, color: 'warning' })
            })
        },
        postData() {
            this.dialog2 = false // dialog 창닫기
            // 모든 검증을 통과한 경우 result = true 
            this.$refs.observer.validate().then(result => {
                if (result) {
                    axios.post('http://localhost:3000/api/register',{
                        name: this.name,
                        email: this.joinEmail,
                        password: this.joinPassword
                    })
                    .then((r) => {
                        if (r.data.success==false){
                            this.$store.commit('pop', { msg: '중복된 이메일입니다.', color: 'warning' })
                        } else this.$store.commit('pop', { msg: '회원가입 완료되었습니다.', color: 'success'})
                    })  
                    .catch((e) => {
                        this.$store.commit('pop', { msg: 'e.message', color: 'warning' })
                    })
                }
            })
        },
        postLoginData() {
            this.dialog = false // dialog 창닫기
            axios.post('http://localhost:3000/api/login',{
                email: this.email,
                password: this.password,
                remember: this.remember
            })
            .then((r) => {
                if (r.data.success==false){
                    this.$store.commit('pop', { msg: '로그인 실패', color: 'warning' })
                } else {
                    this.$store.commit('pop', { msg: '로그인 성공', color: 'success'})
                    this.$router.go();
                }
                    
            })
            .catch((e) => {
                this.$store.commit('pop', { msg: e.message, color: 'warning' })
            })
        },
        // logOut () {
        //     // this.$router.push('/auth/logout')
        // }
  }
  
}

</script>


<style scoped>
.hiddenfield{
    display:none
}
.row{
  display: flex;
  margin: 0px;
}
.header {
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 9%;
  position: fixed;
  /* display:ab; */
  top: 0;
  left: 0;
  z-index: 103;
  background-color: #000C1D;
}
a { 
    text-decoration:none;
 }
.menu{
  font-size: 2em;
  font-weight: 900;
}
#gohome {
  width: 100%;
  height: 48px;
  padding: 0px;
  margin-left: 30px;
  font-size: 2em;
  font-weight:900;
  color: #48D7FF;
}
.header .col-md-2{
    text-align:center;
}
.header .col-md-1{
    text-align:center;
}
.language {
    width:200px;
}
.icon {
    width:70px;
}
.logo {
    width:150px;
    margin-left: -45px;
    margin-top: -40px;
}
</style>