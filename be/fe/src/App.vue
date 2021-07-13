<template>
  <v-app>
   <div id="header">
      <main-header/>
    </div>

    <v-main>
      <router-view class="pa-0 ma-0"/>
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
         <v-icon>mdi-close</v-icon>
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
<style scoped>
@font-face {
    font-family: 'f1';
    src: url('./assets/NEXON Lv1 Gothic Low OTF Bold.otf');
}
* {
    box-sizing: border-box;
    font-family: 'f1';
    letter-spacing: 1.5px;
} 
</style>