<template>
    <div class="page-container">
        <md-app>
            <md-app-toolbar class="md-primary">
                <div class="md-toolbar-row">
                    <span class="md-title">웹소켓 테스트</span>
                </div>
            </md-app-toolbar>
            <md-app-content>
                <md-field>
                    <label>내용</label>
                    <md-textarea v-model="textarea" disabled v-auto-scroll-bottom></md-textarea>
                </md-field>
                <md-field>
                    <!-- <label>입력</label> -->
                    <v-text-field
                        label="입력"
                        v-model="message"
                        @keyup.enter="sendMessage()"
                        />
                    <!-- <md-input v-model="message"></md-input> -->
                    <!-- <md-button class="md-primary md-raised" @click="sendMessage()">전송</md-button> -->
                </md-field>
            </md-app-content>
        </md-app>
    </div>
</template>


<script>


    export default {
        name: 'HelloWorld',
        created(){
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
        },
        created() {
            this.$socket.on('chat', (data)=> {
                this.textarea += "[" + this.authName + "] " + data.message + "\n"
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

                this.$socket.emit('chat',{
                    message: this.message
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