import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import FetchChumbi from "../api/FetchChumbi";
import ChumbiCards from "../components/chumbi-cards/ChumbiCards";
import Filter from "../components/seed-ranking/Filter";
import { useTheme } from "../contexts/themeContext";
import { IFetchChumbiQuery } from "../interfaces/api/IFetchChumbi";
import { IColors } from "../interfaces/IColors";

const SeedRankingPage: NextPage = () => {
  const [query, setQuery] = useState<IFetchChumbiQuery>({
    page: 1,
    filter: [],
  });
  const { colors } = useTheme();

  const ChumbiQuery = useQuery(["Chumbi", query], () => FetchChumbi(query), {
    staleTime: Infinity,
  });

  return (
    <Container className="hero" colors={colors}>
      <Filter query={query} setQuery={setQuery} />
      <div className="chumbi-cards">
        {ChumbiQuery.isLoading && (
          <Image src="/dots-loader.svg" width={30} height={30} alt="" />
        )}
        {ChumbiQuery.data && (
          <ChumbiCards
            linkTo="/seed-ranking?id="
            linkAs="/finder/"
            data={ChumbiQuery.data.chumbi}
          />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    display: flex;

    .chumbi-cards {
      flex: 1;
      padding: 20px;
      height: calc(100vh - 70px);
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      }

      &::-webkit-scrollbar-thumb {
        background-color: ${colors.bg2};
      }
    }
  `}
`;

export default SeedRankingPage;
