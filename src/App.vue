<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="appArea">
    <RouterView />
  </div>
  <div class="background"></div>
</template>

<style scoped>
.appArea {
  width: 100%;
  min-height: 100dvh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.background {
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  background-color: rgb(192, 192, 192, 0.7);
}
</style>
