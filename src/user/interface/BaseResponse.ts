export interface BaseResponse<T> {
  error: boolean;
  data: T;
  message: string;
}
