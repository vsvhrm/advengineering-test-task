<script setup lang="ts">
import AppSkeleton from '@/components/AppSkeleton.vue';
import TheHeader from '@/components/TheHeader.vue';
import { useAuthStore, useOrderStore } from '@/stores';
import { Role, Status } from '@/types';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const orderStore = useOrderStore();
const { orders, isLoading } = storeToRefs(orderStore);
const { removeOrder, toggleCompleted, fetchAll } = orderStore;

fetchAll();

const headers = [
  { label: '№', canSorted: false },
  { label: 'Имя клиента', canSorted: false },
  { label: 'Адрес', canSorted: true },
  { label: 'Дата заказа', canSorted: true },
  { label: 'Статус', canSorted: false },
  { label: 'Комментарий', canSorted: false },
  ...(user.value?.role === Role.Admin ? [{ label: 'Действия', canSorted: false }] : [])
];

async function remove(id: number) {
  // TODO: Modal component
  if (window.confirm('Вы уверены, что хотите удалить заказ?')) {
    await removeOrder(id);
  }
}
</script>

<template>
  <TheHeader />
  <main class="main">
    <div class="table">
      <h1 class="main__title">Заказы</h1>
      <table class="table__table">
        <thead class="table__header">
          <tr class="table__row table__row_header">
            <td
              v-for="header in headers"
              :key="header.label"
              class="table__cell table__cell_header"
            >
              {{ header.label }}
            </td>
          </tr>
        </thead>
        <tbody class="table__body">
          <template v-if="!isLoading">
            <tr
              v-for="(order, index) in orders"
              :key="order.id"
              class="table__row"
              :class="{
                table__row_completed: order.status === Status.Completed,
                table__row_striped: index % 2 === 0
              }"
            >
              <td class="table__cell">{{ order.id }}</td>
              <td class="table__cell">{{ order.fullName }}</td>
              <td class="table__cell">{{ order.address }}</td>
              <td class="table__cell">{{ order.date }}</td>
              <td class="table__cell">{{ order.status }}</td>
              <td class="table__cell">{{ order.comment }}</td>
              <td v-if="user?.role === Role.Admin" class="table__cell">
                <div class="table__actions">
                  <button
                    v-if="order.status === Status.New"
                    class="btn table__action"
                    title="Изменить статус"
                    type="button"
                    @click="toggleCompleted(order.id)"
                  >
                    ✅
                  </button>
                  <button
                    class="btn table__action"
                    title="Удалить заказ"
                    type="button"
                    @click="remove(order.id)"
                  >
                    ❌
                  </button>
                </div>
              </td>
            </tr>
          </template>
          <tr v-for="rowIdx in 10" v-else :key="rowIdx">
            <td v-for="cellIdx in headers.length" :key="cellIdx" class="table__cell">
              <AppSkeleton />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </main>
</template>

<style>
.table {
  padding: 0.75rem 1.5rem;
  background-color: var(--background);
  border-radius: 0.375rem;
}

.table__table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

.table__body {
  font-size: 0.875rem;
  border-top: 1px solid #c1c1c1;
}

.table__cell {
  padding: 0.5rem 0.5rem;
}

.table__row_striped {
  background-color: var(--background-alt);
}

.table__row_completed {
  color: #696969;
}

.table__actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.table__action {
  width: 25px;
  height: 25px;
  padding: 0;
}

@media (prefers-color-scheme: light) {
  .table__action {
    --btn-color: #000;
    --btn-bg: #f8f9fa;
    --btn-border-color: #f8f9fa;
    --btn-hover-color: #fff;
    --btn-hover-bg: #d3d4d5;
    --btn-hover-border-color: #c6c7c8;
    --btn-active-color: #fff;
    --btn-active-bg: #c6c7c8;
    --btn-active-border-color: #babbbc;
    --btn-disabled-color: #000;
    --btn-disabled-bg: #f8f9fa;
    --btn-disabled-border-color: #f8f9fa;
  }
}
</style>
