import axios from "axios";

const FetchTokenURI = (id: string) => {
  console.log(id);

  return axios.get(`https://ipfs.io/ipfs/${id}`).then((res) => res.data);
};

export default FetchTokenURI;
