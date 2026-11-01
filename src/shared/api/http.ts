export async function http<T>(path: string): Promise<T> {
  const response = await fetch(`/api/v4${path}`);

  if (!response.ok) {
    throw new Error(`GET /api/v4${path} failed with ${response.status}`);
  }

  return (await response.json()) as T;
}
