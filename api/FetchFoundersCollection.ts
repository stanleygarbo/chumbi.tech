import axios from "axios";

const FetchFoundersCollection = (address: string) => {
  return (
    axios
      // .get(`https://api-gateway.chumbi.tech/${address}/chumbi`)
      .get(`https://api-gateway.chumbi.tech/${address}/founders-collection`)
      .then((res) => res.data)
  );
};

export default FetchFoundersCollection;
