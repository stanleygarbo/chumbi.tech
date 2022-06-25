import axios from "axios";
import { filter } from "lodash";
import cache from "memory-cache";
import { NextApiRequest, NextApiResponse } from "next";
import { IMoralisResponseResult } from "../../../interfaces/IMoralisResp";
import { RankedChumbi } from "../../../util/RankedChumbi";

export default async function getChumbiOfAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address } = req.query;

    const cacheKey = `CHUMBI_${address}`;
    const c = cache.get(cacheKey);

    if (c) {
      res.status(200).json(c);
    } else {
      const resp = await axios.get(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=polygon&format=decimal&limit=60&token_addresses=0x5492Ef6aEebA1A3896357359eF039a8B11621b45
`,
        {
          headers: {
            "X-API-Key":
              "GUbp8LAQ9Np57YI5GKxXshB2AbXQzMEGGdUBwwr8FyjlvcZKlJGILgZCgEDGMACn",
          },
        }
      );

      const ids: string[] = [];

      resp.data.result?.map((i: IMoralisResponseResult) => {
        ids.push(i.token_id);
      });

      const rankedChumbi = RankedChumbi();

      const chumbi = filter(rankedChumbi, (o) => {
        if (o.id) return ids.includes(o.id);
      });

      cache.put(cacheKey, chumbi, 1 * 1000 * 60 * 60);

      res.status(200).json(chumbi);
    }
  } catch (err) {
    res.status(400).send(err);
  }
}
