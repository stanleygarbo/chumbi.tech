import React, { useMemo, useState } from "react";
import { BsFillHeartFill } from "react-icons/bs";
import { useQuery } from "react-query";
import styled, { css } from "styled-components";
import { useDebounce } from "use-debounce";
import FetchSingleChumbi from "../../api/FetchSingleChumbi";
import { useTheme } from "../../contexts/themeContext";
import { IFetchSingleChumbi } from "../../interfaces/api/IFetchSingleChumbi";
import { IColors } from "../../interfaces/IColors";
import { breed, getOdds, IOffspring } from "../../util/breed";
import { getTierByType } from "../../util/getTierByType";
import ChumbiCard from "../chumbi-cards/ChumbiCard";
import Odds from "./Odds";
import OffspringCards from "./OffspringCards";

const BreedingSim: React.FC = () => {
  const { colors } = useTheme();
  const [chumbiID, setChumbiID] = useState({ first: 0, second: 0 });
  const [firstDebounced] = useDebounce(chumbiID.first, 1000);
  const [secondDebounced] = useDebounce(chumbiID.second, 1000);
  const [offsprings, setOffsprings] = useState<IOffspring[]>([]);

  const Chumbi1Query = useQuery<IFetchSingleChumbi>(
    ["Chumbi_" + firstDebounced],
    () => FetchSingleChumbi(firstDebounced),
    {
      staleTime: Infinity,
      enabled: firstDebounced > 0,
      keepPreviousData: true,
    }
  );

  const Chumbi2Query = useQuery<IFetchSingleChumbi>(
    ["Chumbi_" + secondDebounced],
    () => FetchSingleChumbi(secondDebounced),
    {
      staleTime: Infinity,
      enabled: secondDebounced > 0,
      keepPreviousData: true,
    }
  );

  const breeders = useMemo(() => {
    if (Chumbi1Query.data && Chumbi2Query.data)
      return {
        parent1: {
          tier: getTierByType(
            Chumbi1Query.data.attributes[6].value.toString().toLowerCase()
          ),
          isShiny:
            Chumbi1Query.data.attributes[12].value.toString().toLowerCase() !==
            "not shiny",
          isMini:
            Chumbi1Query.data.attributes[10].value.toString().toLowerCase() ===
            "mini",
          coatType: Chumbi1Query.data.attributes[11].value
            .toString()
            .toLowerCase(),
        },
        parent2: {
          tier: getTierByType(
            Chumbi2Query.data.attributes[6].value.toString().toLowerCase()
          ),
          isShiny:
            Chumbi2Query.data.attributes[12].value.toString().toLowerCase() !==
            "not shiny",
          isMini:
            Chumbi2Query.data.attributes[10].value.toString().toLowerCase() ===
            "mini",
          coatType: Chumbi2Query.data.attributes[11].value
            .toString()
            .toLowerCase(),
        },
      };
  }, [Chumbi1Query.data, Chumbi2Query.data]);

  const odds = useMemo(() => {
    if (breeders) return getOdds(breeders);
  }, [breeders]);

  return (
    <Container colors={colors}>
      <div className="container-header">
        <img src="/text-decor-left.png" alt="" width={50} />
        <h1>&nbsp;Breeding Event Simulator</h1>
        &nbsp;&nbsp;
        <img src="/text-decor-right.png" alt="" width={50} />
      </div>

      <section className="chumbi-and-odds">
        <div className="chumbi">
          <div className="chumbi__item">
            <div className="chumbi__item__info">
              {Chumbi1Query.data ? (
                <ChumbiCard
                  id={Chumbi1Query.data.id}
                  edition={Chumbi1Query.data.edition}
                  image={`https://res.cloudinary.com/dr4q1cnig/image/upload/w_500,h_500/v1644474238/chumbi/${Chumbi1Query.data.edition}.png`}
                  name={Chumbi1Query.data.name}
                  seed={Chumbi1Query.data.attributes[8].value
                    .toString()
                    .toLowerCase()}
                  maintype={Chumbi1Query.data.attributes[6].value
                    .toString()
                    .toLowerCase()}
                  rarityrank={Chumbi1Query.data.rarityrank}
                  coattype={Chumbi1Query.data.attributes[11].value
                    .toString()
                    .toLowerCase()}
                />
              ) : (
                <img
                  className="chumbi__item__info__unknown"
                  src="/chumbi/unknown-chumbi.png"
                  alt=""
                  width={200}
                />
              )}
              {Chumbi1Query.isFetching && (
                <img
                  src="/dots-loader.svg"
                  alt=""
                  width={40}
                  className="chumbi__item__info__loading"
                />
              )}
            </div>
            <label htmlFor="chumbi1">Chumbi 1</label>
            <input
              id="chumbi1"
              type="number"
              placeholder="Chumbi ID"
              onChange={(e) => {
                setChumbiID({ ...chumbiID, first: Number(e.target.value) });
              }}
            />
          </div>
          <div className="chumbi__item">
            <div className="chumbi__item__info">
              {Chumbi2Query.data ? (
                <ChumbiCard
                  id={Chumbi2Query.data.id}
                  edition={Chumbi2Query.data.edition}
                  image={`https://res.cloudinary.com/dr4q1cnig/image/upload/w_500,h_500/v1644474238/chumbi/${Chumbi2Query.data.edition}.png`}
                  name={Chumbi2Query.data.name}
                  seed={Chumbi2Query.data.attributes[8].value
                    .toString()
                    .toLowerCase()}
                  maintype={Chumbi2Query.data.attributes[6].value
                    .toString()
                    .toLowerCase()}
                  rarityrank={Chumbi2Query.data.rarityrank}
                  coattype={Chumbi2Query.data.attributes[11].value
                    .toString()
                    .toLowerCase()}
                />
              ) : (
                <img
                  className="chumbi__item__info__unknown"
                  src="/chumbi/unknown-chumbi.png"
                  alt=""
                  width={200}
                />
              )}
              {Chumbi2Query.isFetching && (
                <img
                  src="/dots-loader.svg"
                  alt=""
                  width={40}
                  className="chumbi__item__info__loading"
                />
              )}
            </div>
            <label htmlFor="chumbi2">Chumbi 2</label>
            <input
              id="chumbi2"
              type="number"
              placeholder="Chumbi ID"
              onChange={(e) => {
                setChumbiID({ ...chumbiID, second: Number(e.target.value) });
              }}
            />
          </div>
        </div>
      </section>

      <button
        className={`breed-btn ${
          (!Chumbi1Query.data || !Chumbi2Query.data) && "disabled"
        }`}
        disabled={!Chumbi1Query.data || !Chumbi2Query.data}
        onClick={() => {
          if (breeders) {
            const res = breed(breeders);

            setOffsprings([res, ...offsprings]);
          }
        }}
      >
        <BsFillHeartFill size={20} />
        &nbsp; Breed &nbsp;
        <BsFillHeartFill size={20} />
      </button>

      <Odds data={odds} />

      <OffspringCards offsprings={offsprings} />
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    max-width: 1140px;
    margin: 0 auto;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;

    .container-header {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;

      h1 {
        color: #ffdda7;
        font-family: BoldenVan;
        font-weight: light;
        font-size: 40px;
        letter-spacing: 5px;
        text-transform: uppercase;
        margin: 20px 0;
        text-align: center;
      }
    }

    .chumbi {
      display: flex;
      justify-content: center;
      gap: 100px;

      &__item {
        width: 270px;

        input {
          width: 270px;
          padding: 10px 20px;
          border-radius: 5px;
          border: 1px solid ${colors.border1};
          background: ${colors.bg1};
          font-size: 15px;
          color: ${colors.text1};
          margin-top: 10px;
          outline: none;

          &::-webkit-outer-spin-button,
          &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          &::placeholder {
            color: ${colors.text1 + 70};
          }

          &:hover,
          &:focus {
            border: 1px solid ${colors.accent};
          }
        }

        label {
          color: ${colors.text2};
          font-size: 13px;
        }

        &__info {
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;

          margin: 20px 0;

          position: relative;

          &__unknown {
            opacity: 0.2;
          }

          &__loading {
            position: absolute;
          }
        }
      }
    }

    .disabled {
      opacity: 0.8;
      cursor: not-allowed;
    }

    .breed-btn {
      padding: 8px 15px;
      margin: 50px auto;

      background: ${colors.danger};
      color: #fff;

      border: none;
      border-radius: 5px;

      font-size: 15px;

      display: flex;
      align-items: center;
    }

    @media (max-width: 676px) {
      .container-header {
        h1 {
          font-size: 18px;
        }
      }
      .chumbi {
        flex-direction: column;
        gap: 20px;
        align-items: center;

        &__item__info {
          height: unset;

          &__unknown {
            width: 150px;
          }
        }
      }
    }
  `}
`;

export default BreedingSim;
