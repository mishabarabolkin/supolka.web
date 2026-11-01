import { PingPage } from '@/pages/ping';
import { AppProviders } from './providers';

export function App() {
  return (
    <AppProviders>
      <PingPage />
    </AppProviders>
  );
}
