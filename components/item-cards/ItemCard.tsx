import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { IItemCard } from "../../interfaces/item-cards/IItemCard";

const ItemCard: React.FC<IItemCard> = ({ name, id, attributes, image }) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <div className="id">#{id}</div>
      <img src={image} alt={name} />

      <h6>{name}</h6>

      <div className="attributes">
        {attributes.map((i, idx) => (
          <div
            key={idx}
            className={`attributes__tag ${i.value.toString().toLowerCase()}`}
          >
            {i.value}
          </div>
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    display: flex;
    flex-direction: column;
    padding: 10px;
    background: ${colors.bg4};
    border-radius: 5px;

    .id {
      color: ${colors.text2};
      font-size: 12px;
      padding-bottom: 5px;
    }

    img {
      border-radius: 10px;
      height: 230px;
      width: 230px;
    }

    h6 {
      color: ${colors.text2};
      font-size: 14px;
      font-weight: 400;
      padding: 5px 0 6px 0;
    }

    .attributes {
      font-size: 13px;
      color: #fff;
      display: flex;
      flex-wrap: wrap;

      &__tag {
        padding: 0 10px;
        border-radius: 3px;
      }
      .founder {
        border: 1px solid #ffc83d;
        color: #ffc83d;
      }
    }
  `}
`;

export default ItemCard;
