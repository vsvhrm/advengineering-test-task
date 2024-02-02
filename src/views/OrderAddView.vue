<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import { RouteName } from '@/router/types';
import { useOrderStore } from '@/stores';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const orderStore = useOrderStore();
const fullName = ref('');
const address = ref('');
const comment = ref('');

async function addOrder() {
  await orderStore.addOrder(fullName.value, address.value, comment.value);
  await router.push({ name: RouteName.Orders });
}
</script>

<template>
  <TheHeader />
  <main class="main">
    <form class="add-order" @submit.prevent="addOrder">
      <h1 class="main__title">Добавить заказ</h1>
      <input
        v-model.trim="fullName"
        required
        class="form-control"
        type="text"
        placeholder="Имя и фамилия"
      />
      <input v-model.trim="address" required class="form-control" type="text" placeholder="Адрес" />
      <input v-model.trim="comment" class="form-control" type="text" placeholder="Комментарий" />
      <button class="btn" type="submit">Добавить заказ</button>
    </form>
  </main>
</template>

<style>
.add-order {
  padding: 2rem 1.5rem;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  background-color: var(--background);
  border-radius: 0.375rem;
}
</style>
