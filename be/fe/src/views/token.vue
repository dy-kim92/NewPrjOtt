<template>
  <div>토큰체크페이지입니다</div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
    }
  },
  mounted () {
    axios.get('http://localhost:3000/api/token')
      .then((r) => {
        console.log(r)
      })
      .catch((e) => {
        console.error(e.message)
      })
  }
}
</script>