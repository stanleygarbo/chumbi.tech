import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import FetchFoundersCollection from "../../../api/FetchFoundersCollection";
import ErrorMessage from "../../../components/ErrorMessage";
import Inventory from "../../../components/tracker/Inventory";
import { useTheme } from "../../../contexts/themeContext";
import { useWallet } from "../../../contexts/walletContext";
import { IFoundersCollectionNFT } from "../../../interfaces/api/IFetchFoundersCollection";
import { IColors } from "../../../interfaces/IColors";
import { isWalletAddressValid } from "../../../util/isWalletAddressValid";

const InventoryPage: NextPage = () => {
  const router = useRouter();
  const { address } = router.query;
  const { colors } = useTheme();
  const { setCurrent } = useWallet();

  const { data, isFetching } = useQuery<any, unknown, IFoundersCollectionNFT[]>(
    "FoundersCollection",
    () => (address ? FetchFoundersCollection(address.toString()) : null),
    {
      staleTime: Infinity,
      enabled: !!(address && isWalletAddressValid(address)),
    }
  );

  useEffect(() => {
    if (address && isWalletAddressValid(address))
      setCurrent(address.toString());
  }, [address,setCurrent]);

  if (address && isWalletAddressValid(address))
    return (
      <Container className="tracker" colors={colors}>
        <div className="content">
          <h2>
            Items:{" "}
            {isFetching ? (
              <img src="/dots-loader.svg" width={17} alt="" />
            ) : (
              data?.length
            )}
          </h2>

          {data && <Inventory data={data} />}
        </div>
      </Container>
    );

  return <ErrorMessage message="Invalid Wallet Address" status={404} />;
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .content {
      margin: 0 auto;
      max-width: 1140px;
      padding: 20px;

      h2 {
        color: ${colors.text2};
      }
    }
  `}
`;

export default InventoryPage;
