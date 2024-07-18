import requests from '../request';
import { PostTargetRequest, PostTargetResponseResult } from './types';

const path = '/api/targetSearch';

export const postTargetList = async (args: PostTargetRequest): Promise<PostTargetResponseResult> => {
  return await requests.post(path, args);
};
