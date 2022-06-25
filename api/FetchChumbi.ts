import axios from "axios";
import { IFetchChumbiQuery } from "../interfaces/api/IFetchChumbi";
import QueryString from "qs";

const FetchChumbi = (query: IFetchChumbiQuery) => {
  const str = QueryString.stringify(query, {
    encode: false,
  });

  return axios
    .get(`/api/chumbi?${str}`)
    .then((res) => res.data);
};

export default FetchChumbi;
