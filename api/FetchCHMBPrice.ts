import axios from "axios";

const FetchCHMBPrice = (fiatCurrency: string) => {
  return axios
    .get(
      `https://api.coingecko.com/api/v3/simple/price?ids=chumbai-valley&vs_currencies=${fiatCurrency}&include_24hr_change=true`
    )
    .then((res) => res.data);
};

export default FetchCHMBPrice;
