import { IUser } from './User';
import { ICategory } from './Category';
export interface IPosts {
  _id?: string;
  title: string;
  author: IUser;
  content: string;
  images: any[];
  likes: number | string;
  tags: any[];
  category: ICategory;
  comments: any[];
  is_active: boolean;
  status: string;
  deleted: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface IDocPosts {
  message: string;
  posts: IDocs;
}

interface IDocs {
  docs: IPosts[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: null | number;
  nextPage?: null | number;
}


