import axios from "axios";

const FetchCHMBPrice = () => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=chumbai-valley&vs_currencies=php&include_24hr_change=true`
    )
    .then((res) => res.data);
};

export default FetchCHMBPrice;
