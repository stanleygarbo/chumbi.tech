import { Dispatch, SetStateAction } from "react";
import { IFetchChumbiQuery } from "../../api/IFetchChumbi";

export interface IFilter {
  setQuery: Dispatch<SetStateAction<IFetchChumbiQuery>>;
  query: IFetchChumbiQuery;
}
