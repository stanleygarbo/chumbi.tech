import axios from "axios";
import { IFetchChumbiQuery } from "../interfaces/api/IFetchChumbi";

const FetchChumbi = (query: IFetchChumbiQuery) => {
  return axios
    .get(`http://localhost:3000/chumbi/`, { params: query })
    .then((res) => res.data);
};

export default FetchChumbi;
