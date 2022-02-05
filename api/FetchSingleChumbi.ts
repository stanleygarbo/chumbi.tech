import axios from "axios";

const FetchSingleChumbi = (id: number) => {
  return axios
    .get(`https://api-gateway.chumbi.tech/chumbi/${id}`)
    .then((res) => res.data);
};

export default FetchSingleChumbi;
