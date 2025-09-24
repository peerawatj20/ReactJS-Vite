import type { ApiErrorCodeType } from '../constants/api.constants';

export interface ApiError {
  code: ApiErrorCodeType;
  message: string;
}
