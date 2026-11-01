import { http } from '@/shared/api';
import type { SystemPing } from '../model/types';

export function getSystemPing(): Promise<SystemPing> {
  return http<SystemPing>('/system/ping');
}
