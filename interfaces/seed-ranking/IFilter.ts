import { Dispatch, SetStateAction } from "react";
import { IFetchChumbiQuery } from "../api/IFetchChumbi";

export interface IFilter {
  setQuery: Dispatch<SetStateAction<IFetchChumbiQuery>>;
  query: IFetchChumbiQuery;
  data: { [key: string]: number }[] | undefined;
  setFilters: Dispatch<SetStateAction<filterObj[] | undefined>>;
  filters: filterObj[] | undefined;
  setQueryString: Dispatch<SetStateAction<string>>;
  queryString: string;
}

export interface filterObj {
  name: string;
  isOpened: boolean;
  properties: { [key: string]: number };
  checkedProperties: string[];
  checked: number;
  txtFilter: string;
}
