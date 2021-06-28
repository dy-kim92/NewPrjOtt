<template>
  <v-app>

   <div id="header">
      <main-header/>
    </div>

    <v-main>
      <router-view/>
    </v-main>

    <div id="footer">
      <main-footer/>
    </div>
   <v-snackbar
       v-model="$store.state.sb.act"
       :color="$store.state.sb.color"
     >
       {{ $store.state.sb.msg }}
       <v-btn
         @click="$store.commit('pop', { act: false })"
       >
         닫기
       </v-btn>
     </v-snackbar>
  </v-app>
</template>

<script>
import MainHeader from './components/header.vue'
import MainFooter from './components/footer.vue'
 
export default {
  name: 'App',

  components  : {
    'main-header': MainHeader,
    'main-footer': MainFooter
  },

  data: () => ({
    //
  })
}
</script>
