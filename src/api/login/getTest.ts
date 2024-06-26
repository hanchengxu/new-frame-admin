import requests from '@/api/request';
import { ResponseBase } from '../BaseType';

const testPath = '/test';

export const getTest = async (): Promise<ResponseBase> => {
  return await requests.get(testPath);
};
