import type { Order, User as FrontendUser } from '../src/types';

interface User extends FrontendUser {
  password: string;
}

interface Data {
  orders: Order[];
  users: User[];
}
