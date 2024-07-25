/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ResponseBase {
  status: string;
  details: any;
  total: number;
}

export interface RequestBase {
  limit?: string;
  offset?: string;
  sortAttr?: string;
  sort?: string;
}

export const STATUS_SUCCESS = 'success';
