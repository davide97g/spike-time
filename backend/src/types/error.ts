export interface ApiError {
  message: string;
  feature: string;
  status: number;
}

export class ApiError extends Error {
  constructor(message: string, feature: string, status: number) {
    super(message);
    this.message = message;
    this.feature = feature;
    this.status = status;
  }
}

export const isApiError = (e: any): e is ApiError => {
  return (e as ApiError).feature !== undefined;
};

export const getApiError = (e: any): ApiError => {
  return e as ApiError;
};

export const createApiError = (
  message: string,
  feature: string,
  status: number
): ApiError => {
  return new ApiError(message, feature, status);
};

export const createApiErrorFromError = (
  e: Error,
  feature: string,
  status: number
): ApiError => {
  return new ApiError(e.message, feature, status);
};
