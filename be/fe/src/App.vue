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
