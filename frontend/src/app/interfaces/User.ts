export interface IUser {
  _id?: string;
  username: string;
  password: string;
  email: string;
  role: string;
  is_active: boolean;
  // created_at: Date;
  // updated_at: Date;
  isVerified: boolean;
  postList: any[];
  address?: string;
  avatar?: string;
  phone?: string;
}

export interface IUserDocs {
  docs: IUser[];
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

export interface ILogin {
  email: string;
  password: string;
}

export interface IUserResponse {
  user: IUser;
  accessToken: string;
  message?: string;
}
