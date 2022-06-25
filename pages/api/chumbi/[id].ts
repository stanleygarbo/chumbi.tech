import { find } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import { IFetchSingleChumbi } from "../../../interfaces/api/IFetchSingleChumbi";
import { RankedChumbi } from "../../../util/RankedChumbi";
import cache from "memory-cache";

export default function getSingle(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  const { id } = req.query;

  const cacheKey = `SINGLE_CHUMBI_${id}`;
  const c = cache.get(cacheKey);

  if (c) {
    res.status(200).json(c);
  } else {
    if (id) {
      const arr: IFetchSingleChumbi[] = RankedChumbi();
      const chumbi = find<IFetchSingleChumbi>(arr, {
        id: id.toString(),
      });

      cache.put(cacheKey, chumbi, 1 * 1000 * 60 * 60);

      res.status(200).json(chumbi);
    } else {
      res.json({});
    }
  }
}
