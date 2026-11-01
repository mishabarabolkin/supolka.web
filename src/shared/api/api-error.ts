export class ApiError extends Error {
  readonly id: string;
  readonly status: number;

  constructor(id: string, message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.id = id;
    this.status = status;
  }
}
