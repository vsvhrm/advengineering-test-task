import type { Order, Status } from '@/types';
import type { AxiosInstance } from 'axios';

export default (instance: AxiosInstance) => ({
  get(id: number) {
    return instance.get<Order>(`orders/${id}`);
  },
  getAll() {
    return instance.get<Order[]>('orders');
  },
  create(fullName: string, address: string, date: string, status: Status, comment: string) {
    return instance.post<Order>('orders', { fullName, address, date, status, comment });
  },
  update(id: number, content: Partial<Omit<Order, 'id'>>) {
    return instance.patch<Order>(`orders/${id}`, content);
  },
  delete(id: number) {
    return instance.delete<void>(`orders/${id}`);
  }
});
