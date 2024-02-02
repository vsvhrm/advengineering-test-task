import { orderAPI } from '@/services/api';
import { Status, type Order } from '@/types';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { ref } from 'vue';

export const useOrderStore = defineStore('order', () => {
  const orders = ref<Order[]>([]);
  const isLoading = ref(true);

  const addOrder = async (fullName: string, address: string, comment: string) => {
    const date = new Date()
      .toLocaleDateString('ru', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
      .replace(' г.', '');
    const status = Status.New;
    const { data: order } = await orderAPI.create(fullName, address, date, status, comment);
    orders.value.push(order);
  };

  const removeOrder = async (id: number) => {
    await orderAPI.delete(id);
    orders.value = orders.value.filter((order) => order.id !== id);
  };

  const toggleCompleted = async (id: number) => {
    const { data: newOrder } = await orderAPI.update(id, { status: Status.Completed });
    orders.value = orders.value.map((order) => (order.id === id ? newOrder : order));
  };

  const fetchAll = async () => {
    const { data } = await orderAPI.getAll();
    orders.value = data;
    isLoading.value = false;
  };

  return { orders, isLoading, addOrder, removeOrder, toggleCompleted, fetchAll };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useOrderStore, import.meta.hot));
}
