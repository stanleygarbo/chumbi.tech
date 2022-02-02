import axios from "axios";

const FetchChumbiFilter = () => {
  return (
    axios
      // .get(`https://api-gateway.chumbi.tech/${address}/chumbi`)
      .get(`http://192.168.3.183:5000/chumbi-ranking-filters/`)
      .then((res) => res.data)
  );
};

export default FetchChumbiFilter;
