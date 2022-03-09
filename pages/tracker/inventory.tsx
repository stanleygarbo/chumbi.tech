import { NextPage } from "next";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import FetchFoundersCollection from "../../api/FetchFoundersCollection";

const inventory: NextPage = () => {
  const router = useRouter();

  console.log(router.query);

  // const { data } = useQuery("FoundersCollection", ()=>FetchFoundersCollection(''));

  return <div>inventory</div>;
};

export default inventory;
