import { RequestBase, ResponseBase } from '../BaseType';

export interface PostTargetRequest extends RequestBase {
  name: string;
  age?: string;
  gender?: string;
  address?: string;
  tags?: string[];
}

export interface PostTargetResponseResult extends ResponseBase {
  details: TagetListDto[];
}

export interface TagetListDto {
  useId: string;
  name: string;
  age?: string;
  gender?: string;
  address?: string;
  tags?: string[];
}
