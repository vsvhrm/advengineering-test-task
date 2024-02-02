import type { Role } from '@/types';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    accessRoles?: Role[];
  }
}

export const enum RouteName {
  Orders = 'orders',
  AddOrder = 'add-order',
  Login = 'login'
}
