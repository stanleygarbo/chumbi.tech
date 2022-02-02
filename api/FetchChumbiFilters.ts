import axios from "axios";

const FetchChumbiFilter = () => {
  return (
    axios
      // .get(`https://api-gateway.chumbi.tech/${address}/chumbi`)
      .get(`https://api-gateway.chumbi.tech/chumbi-ranking-filters/`)
      .then((res) => res.data)
  );
};

export default FetchChumbiFilter;
