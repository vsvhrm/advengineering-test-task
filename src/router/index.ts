import { Role } from '@/types';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import OrdersView from '../views/OrdersView.vue';
import { accessGuard } from './middleware/accessGuard';
import { authGuard } from './middleware/authGuard';
import { RouteName } from './types';

const routes: Readonly<RouteRecordRaw[]> = [
  {
    path: '/',
    name: RouteName.Orders,
    component: OrdersView,
    meta: { title: 'Все заказы' }
  },
  {
    path: '/add-order',
    name: RouteName.AddOrder,
    component: () => import('../views/OrderAddView.vue'),
    meta: { title: 'Добавить заказ', accessRoles: [Role.Admin] }
  },
  {
    path: '/login',
    name: RouteName.Login,
    component: () => import('../views/LoginView.vue'),
    meta: { title: 'Авторизация' }
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'btn_active',
  linkExactActiveClass: '',
  routes
});

router.beforeEach(authGuard);
router.beforeEach(accessGuard);

export default router;
