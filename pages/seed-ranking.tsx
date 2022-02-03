import { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import FetchChumbi from "../api/FetchChumbi";
import ChumbiCards from "../components/chumbi-cards/ChumbiCards";
import Filter from "../components/seed-ranking/Filter";
import { useScreenSize } from "../contexts/screenSizeContext";
import { useTheme } from "../contexts/themeContext";
import { IFetchChumbiQuery } from "../interfaces/api/IFetchChumbi";
import { IColors } from "../interfaces/IColors";
import Modal from "react-modal";
import { CgClose } from "react-icons/cg";

const SeedRankingPage: NextPage = () => {
  const [query, setQuery] = useState<IFetchChumbiQuery>({
    page: 1,
    filter: [],
  });
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { colors } = useTheme();

  const ChumbiQuery = useQuery(["Chumbi", query], () => FetchChumbi(query), {
    staleTime: Infinity,
  });

  const { screenWidth } = useScreenSize();

  return (
    <Container className="hero" colors={colors}>
      {screenWidth > 867 ? (
        <Filter query={query} setQuery={setQuery} />
      ) : (
        <>
          <button
            className={`filter-show ${isFilterOpen && "filter-show--close"}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? <CgClose /> : "Filters"}
          </button>
          <Modal
            isOpen={isFilterOpen}
            closeTimeoutMS={200}
            onRequestClose={() => setIsFilterOpen(false)}
            ariaHideApp={false}
          >
            <Filter query={query} setQuery={setQuery} />
          </Modal>
        </>
      )}
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
    justify-content: center;

    .chumbi-cards {
      z-index: 1;
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

    .filter-show {
      position: fixed;
      bottom: 20px;
      width: 90%;
      height: 45px;
      border-radius: 100px;
      border: none;

      font-size: 16px;
      font-weight: 600;

      z-index: 210;

      background: ${colors.accent};
      color: #fff;
      transition: width 0.3s;

      display: flex;
      justify-content: center;
      align-items: center;

      &--close {
        background: ${colors.danger};
        width: 45px;
        font-size: 25px;
      }
    }
  `}
`;

export default SeedRankingPage;
