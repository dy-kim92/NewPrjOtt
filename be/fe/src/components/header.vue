<template>
    <div>
        <a href="/">로고&emsp;</a>
        <a href="/review">리뷰&emsp;</a>
        <a href="/freeboard">게시판&emsp;</a>
        <a href="/board2">함께봐요&emsp;</a>
        <a href="/rank">실시간 검색순위&emsp;</a>
        <a href="/token">토큰체크페이지&emsp;</a>
        <a href="/chat">웹소켓&emsp;</a>
        <a href="/news">최신뉴스&emsp;</a>
        <a v-if="authEmail" href="http://localhost:3000/auth/logout">로그아웃&emsp;</a>
        <!-- 로그인 다이얼로그 -->
        <v-btn color="warning" fab dark @click="mdUp">
            <v-icon>mdi-account-circle</v-icon>
            
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                    <span class="headline">로그인</span>
                    </v-card-title>
                    <v-card-text>
                    <validation-observer>
                    <v-form>
                        <v-container fluid>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <validation-provider
                                v-slot="{errors}"
                                name="이메일"
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
                                name="비밀번호"
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
                        <small type="button" @click="mdUp3">비밀번호찾기</small>
                        <v-checkbox
                            v-model="remember"
                            label="로그인 유지"
                        ></v-checkbox>
                    </v-form>
                    </validation-observer>
                    <v-col>
                        <a href="/auth/kakao" alt="kakao login">
                            <img src="../assets/kakao_login_medium_wide.png" alt="kakao">
                        </a>
                        <a href="/auth/naver" alt="naver login">
                            <img src="../assets/naver_login.png" alt="naver">
                        </a>
                    </v-col>
                    </v-card-text>
                    <v-card-actions>    
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="mdUp2">회원가입</v-btn>
                    <v-btn color="primary" @click="postLoginData" router-link to="/">로그인</v-btn>
                    <v-btn color="primary" @click.native="dialog = false">닫기</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
            <!-- 회원가입 다이얼로그 -->
            <v-dialog v-model="dialog2" width="500">
            <v-card>
                <v-card-title class="text-h5 grey lighten-2">
                회원가입
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
                        name="닉네임"
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
                        name="이메일"
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
                        name="비밀번호"
                        :rules="{
                            required:true,
                            min:8,
                            }"
                    >
                    <v-text-field v-model="joinPassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="비밀번호"
                            counter
                            @click:append="show1 = !show1"
                            :error-messages="errors"
                    ></v-text-field>
                    </validation-provider>
                    <!--비밀번호 일치 Validation -->
                    <validation-provider
                        v-slot="{errors}"
                        name="비밀번호확인"
                        :rules="{
                            required:true,
                            confirmed:'비밀번호'
                            }"
                    >
                    <v-text-field v-model="checkPassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-1"
                            label="비밀번호 확인"
                            counter
                            @click:append="show2 = !show2"
                            :error-messages="errors"
                    ></v-text-field>
                    </validation-provider>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" type="submit" :disabled="invalid">확인</v-btn>
                <v-btn color="primary" @click="dialog2 = false">취소</v-btn>
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
                <span class="text-h5">비밀번호찾기</span>
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
                                name="이메일"
                                :rules="{
                                    required:true,
                                    email:true,
                                    }"
                            >
                            <v-text-field
                            label="이메일을 입력해주세요"

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
                            >인증코드전송</v-btn>
                        </v-col>
                        <v-col cols="12">
                            <validation-provider
                                v-slot="{errors}"
                                name="인증코드"
                                :rules="{
                                    required:true,
                                    confirmed:'인증코드확인체크'
                                    }"
                            >
                            <v-text-field
                            label="인증코드를 입력해주세요"
                            v-model="inputcfcode"
                            :error-messages="errors"
                            ></v-text-field>
                            </validation-provider>
                        </v-col>
                        <validation-provider
                        name="인증코드확인체크">
                        <v-text-field 
                        v-model="cfcode" :type="password"
                         class="hiddenfield">
                        </v-text-field>
                        </validation-provider>
                        <v-col cols="12">
                        <validation-provider
                            v-slot="{errors}"
                            name="새로운비밀번호"
                            :rules="{
                                required:true,
                                min:8,
                                }"
                        >
                        <v-text-field v-model="newpassword"
                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show3 ? 'text' : 'password'"
                                name="input-10-1"
                                label="새로운 비밀번호를 입력해주세요"
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
                            name="새로운비밀번호확인"
                            :rules="{
                                required:true,
                                confirmed:'새로운비밀번호'
                                }"
                        >
                        <v-text-field v-model="newpasswordck"
                                :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show4 ? 'text' : 'password'"
                                name="input-10-1"
                                label="비밀번호 확인"
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
                    취소
                </v-btn>
                <v-btn
                    color="blue darken-1"
                    type="submit"
                    :disabled='invalid'
                >
                    전송
                </v-btn>
                </v-card-actions>
                </v-form>
                </validation-observer>
            </v-card>
            </v-dialog>
        </v-btn>
    </div>


    
</template>
 
<script>

import axios from 'axios'

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
    methods: {   
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
                } else this.$store.commit('pop', { msg: '로그인 성공', color: 'success'})
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
</style>