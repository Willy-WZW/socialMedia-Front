<script>
export default {
  data (){
    return{

    }
  },
  methods:{
    temporaryBTN(){
      this.$router.push("./socialPage")
    },
  }
}
</script>

<template>
  {{ "這邊做登入頁面" }}
  <button @click="temporaryBTN()">社群頁面</button>
</template>

<style scoped lang="scss"></style>