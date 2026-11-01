import { useState, type FormEvent } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router';
import { teamQueryRoot } from '@/entities/team';
import { currentUserQueryKey, loginUser, registerUser } from '@/entities/user';
import { apiErrorMiddleware, runMiddlewares } from '@/shared/api';
import { writeToken } from '@/shared/session';

export function RegisterForm() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setPending(true);

    await runMiddlewares(null, [
      apiErrorMiddleware(setErrorMessage, setPending),
      async () => {
        await registerUser({ email, username, password });
        const token = await loginUser({ login_id: username, password });
        queryClient.removeQueries({ queryKey: currentUserQueryKey });
        queryClient.removeQueries({ queryKey: teamQueryRoot });
        writeToken(token);
        navigate('/');
      },
    ]);
  }

  return (
    <main className="auth-screen">
      <h1>Регистрация</h1>
      <form onSubmit={onSubmit}>
        <label>
          email
          <input
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </label>
        <label>
          username
          <input
            name="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
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
            autoComplete="new-password"
          />
        </label>
        {errorMessage ? <p className="auth-error">{errorMessage}</p> : null}
        <button type="submit" disabled={pending}>
          Зарегистрироваться
        </button>
      </form>
      <p>
        <Link to="/login">Вход</Link>
      </p>
    </main>
  );
}
