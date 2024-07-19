import requests from '../request';
import { GetTagListResponse } from './type';

const path = '/api/tags';

export const getTagList = async (): Promise<GetTagListResponse> => {
  return await requests.get(path);
};
