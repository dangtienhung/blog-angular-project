import { ICategory } from './Category';
import { IUser } from './User';

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
  createdAt: string;
  updatedAt: string;
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


