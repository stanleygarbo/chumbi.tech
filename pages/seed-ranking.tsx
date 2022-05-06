import { NextPage } from "next";
import Image from "next/image";
import { useEffect, useState } from "react";
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
import { filterObj } from "../interfaces/seed-ranking/IFilter";
import FetchChumbiFilter from "../api/FetchChumbiFilters";
import { useRouter } from "next/router";
import QueryString from "qs";
import PagePicker from "../components/seed-ranking/PagePicker";
import ChumbiInfo from "../components/finder/ChumbiInfo";
import LimitSelector from "../components/seed-ranking/LimitSelector";
import Head from "next/head";

const SeedRankingPage: NextPage = () => {
  const [query, setQuery] = useState<IFetchChumbiQuery>({
    page: 1,
    filter: [],
    limit: 20,
  });
  const [queryString, setQueryString] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const { colors } = useTheme();
  const router = useRouter();

  const ChumbiQuery = useQuery(["Chumbi", query], () => FetchChumbi(query), {
    staleTime: Infinity,
  });

  console.log(ChumbiQuery);

  const { screenWidth } = useScreenSize();

  const { data } = useQuery<{ [key: string]: number }[]>(
    "ChumbiRankingFilter",
    FetchChumbiFilter,
    {
      staleTime: Infinity,
    }
  );
  const [filters, setFilters] = useState<filterObj[]>();

  useEffect(() => {
    if (queryString) router.push(`/seed-ranking?${queryString}`);
  }, [queryString]);

  useEffect(() => {
    let _isMounted = true;
    const arr: filterObj[] = [];
    const query = QueryString.parse(
      router.asPath.replace("/seed-ranking?", "")
    );

    function isInstanceOfQ(obj: any): obj is IFetchChumbiQuery {
      return "filter" in obj || "page" in obj;
    }

    if (isInstanceOfQ(query)) {
      const obj = {
        page: "page" in query ? query.page : 1,
        filter: "filter" in query ? query.filter : [],
        limit: "limit" in query ? query.limit : 20,
      };
      setQuery(obj);
    }

    if (data) {
      Object.entries(data).map((i) => {
        if (isInstanceOfQ(query)) {
          const alreadyIn: string[] = [];
          query.filter?.map((j) => {
            if (j.name === i[0]) {
              const obj: filterObj = {
                name: i[0],
                isOpened: i[0] === "Main Type",
                properties: i[1],
                checkedProperties: j.value,
                checked: j.value.length,
                txtFilter: "",
              };
              arr.push(obj);
              alreadyIn.push(i[0]);
            }
          });

          if (!alreadyIn.includes(i[0])) {
            const obj: filterObj = {
              name: i[0],
              isOpened: i[0] === "Main Type",
              properties: i[1],
              checkedProperties: [],
              checked: 0,
              txtFilter: "",
            };
            arr.push(obj);
          }
        } else {
          const obj: filterObj = {
            name: i[0],
            isOpened: i[0] === "Main Type",
            properties: i[1],
            checkedProperties: [],
            checked: 0,
            txtFilter: "",
          };
          arr.push(obj);
        }
      });
    }

    const filtered = arr.filter((i) => i.name !== "Main Type");
    const mainType = arr.filter((i) => i.name === "Main Type");

    const newArr = [...filtered];
    newArr.unshift(...mainType);

    if (_isMounted) setFilters(newArr);

    return () => {
      _isMounted = false;
    };
  }, [data]);

  return (
    <Container className="hero" colors={colors}>
      <Head>
        <title>
          Seed chumbi rarity ranking | Chumbi explorer | Chumbi Technologies
        </title>
        <meta
          name="description"
          content="
          Chumbi explorer, chumbi finder, chumbi rarity ranking.
          Chumbi Technologies is a dedicated information site to Chumbi Valley, an enchanting
            role-playing blockchain game built on top of BSC and Polygon."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {screenWidth > 867 ? (
        <Filter
          setQueryString={setQueryString}
          queryString={queryString}
          filters={filters}
          setFilters={setFilters}
          data={data}
          query={query}
          setQuery={setQuery}
        />
      ) : (
        <>
          <button
            className={`filter-show ${isFilterOpen && "filter-show--close"}`}
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            {isFilterOpen ? <CgClose /> : "Filters"}{" "}
            {query.filter.length > 0 && !isFilterOpen && (
              <span>{query.filter.length}</span>
            )}
          </button>
          <Modal
            isOpen={isFilterOpen}
            closeTimeoutMS={200}
            onRequestClose={() => setIsFilterOpen(false)}
            ariaHideApp={false}
            style={{
              content: {
                height: "100%",
              },
            }}
          >
            <Filter
              setQueryString={setQueryString}
              queryString={queryString}
              filters={filters}
              setFilters={setFilters}
              data={data}
              query={query}
              setQuery={setQuery}
            />
          </Modal>
        </>
      )}
      <div className="chumbi-cards">
        <div className="chumbi-cards__header">
          <h2>
            {ChumbiQuery.data &&
              `
              Showing ${ChumbiQuery.data?.chumbi.length} of 
              ${ChumbiQuery.data?.count} Chumbi`}
            {ChumbiQuery.isLoading && (
              <Image src="/dots-loader.svg" width={30} height={30} alt="" />
            )}
          </h2>

          <LimitSelector
            onChange={(limit) => {
              setQuery({ ...query, limit });
            }}
            value={query.limit}
          />
        </div>
        {ChumbiQuery.data && (
          <ChumbiCards
            linkTo={screenWidth > 1000 ? "/seed-ranking?id=" : "/finder/"}
            linkAs={screenWidth > 1000 ? "/finder/" : undefined}
            data={ChumbiQuery.data.chumbi}
          />
        )}
        <Modal
          isOpen={!!router.query.id}
          onRequestClose={() => router.back()}
          ariaHideApp={false}
        >
          <ModalViewContainer>
            <ChumbiInfo id={Number(router.query.id)} />
          </ModalViewContainer>
        </Modal>

        {ChumbiQuery.data && query.page && (
          <PagePicker
            maxPage={ChumbiQuery.data.maxPages}
            currentPage={query.page}
            onPagePick={(selectedPage) => {
              setQuery({ page: selectedPage, filter: query.filter });
              setQueryString(
                QueryString.stringify(
                  {
                    page: selectedPage,
                    filter: query.filter,
                    limit: query.limit,
                  },
                  { encode: false }
                )
              );
            }}
          />
        )}
      </div>
    </Container>
  );
};

const ModalViewContainer = styled.div`
  width: 1000px;
  height: 500px;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    display: flex;
    justify-content: center;

    .chumbi-cards {
      z-index: 1;
      flex: 1;
      padding: 20px;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-bottom: 30px;

      &__header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;

        h2 {
          margin: 0;

          @media (max-width: 429px) {
            font-size: 13px;
          }
        }
      }
      @media (max-width: 867px) {
        padding-bottom: 100px;
      }
    }

    .filter-show {
      position: fixed;
      bottom: 20px;
      width: 90%;
      height: 45px;
      border-radius: 100px;
      border: none;

      font-size: 17px;
      font-weight: 600;

      background: ${colors.accent};
      color: #fff;
      transition: width 0.3s;

      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 20;

      @media (min-width: 867px) {
        display: none;
      }

      span {
        background: #fff;
        width: 25px;
        height: 25px;
        margin-left: 10px;
        border-radius: 100%;
        color: ${colors.accent};
      }

      &--close {
        background: ${colors.danger};
        height: 55px;
        width: 55px;
        font-size: 25px;
        z-index: 210;
      }
    }
  `}
`;

export default SeedRankingPage;
