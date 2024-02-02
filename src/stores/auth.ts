import { authAPI, instance } from '@/services/api';
import type { User } from '@/types';
import { acceptHMRUpdate, defineStore } from 'pinia';
// import { useLocalStorage } from '@vueuse/core' 😢

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    // TODO: Remove type casting
    user: JSON.parse(localStorage.getItem('user') ?? 'null') as User | null
  }),
  actions: {
    async login(login: string, password: string) {
      const {
        data: { accessToken, user }
      } = await authAPI.login(login, password);
      this.accessToken = accessToken;
      this.user = user;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('user', JSON.stringify(user));
      instance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    },
    async logout() {
      await authAPI.logout();
      this.accessToken = null;
      this.user = null;
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      delete instance.defaults.headers.common.Authorization;
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
