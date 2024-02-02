import type { User } from '@/types';

export interface LoginResponse {
  accessToken: string;
  user: User;
}

export interface LoginErrorResponse {
  status: number;
  message: 'Incorrect login';
}
