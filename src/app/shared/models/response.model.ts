export interface ResponseModel<T> {
  statusCode: number;
  errorMessage: string;
  data: T[];
}
