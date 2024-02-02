import type { AxiosInstance } from 'axios';
import type { LoginResponse } from './types';

export default (instance: AxiosInstance) => ({
  login(login: string, password: string) {
    return instance.post<LoginResponse>('login', { login, password });
  },
  logout() {
    return instance.delete<void>('logout');
  }
});
