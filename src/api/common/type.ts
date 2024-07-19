import { ResponseBase } from '../BaseType';

export interface GetTagListRequest {}

export interface GetTagListResponse extends ResponseBase {
  details: TagListDto[];
}

export interface TagListDto {
  label: string;
  value: number;
}
