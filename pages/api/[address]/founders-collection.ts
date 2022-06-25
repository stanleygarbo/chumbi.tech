import PromisePool from "@supercharge/promise-pool/dist";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import cache from "memory-cache";

export default async function getFoundersCollectionOfAccount(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { address } = req.query;
    const cacheKey = `FOUNDERS_COLLECTION_${address}`;
    const c = cache.get(cacheKey);

    if (c) {
      res.status(200).json(c);
    } else {
      const resp = await axios.get(
        `https://deep-index.moralis.io/api/v2/${address}/nft?chain=polygon&format=decimal&limit=60&token_addresses=0x68df8633f15699f9d44048e97067aa37a71e245a
`,
        {
          headers: {
            "X-API-Key":
              "GUbp8LAQ9Np57YI5GKxXshB2AbXQzMEGGdUBwwr8FyjlvcZKlJGILgZCgEDGMACn",
          },
        }
      );

      let data = resp.data.result;
      data = data.filter(
        (item: any) =>
          item.token_id !== "6" &&
          item.token_id !== "7" &&
          item.token_id !== "8" &&
          item.token_id !== "10"
      );

      const { results } = await PromisePool.for(data)
        .withConcurrency(100)
        .process(async (item: any) => {
          let tokenURI = item.token_uri;

          const response = await axios.get(tokenURI);

          response.data.image = response.data.image.includes("ipfs://")
            ? "https://ipfs.moralis.io:2053/ipfs/" +
              response.data.image.replace("ipfs://", "")
            : response.data.image;

          delete item.metadata;

          return { ...item, ...response.data };
        });

      data = results;
      cache.put(cacheKey, data, 1 * 1000 * 60 * 60);
      res.status(200).json(data);
    }
  } catch (err: any) {
    console.log(err.message);
    res.status(400).send(err);
  }
}
