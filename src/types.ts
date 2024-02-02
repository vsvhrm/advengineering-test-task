export const enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

export const enum Status {
  Completed = 'Выполнен',
  New = 'Новый'
}

export interface User {
  id: number;
  login: string;
  fullName: string;
  role: Role;
}

export interface Order {
  id: number;
  fullName: string;
  address: string;
  date: string;
  status: Status;
  comment: string;
}
