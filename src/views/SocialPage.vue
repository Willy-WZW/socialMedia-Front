<script>
export default {
  data(){
    return {

    }
  },
  methods:{
    back(){
      this.$router.back()
    }
  },
}
</script>

<template>
  {{ "這邊是社交媒體的主頁面" }}
  <button @click="back()">上一頁</button>
</template>

<style scoped lang="scss">

</style>
