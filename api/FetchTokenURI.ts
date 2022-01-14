import axios from "axios";

const FetchTokenURI = (id: string) => {
  console.log(id);

  return axios
    .get(`https://cloudflare-ipfs.com/ipfs/${id}`)
    .then((res) => res.data);
};

export default FetchTokenURI;
