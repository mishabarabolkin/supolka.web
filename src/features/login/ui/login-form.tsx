import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { currentUserQueryKey, loginUser } from '@/entities/user';
import { ApiError } from '@/shared/api';
import { writeToken } from '@/shared/session';

export function LoginForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setPending(true);

    try {
      const token = await loginUser({ login_id: loginId, password });
      queryClient.removeQueries({ queryKey: currentUserQueryKey });
      writeToken(token);
      navigate('/');
    } catch (error) {
      if (error instanceof ApiError) {
        setErrorMessage(error.message);
        setPending(false);
        return;
      }
      setPending(false);
      throw error;
    }
  }

  return (
    <main className="auth-screen">
      <h1>Вход</h1>
      <form onSubmit={onSubmit}>
        <label>
          login_id
          <input
            name="login_id"
            value={loginId}
            onChange={(event) => setLoginId(event.target.value)}
            autoComplete="username"
          />
        </label>
        <label>
          Пароль
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
        <button type="submit" disabled={pending}>
          Войти
        </button>
      </form>
      <p>
        <Link to="/signup">Регистрация</Link>
      </p>
    </main>
  );
}
