import { NextPage } from "next";
import { useState } from "react";
import styled, { css } from "styled-components";
import MaleAvatar from "../components/avatar-generator/MaleAvatar";
import SelectAvatarFeatures from "../components/avatar-generator/SelectAvatarFeatures";
import { useTheme } from "../contexts/themeContext";
import { IFeatures } from "../interfaces/avatar-generator/ISelectAvatarFeatures";
import { IColors } from "../interfaces/IColors";

const AvatarGenerator: NextPage = () => {
  const [features, setFeatures] = useState<IFeatures>({
    coat: {
      saved: "#543c24",
      selecting: "#543c24",
      isOpen: false,
      id: "Coat color",
      recommended: ["#543c24", "#303f9f", "#33691e", "#ffc107", "#36b5b4"],
    },
    coatTrim: {
      saved: "#a1734f",
      selecting: "#a1734f",
      isOpen: false,
      id: "Coat trim color",
      recommended: ["#a1734f", "#7986cb", "#689f38", "#ffd54f", "#c8c8c2"],
    },
    eyes: {
      saved: "#543c24",
      selecting: "#543c24",
      isOpen: false,
      id: "Eye color",
      recommended: ["#543c24", "#303f9f", "#33691e", "#ffa000", "#76d0d4"],
    },
    hair: {
      saved: "#4c3724",
      selecting: "#4c3724",
      isOpen: false,
      id: "Hair color",
      recommended: ["#4c3724", "#000000", "#512D0D", "#c58636"],
    },
    skin: {
      saved: "#c9a279",
      selecting: "#c9a279",
      isOpen: false,
      id: "Skin color",
      recommended: ["#c9a279", "#917557", "#7E664D", "#634F3A"],
    },
  });

  const { colors } = useTheme();

  return (
    <Container className="hero" colors={colors}>
      <div className="wrapper">
        <MaleAvatar
          coat={features.coat.selecting}
          // coat="#35aeac"
          hair={features.hair.selecting}
          // hair="#c48636"
          skin={features.skin.selecting}
          eyes={features.eyes.selecting}
          // eyes="#78c5d6"
          coatTrim={features.coatTrim.selecting}
          // coatTrim="#c8c8c2"
        />
        <SelectAvatarFeatures setFeatures={setFeatures} features={features} />
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    max-width: 840px;
    margin: 0 auto;

    .wrapper {
      display: flex;
      align-items: start;
      gap: 50px;
      padding: 20px;

      @media (max-width: 760px) {
        flex-direction: column;
        gap: 20px;
      }
    }
  `}
`;

export default AvatarGenerator;
