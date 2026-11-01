import { BrowserRouter, Route, Routes } from 'react-router';
import { LoginPage } from '@/pages/login';
import { SessionPage } from '@/pages/session';
import { SignupPage } from '@/pages/signup';

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SessionPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  );
}
