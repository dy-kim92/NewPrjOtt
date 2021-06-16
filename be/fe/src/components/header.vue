<template>
    <div>
        <a href="/">로고&emsp;</a>
        <a href="/review">리뷰&emsp;</a>
        <a href="/board">게시판&emsp;</a>
        <a href="/board2">함께봐요&emsp;</a>
        <a href="/rank">실시간 검색순위&emsp;</a>

        <!-- 로그인 다이얼로그 -->
        <v-btn color="warning" fab dark @click="mdUp">
            <v-icon>mdi-account-circle</v-icon>
            
            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-card-title>
                    <span class="headline">로그인</span>
                    </v-card-title>
                    <v-card-text>
                    <v-form>
                        <v-container fluid>
                        <v-row>
                            <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="email"
                                :rules="[rules.required, rules.email]"
                                label="E-mail"
                            ></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6">
                            <v-text-field
                                v-model="password"
                                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                                :rules="[rules.required, rules.min]"
                                :type="show1 ? 'text' : 'password'"
                                name="input-10-1"
                                label="Password"
                                counter
                                @click:append="show1 = !show1"
                            ></v-text-field>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-form>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" flat @click="d2">회원가입</v-btn>
                    <v-btn color="primary" flat>로그인</v-btn>
                    <v-btn color="primary" flat @click.native="dialog = false">닫기</v-btn>
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
                <v-form ref="form" v-model="valid" lazy-validation>
                    <!-- 닉네임 -->
                    <v-text-field v-model="name" :counter="10" :rules="joinRules" label="Name" required></v-text-field>
                    <!-- 이메일 -->
                    <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                    <!-- 비밀번호 & 비밀번호 확인 -->
                    <v-text-field v-model="joinPassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min]"
                            :type="show1 ? 'text' : 'password'"
                            name="input-10-1"
                            label="비밀번호"
                            counter
                            @click:append="show1 = !show1"
                    ></v-text-field>
                    <v-text-field v-model="checkPassword"
                            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                            :rules="[rules.required, rules.min, passwordConfirmationRule]"
                            :type="show2 ? 'text' : 'password'"
                            name="input-10-1"
                            label="비밀번호 확인"
                            counter
                            @click:append="show2 = !show2"
                    ></v-text-field>
                    <!-- 약관동의 -->
                    <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || '이용 약관에 동의하셔야 가입이 가능합니다.']"
                    label="사이트 이용 약관 동의"
                    required
                    ></v-checkbox>

                    <!-- <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Validate</v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

                    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn> -->
                </v-form>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog2 = false">취소</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-btn>
    </div>


    
</template>
 
<script>
export default {
  name: 'main-header',

  data () {
      return {
            dialog: false,
            dialog2: false,
            show1: false,
            show2: false,
            email: '',
            password: '',
            name: '',
            joinPassword: '',
            checkPassword: '',
            pwCheckRule: [
                v => v === this.joinPassword || '비밀번호가 일치하지 않습니다.'
            ],
            joinRules: [
                v => !!v || '닉네임을 입력해주세요.',
                v => (v && v.length <= 10) || '닉네임은 10자 이하로 입력하세요.',
            ],
            rules: {
                required: value => !!value || '비밀번호를 입력해주세요.',
                min: v => v.length >= 8 || '비밀번호는 8자 이상입니다.',
                emailMatch: () => (`The email and password you entered don't match`),
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || '이메일 형식이 아닙니다.'
                },
            },
            computed: {
            passwordConfirmationRule() {
            return () => (this.joinPassword === this.checkPassword) || '비밀번호가 일치하지 않습니다.'
            },
        }
      }
    },
  methods: {    
    mdUp () {
        this.dialog = true
    },
    d2 () {
        this.dialog2 = true
    }
  }
}
</script>
 
<style scoped>
</style>