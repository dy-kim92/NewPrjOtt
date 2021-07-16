<template>
  <div>{{data}}</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      data:[],
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/token')
      .then((r) => {
        this.data=r.data
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
  }
}
</script>