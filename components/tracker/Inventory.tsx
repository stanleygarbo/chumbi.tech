import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IFoundersCollectionNFT } from "../../interfaces/api/IFetchFoundersCollection";
import { IColors } from "../../interfaces/IColors";
import ItemCard from "../item-cards/ItemCard";

const Inventory: React.FC<{ data: IFoundersCollectionNFT[] }> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <Container
      colors={colors}
      style={{ justifyContent: data.length > 4 ? "center" : "" }}
    >
      {data.map(
        (i, idx) => (
            <ItemCard
              key={idx}
              id={i.token_id}
              name={i.name}
              attributes={i.attributes}
              image={i.image}
            />
          )
      )}
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    display: flex;
    gap: 20px;

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
  `}
`;

export default Inventory;
