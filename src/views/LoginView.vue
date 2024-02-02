<script setup lang="ts">
import type { LoginErrorResponse } from '@/services/api/types';
import { isEmpty, minLength } from '@/services/validators';
import { useAuthStore } from '@/stores';
import axios from 'axios';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const user = reactive({ login: '', password: '' });
const errors = reactive({ login: '', password: '' });
const validateLoginField = () => {
  errors.login = isEmpty('Логин', user.login);
};
const validatePasswordField = () => {
  errors['password'] = !user.password
    ? isEmpty('Пароль', user.password)
    : minLength('Пароль', user.password, 8);
};
const isSubmitDisabled = computed(
  () => Object.values(errors).some(Boolean) || !Object.values(user).every(Boolean)
);

async function onSubmit() {
  try {
    await authStore.login(user.login, user.password);
    await router.push({ name: 'orders' });
  } catch (error) {
    // Error handling for non-production
    if (axios.isAxiosError<LoginErrorResponse>(error) && error.response) {
      if (error.response.data.message === 'Incorrect login') {
        errors.login = 'Неверный логин';
      } else if (error.response.data.message === 'Incorrect password') {
        errors.password = 'Неверный пароль';
      } else {
        console.error(error);
      }
    } else {
      console.error(error);
    }
  }
}
</script>

<template>
  <main class="main main_center">
    <form novalidate class="auth-form" action="/login" method="post" @submit.prevent="onSubmit">
      <h1 class="main__title">Вход</h1>
      <div class="auth-form__field">
        <label for="login" class="auth-form__label">Логин</label>
        <input
          id="login"
          v-model="user.login"
          class="form-control"
          :class="{ 'form-control_invalid': errors.login }"
          type="text"
          name="login"
          required
          autocapitalize="none"
          autocomplete="username"
          autofocus
          @keyup="validateLoginField"
          @blur="validateLoginField"
        />
        <span v-if="errors.login" class="auth-form__invalid-feedback">
          {{ errors.login }}
        </span>
      </div>
      <div class="auth-form__field">
        <label for="password" class="auth-form__label">Пароль</label>
        <input
          id="password"
          v-model="user.password"
          class="form-control"
          :class="{ 'form-control_invalid': errors.password }"
          type="password"
          name="password"
          required
          autocomplete="current-password"
          @keyup="validatePasswordField"
          @blur="validatePasswordField"
        />
        <span v-if="errors.password" class="auth-form__invalid-feedback">
          {{ errors.password }}
        </span>
      </div>
      <button class="btn auth-form__submit" :disabled="isSubmitDisabled" type="submit">
        Войти в аккаунт
      </button>
    </form>
  </main>
</template>

<style>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 400px;
  padding: 5rem 2.5rem;
  background-color: var(--background);
  border-radius: 0.375rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

.auth-form__label {
  display: block;
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.auth-form__invalid-feedback {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}

.auth-form__submit {
  --btn-color: #ffffff;
  --btn-bg: #238636;
  --btn-border-color: rgba(240, 246, 252, 0.1);
  --btn-hover-bg: #2ea043;
  --btn-hover-border-color: rgba(240, 246, 252, 0.1);
  --btn-active-color: #fff;
  --btn-active-bg: #238636;
  --btn-active-border-color: transparent;
  --btn-disabled-color: rgba(255, 255, 255, 0.5);
  --btn-disabled-bg: rgba(35, 134, 54, 0.6);
  --btn-disabled-border-color: rgba(240, 246, 252, 0.1);
  width: 100%;
  padding: 0.5rem 0.75rem;
}
</style>
