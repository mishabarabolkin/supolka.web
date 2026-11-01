import { useSyncExternalStore } from 'react';

const TOKEN_KEY = 'supolka.token';

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function readToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function writeToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  emit();
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useToken(): string | null {
  return useSyncExternalStore(subscribe, readToken, () => null);
}
