<script setup lang="ts">
import { RouteName } from '@/router/types';
import { useAuthStore } from '@/stores';
import { Role } from '@/types';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

async function logout() {
  await authStore.logout();
  location.reload();
}
</script>

<template>
  <header class="header">
    <div class="header__wrap">
      <RouterLink v-if="user?.role === Role.Admin" :to="{ name: RouteName.Orders }" class="btn">
        Все заказы
      </RouterLink>
      <h2 v-else>Все заказы</h2>
      <RouterLink v-if="user?.role === Role.Admin" :to="{ name: RouteName.AddOrder }" class="btn">
        Добавить заказ
      </RouterLink>
    </div>
    <div class="header__wrap">
      <span class="header__text">{{ user?.fullName }}</span>
      <a class="btn header__logout" href="#" @click="logout">Выйти</a>
    </div>
  </header>
</template>

<style>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 10%;
  background-color: var(--background);
}

.header__wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
