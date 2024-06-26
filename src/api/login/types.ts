import { ResponseBase } from '../BaseType';

export interface PostLoginRequest {
  username: string;
  password: string;
}

export interface PostLoginResponseResult extends ResponseBase {
  details: LoginDto;
}

export interface LoginDto {
  username: string;
  role?: string;
  token?: string;
}
