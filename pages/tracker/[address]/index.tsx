import { useRouter } from "next/router";
import { useEffect } from "react";
import { isWalletAddressValid } from "../../../util/isWalletAddressValid";

const Index = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.address && isWalletAddressValid(router.query.address)) {
      router.push(`/tracker/${router.query.address}/chumbi`);
    }
  }, [router.query, router.push]);

  return null;
};

export default Index;
