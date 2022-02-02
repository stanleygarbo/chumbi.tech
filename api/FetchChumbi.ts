import axios from "axios";
import { IFetchChumbiQuery } from "../interfaces/api/IFetchChumbi";

const FetchChumbi = (query: IFetchChumbiQuery) => {
  return axios
    .get(`http://192.168.3.183:5000/chumbi-ranking/`, { params: query })
    .then((res) => res.data);
};

export default FetchChumbi;
