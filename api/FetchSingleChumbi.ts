import axios from "axios";

const FetchSingleChumbi = (id: number) => {
  return axios
    .get(`/api/chumbi/${id}`)
    .then((res) => res.data);
};

export default FetchSingleChumbi;
