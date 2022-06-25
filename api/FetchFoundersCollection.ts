import axios from "axios";

const FetchFoundersCollection = (address: string) => {
  return (
    axios
      // .get(`https://api-gateway.chumbi.tech/${address}/chumbi`)
      .get(`/api/${address}/founders-collection`)
      .then((res) => res.data)
  );
};

export default FetchFoundersCollection;
