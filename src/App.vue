<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <RouterView />
</template>

<style>
.main {
  padding: 1.5rem 0.75rem;
}

@media (min-width: 1400px) {
  .main {
    padding: 1.5rem 3.5rem;
  }
}

.main__title {
  font-size: 1.75rem;
  text-align: center;
}

.main_center {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
</style>
