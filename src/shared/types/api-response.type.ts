export interface ApiResponse<T = unknown> {
  data: T;
  message: string;
  result: boolean;
}

export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  result: false;
}
