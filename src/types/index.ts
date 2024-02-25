export type ErrorResponse<
  T = Record<string, unknown> | Record<string, unknown>[]
> = {
  data: T;
  message: string;
  statusCode: number | string;
  success: boolean;
};

export interface SuccessResponse<
  T = Record<string, unknown> | Record<string, unknown>[]
> {
  total: number;
  skip: number;
  limit: number;
  products: T;
}
