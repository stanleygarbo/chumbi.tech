import React from "react";
import styled, { css } from "styled-components";
import { IChumbiCards } from "../../interfaces/chumbi-cards/IChumbiCards";
import ChumbiCard from "./ChumbiCard";
import Link from "next/link";

const ChumbiCards: React.FC<IChumbiCards> = ({ data, linkTo, linkAs }) => {
  return (
    <Container cardsLength={data.length}>
      {linkTo
        ? data.map((i) => (
            <Link
              key={i.edition}
              href={`${linkTo}${i.edition}`}
              as={linkAs ? `${linkAs}${i.edition}` : undefined}
            >
              <a>
                <ChumbiCard
                  edition={i.edition}
                  image={`https://ipfs.io/ipfs/${i.imagehash}`}
                  name={i.name}
                  seed={i.attributes[8].value.toString().toLowerCase()}
                  maintype={i.attributes[6].value.toString().toLowerCase()}
                  rarityrank={i.rarityrank}
                  coattype={i.attributes[11].value.toString().toLowerCase()}
                />
              </a>
            </Link>
          ))
        : data.map((i) => (
            <ChumbiCard
              key={i.edition}
              edition={i.edition}
              image={`https://ipfs.io/ipfs/${i.imagehash}`}
              name={i.name}
              seed={i.attributes[8].value.toString().toLowerCase()}
              maintype={i.attributes[6].value.toString().toLowerCase()}
              rarityrank={i.rarityrank}
              coattype={i.attributes[11].value.toString().toLowerCase()}
            />
          ))}
    </Container>
  );
};

const Container = styled.div<{ cardsLength: number }>`
  /* display: flex;
  flex-wrap: wrap; */
  /* justify-content: center; */
  a {
    text-decoration: none;
  }

  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  & > * {
    width: 250px;
    @media (max-width: 410px) {
      width: 100%;
    }
  }

  ${({ cardsLength }) =>
    cardsLength > 4 &&
    css`
      justify-content: center;
    `}
`;

export default ChumbiCards;
