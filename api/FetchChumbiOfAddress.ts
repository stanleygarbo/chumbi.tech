import axios from "axios";

const FetchChumbiOfAddress = (address: string) => {
  return (
    axios
      // .get(`https://api-gateway.chumbi.tech/${address}/chumbi`)
      .get(`/api/${address}/chumbi`)
      .then((res) => res.data)
  );
};

export default FetchChumbiOfAddress;
