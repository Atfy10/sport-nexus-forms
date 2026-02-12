export type ApiResult<T> = {
  data: T | null;
  isSuccess: boolean;
  operationType: string;
  message: string;
  statusCode: number;
};
