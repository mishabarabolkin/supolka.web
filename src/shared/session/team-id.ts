import { useSyncExternalStore } from 'react';

const TEAM_ID_KEY = 'supolka.team_id';

const listeners = new Set<() => void>();

function emit(): void {
  for (const listener of listeners) {
    listener();
  }
}

export function readTeamId(): string | null {
  return localStorage.getItem(TEAM_ID_KEY);
}

export function writeTeamId(teamId: string): void {
  localStorage.setItem(TEAM_ID_KEY, teamId);
  emit();
}

export function clearTeamId(): void {
  localStorage.removeItem(TEAM_ID_KEY);
  emit();
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useTeamId(): string | null {
  return useSyncExternalStore(subscribe, readTeamId, () => null);
}
