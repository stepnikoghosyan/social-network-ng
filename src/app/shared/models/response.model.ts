export interface ResponseModel<T> {
  statusCode: number;
  data: T;
}

export interface PaginationResponseModel<T> {
  statusCode: number;
  data: {
    count: number;
    items: Array<T>;
  };
}

export interface ErrorResponseModel {
  statusCode: number;
  errorMessage: string;
}

export interface FormErrorResponseModel extends ErrorResponseModel {
  field: string;
}
