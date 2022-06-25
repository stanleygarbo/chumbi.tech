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
              key={i.id}
              href={`${linkTo}${i.id}`}
              as={linkAs ? `${linkAs}${i.id}` : undefined}
            >
              <a>
                <ChumbiCard
                  id={i.id}
                  image={`https://res.cloudinary.com/dr4q1cnig/image/upload/w_500,h_500/v1644474238/chumbi/${i.id}.png`}
                  name={i.name}
                  seed={i.seed?.toLowerCase()}
                  maintype={i.mainType?.toLowerCase()}
                  rarityrank={i.rank}
                  coattype={i.coatType?.toLowerCase()}
                />
              </a>
            </Link>
          ))
        : data.map((i) => (
            <ChumbiCard
              id={i.id}
              key={i.id}
              image={`https://res.cloudinary.com/dr4q1cnig/image/upload/w_500,h_500/v1644474238/chumbi/${i.id}.png`}
              name={i.name}
              seed={i.seed?.toLowerCase()}
              maintype={i.mainType?.toLowerCase()}
              rarityrank={i.rank}
              coattype={i.coatType?.toLowerCase()}
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
