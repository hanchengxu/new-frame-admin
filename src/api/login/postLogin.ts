import requests from '@/api/request';
import { PostLoginRequest, PostLoginResponseResult } from './types';

const loginPath = '/api/login';

export const postLogin = async (args: PostLoginRequest): Promise<PostLoginResponseResult> => {
  return await requests.post(loginPath, args);
};
