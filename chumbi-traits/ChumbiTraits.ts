import ChumbiTraitsJSON from "./ChumbiTraits.json";
export type ChumbiTraitsObj = {
  [key: string]: { [key: string]: number | string };
};

export function ChumbiTraits() {
  const traitsJSON: ChumbiTraitsObj = ChumbiTraitsJSON;

  // const newObj: Obj = {};

  // for (let key in traitsJSON) {
  //   if (traitsJSON.hasOwnProperty(key)) {
  //     newObj[
  //       key.replace(" ", "").charAt(0).toLowerCase() +
  //         key.replace(" ", "").slice(1)
  //     ] = traitsJSON[key];

  //     newObj[
  //       key.replace(" ", "").charAt(0).toLowerCase() +
  //         key.replace(" ", "").slice(1)
  //     ]["name"] = key;
  //   }
  // }

  // console.log(JSON.stringify(newObj));

  return traitsJSON;
}
