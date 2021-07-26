<template>
  <v-card dark style="text-align:center; background-color:#000C1D">
    <v-row id="vrow">
      <v-col cols="5" offset="2">
      <v-img style="margin-top:30%;" src="../assets/bubble2.png" alt="errorCharacter">
      <v-card-title style="text-align:center;margin-top:15%;margin-left:2%; font-size:2.5rem; color:black;">{{$t('error.msg1')}}</br></br>{{$t('error.msg2')}}</v-card-title></v-img>
      </v-col>
      <v-col cols="3">
      <v-img text-align="center" class="mt-15" src="../assets/error.png" alt="errorCharacter"></v-img>
      </v-col>
    </v-row>
    <v-row id="res1">
      <v-img style="width:15%;" src="../assets/bubble3.png" alt="errorCharacter">
      <v-card-title style="text-align:center;margin-top:15%;margin-left:2%; font-size:2.5rem; color:black;">{{$t('error.msg1')}}</br></br>{{$t('error.msg2')}}</v-card-title></v-img>
    </v-row>

    <v-row id="res2">
      <v-img text-align="center" style="width:10%;" src="../assets/error.png" alt="errorCharacter"></v-img>
      
    </v-row>
  </v-card>
</template>
<script>
export default {
mounted(){
  let lang = localStorage.getItem('language')
              if (lang == "日本語"){
                  this.$i18n.locale="日本語"
              } else if (lang == "English"){
                  this.$i18n.locale="English"
              } else {
                  this.$i18n.locale="한국어"
              }
}
}
</script>

<style scoped>
#res1{
  visibility:hidden;
}
#res2{
  visibility: hidden;
}
@media screen and (max-width:768px) {
  #vrow{
    display:none;
  }
  #res1{
    visibility: visible;
  }
  #res2{
    visibility: visible;
  }
}
</style>