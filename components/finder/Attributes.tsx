import Image from "next/image";
import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IAttributes } from "../../interfaces/finder/IAttributes";
import { IColors } from "../../interfaces/IColors";

type BattleType = {
  part: string;
  type: string;
  icon: string;
  name: string;
};

const Attributes: React.FC<IAttributes> = ({ attributes }) => {
  const { colors } = useTheme();

  const mainType = attributes?.filter(
    (obj) => obj.trait_type === "Main Type"
  )[0].value;

  const coatType = attributes?.filter(
    (obj) => obj.trait_type === "Coat Type"
  )[0].value;

  const seed = attributes?.filter((obj) => obj.trait_type === "Seed")[0]?.value;

  const battle: BattleType[] = [];

  if (attributes) {
    for (const att of attributes) {
      if (mainType && coatType) {
        const battleObj: BattleType = {
          part: "",
          type: "",
          icon: "",
          name: "",
        };

        const firstWord = att.trait_type.split(" ")[0];
        const secondWord = att.trait_type.split(" ")[1];
        const isAttack = secondWord === "Attack";
        const isEffect = secondWord === "Effect";

        const mainConditionForBattleInfo =
          att.trait_type.includes("Effect") ||
          att.trait_type.includes("Attack") ||
          att.trait_type === "Ability";

        if (isAttack) {
          battleObj.type = "Attack";
          battleObj.name = att.value;

          if (firstWord === "Main") {
            battleObj.part = "Type";
            battleObj.icon = `/types/${mainType}.png`;
          }
          if (firstWord === "Second") {
            battleObj.part = "Coat";
            battleObj.icon = `/types/${coatType}.png`;
          }
        }

        if (isEffect) {
          battleObj.type = "Effect";
          battleObj.name = att.value;
          battleObj.part = firstWord;
          battleObj.icon = `/icons/effect.png`;
        }

        if (att.trait_type === "Ability") {
          battleObj.type = "Ability";
          battleObj.name = att.value;
          battleObj.part = "Pattern";
          battleObj.icon = `/icons/ability.png`;
        }

        if (mainConditionForBattleInfo) battle.push(battleObj);
      }
    }
  }

  return (
    <Container colors={colors}>
      <h2>Attributes</h2>
      <div className="attributes">
        <div className="attributes__about">
          <div className="attributes__about__info">
            <div className="small-title">Main Type</div>
            <div className="attributes__about__info__val big-value">
              <Image src={`/types/${mainType}.png`} width={40} height={40} />
              &nbsp;
              {mainType}
            </div>
          </div>
          <div className="attributes__about__info">
            <div className="small-title">Coat Type</div>
            <div className="attributes__about__info__val big-value">
              <Image src={`/types/${coatType}.png`} width={40} height={40} />
              &nbsp;
              {coatType}
            </div>
          </div>
          <div className="attributes__about__info">
            <div className="small-title">Seed</div>
            <div className="attributes__about__info__val big-value">
              <Image src={`/seed/${seed}.webp`} width={40} height={40} />
              &nbsp;
              {seed}
            </div>
          </div>
        </div>

        <h2>Battle Info</h2>
        <div className="attributes__battle">
          {battle?.map((i, idx) => (
            <div key={idx} className="attributes__battle__info">
              <div className="attributes__battle__info__part">{i.part}</div>
              <div className="attributes__battle__info__type">{i.type}:</div>
              <div className="attributes__battle__info__icon">
                <Image src={i.icon} width={40} height={40} />
              </div>
              <div className="attributes__battle__info__name">{i.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    .attributes {
      margin-top: 20px;

      &__about {
        display: flex;
        gap: 40px;
        margin-bottom: 40px;

        &__info__val {
          display: flex;
          align-items: center;
          text-transform: capitalize;
        }
      }

      &__item {
        display: flex;
        margin-top: 10px;

        &__name {
          color: ${colors.text1};
          font-weight: 600;
          padding-right: 20px;
          margin-right: 20px;
          border-right: 1px solid ${colors.border1};
        }

        &__val {
          color: ${colors.text2};
        }
      }

      &__battle {
        &__info {
          display: grid;
          grid-template-columns: 80px 60px 40px 1fr;
          text-transform: capitalize;
          align-items: center;
          gap: 10px;
          margin-bottom: 3px;

          &__part {
            color: ${colors.text1};
            font-weight: 600;
            border-right: 1px solid ${colors.border1};
          }
          &__type,
          &__name {
            color: ${colors.text2};
          }

          &__icon {
            display: grid;
            place-items: center;
          }
        }
      }
    }
  `}
`;

export default Attributes;
