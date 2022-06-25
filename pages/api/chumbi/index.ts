import { orderBy } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";
import qs from "qs";
import { IFetchSingleChumbi } from "../../../interfaces/api/IFetchSingleChumbi";
import { RankedChumbi } from "../../../util/RankedChumbi";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function getAll(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  let limit = req.query.limit ? Number(req.query.limit) : 20;
  let page = req.query.page ? Number(req.query.page) : 1;
  const unParsedQueryString = req.url?.split("?").reverse()[0];
  let parsedQueryString = unParsedQueryString
    ? qs.parse(unParsedQueryString)
    : null;
  const filters = parsedQueryString?.filter;

  const arr: IFetchSingleChumbi[] = RankedChumbi();
  let filteredArr: IFetchSingleChumbi[] = [];
  if (Array.isArray(filters)) {
    for (let i = 1; i <= arr.length; i++) {
      let matches = 0;
      for (const filter of filters) {
        const parsedFilter: {
          name: keyof IFetchSingleChumbi;
          value: string[];
        } = JSON.parse(JSON.stringify(filter));
        try {
          const prop: string | undefined =
            arr[i][parsedFilter.name]?.toString();
          if (prop) {
            if (parsedFilter.value.includes(prop)) {
              matches++;
            }
          }
        } catch (err) {
          console.error(err);
        }
      }
      if (matches === filters.length) {
        filteredArr.push(arr[i]);
      }
    }
  } else {
    filteredArr = arr;
  }

  const chumbi = orderBy(filteredArr, ["rank"], ["asc"]);

  const count = filteredArr.length;

  const start = (page - 1) * limit;
  const end = (page - 1) * limit + Number(limit);
  const limited = chumbi.slice(start, end);

  const resp = {
    chumbi: limited,
    maxPage: Math.ceil(count / limit),
    nextPage: Number(page) + 1,
    count,
  };

  res.send(resp);
}
