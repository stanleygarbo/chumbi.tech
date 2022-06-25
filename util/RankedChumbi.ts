import { IFetchSingleChumbi } from "../interfaces/api/IFetchSingleChumbi";
import * as MOCKED_RESPONSE from "../json/chumbi.json";

export function RankedChumbi(): IFetchSingleChumbi[] {
  const stringified = JSON.stringify(MOCKED_RESPONSE);

  const arr: IFetchSingleChumbi[] = JSON.parse(stringified);

  return arr;
}
