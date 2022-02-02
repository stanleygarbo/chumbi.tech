import axios from "axios";
import { IFetchChumbiQuery } from "../interfaces/api/IFetchChumbi";

const FetchChumbi = (query: IFetchChumbiQuery) => {
  return axios
    .get(`https://api-gateway.chumbi.tech/chumbi-ranking/`, { params: query })
    .then((res) => res.data);
};

export default FetchChumbi;
