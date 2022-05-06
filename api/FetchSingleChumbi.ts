import axios from "axios";

const FetchSingleChumbi = (id: number) => {
  return axios
    .get(`http://localhost:3000/chumbi/${id}`)
    .then((res) => res.data);
};

export default FetchSingleChumbi;
