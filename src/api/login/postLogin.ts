import requests from '@/api/request';
import { PostLoginRequest, PostLoginResponseResult } from './types';

const loginPath = '/login';

export const postLogin = async (args: PostLoginRequest): Promise<PostLoginResponseResult> => {
  return await requests.post(loginPath, args);
};
