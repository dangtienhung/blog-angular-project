export interface ICategory {
  _id?: string;
  name: string;
  slug?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface IDocCategories {
  data: ICategory[];
  message: string;
}
