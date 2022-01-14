import React from "react";
import styled, { css } from "styled-components";
import { IChumbiCards } from "../../interfaces/chumbi-cards/IChumbiCards";
import ChumbiCard from "./ChumbiCard";
import Link from "next/link";

const ChumbiCards: React.FC<IChumbiCards> = ({ data, linkTo }) => {
  return (
    <Container cardsLength={data.length}>
      {linkTo
        ? data.map((i) => (
            <Link key={i.id} href={`${linkTo}${i.id}`}>
              <a>
                <ChumbiCard
                  id={i.id}
                  image={i.image}
                  name={i.name}
                  rarity={i.rarity}
                  type={i.type}
                />
              </a>
            </Link>
          ))
        : data.map((i) => (
            <ChumbiCard
              key={i.id}
              id={i.id}
              image={i.image}
              name={i.name}
              rarity={i.rarity}
              type={i.type}
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

  display: grid;
  gap: 20px;
  margin-top: 20px;
  ${({ cardsLength }) =>
    cardsLength > 3
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        `
      : cardsLength > 2
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(250px, 250px));

          @media (max-width: 832px) {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }
        `
      : cardsLength > 1
      ? css`
          grid-template-columns: repeat(auto-fit, minmax(250px, 200px));

          @media (max-width: 560px) {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          @media (max-width: 460px) {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }
        `
      : css`
          grid-template-columns: repeat(auto-fit, minmax(250px, 250px));

          @media (max-width: 400px) {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          }
        `}
`;

export default ChumbiCards;
