import type { User } from '@/types';
import type { NavigationGuard } from 'vue-router';
import { RouteName } from '../types';

export const accessGuard: NavigationGuard = (to) => {
  const { accessRoles } = to.meta;
  if (accessRoles) {
    // TODO: Remove type casting
    const user = JSON.parse(localStorage.getItem('user') ?? 'null') as User | null;
    if (user?.role) {
      if (!accessRoles.includes(user.role)) {
        return false;
      }
    } else {
      return { name: RouteName.Login };
    }
  }
};
