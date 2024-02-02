import auth from './auth';
import instance from './instance';
import order from './order';

export { instance };

export const authAPI = auth(instance);

export const orderAPI = order(instance);
