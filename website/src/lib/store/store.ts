// src/lib/authStore.ts
import { writable } from 'svelte/store';

// Create a writable store with an initial value of `false`
export const isLoggedIn = writable<boolean>(false);

// Optional: You can also create functions to set and toggle the state
export function logIn() {
  isLoggedIn.set(true);
}

export function logOut() {
  isLoggedIn.set(false);
}

export function toggleLogin() {
  isLoggedIn.update(value => !value);
}
