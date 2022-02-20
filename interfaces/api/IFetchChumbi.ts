export interface IFetchChumbiQuery {
  page?: number;
  filter: {
    name: string;
    value: string[];
  }[];
  limit?: number;
}
