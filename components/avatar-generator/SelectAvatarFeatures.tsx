import React from "react";
import styled, { css } from "styled-components";
import { PhotoshopPicker, SwatchesPicker } from "react-color";
import {
  IFeatures,
  ISelectAvatarFeatures,
} from "../../interfaces/avatar-generator/ISelectAvatarFeatures";
import { IColors } from "../../interfaces/IColors";
import { useTheme } from "../../contexts/themeContext";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { IoIosColorPalette } from "react-icons/io";

const SelectAvatarFeatures: React.FC<ISelectAvatarFeatures> = ({
  features,
  setFeatures,
}) => {
  const { colors } = useTheme();

  return (
    <Container colors={colors}>
      <h1>Options</h1>
      {Object.keys(features).map((i: string, idx) => {
        return (
          <div key={idx} className="options__item">
            <h2>{features[i as keyof IFeatures].id}</h2>

            <div className="options__item__selection">
              {features[i as keyof IFeatures].recommended?.map((j, jidx) => (
                <button
                  key={jidx}
                  style={{ background: j }}
                  className={`options__item__selection__color ${
                    j === features[i as keyof IFeatures].selecting &&
                    "options__item__selection__color--active"
                  }`}
                  onClick={() => {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].selecting = j;

                      return newObj;
                    });
                  }}
                ></button>
              ))}
              <button
                className="options__item__selection__btn"
                onClick={() => {
                  if (!features[i as keyof IFeatures].isOpen) {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].isOpen = true;

                      return newObj;
                    });
                  } else {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].isOpen = false;

                      return newObj;
                    });
                  }
                }}
              >
                <IoIosColorPalette size={20} />
                <div
                  style={{
                    width: 15,
                    height: 15,
                    background: features[i as keyof IFeatures].selecting,
                  }}
                ></div>

                {features[i as keyof IFeatures].isOpen ? (
                  <VscTriangleUp />
                ) : (
                  <VscTriangleDown />
                )}
              </button>
            </div>

            <div
              className={`options__item__picker ${
                features[i as keyof IFeatures].isOpen &&
                "options__item__picker--open"
              }`}
            >
              {i === "skin" || i === "hair" ? (
                <PhotoshopPicker
                  header={features[i as keyof IFeatures].id}
                  onChange={(color) => {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].selecting = color.hex;

                      return newObj;
                    });
                  }}
                  color={features[i as keyof IFeatures].selecting}
                  onCancel={() => {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].selecting =
                        newObj[i as keyof IFeatures].saved;
                      newObj[i as keyof IFeatures].isOpen = false;

                      return newObj;
                    });
                  }}
                  onAccept={() => {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].saved =
                        newObj[i as keyof IFeatures].selecting;
                      newObj[i as keyof IFeatures].isOpen = false;

                      return newObj;
                    });
                  }}
                />
              ) : (
                <SwatchesPicker
                  onChange={(color) => {
                    setFeatures((prev) => {
                      const newObj = Object.assign({}, prev);

                      newObj[i as keyof IFeatures].selecting = color.hex;

                      return newObj;
                    });
                  }}
                  color={features[i as keyof IFeatures].selecting}
                />
              )}
            </div>
          </div>
        );
      })}
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    h1 {
      font-size: 18px;
      color: ${colors.text1};
    }

    .options__item {
      h2 {
        color: ${colors.text2};
        margin-top: 20px;
      }

      position: relative;
      min-width: 220px;

      &__selection {
        display: flex;
        gap: 10px;

        &__color {
          border: 2px solid transparent;
          height: 30px;
          width: 30px;
          border-radius: 3px;

          &--active {
            border: 2px solid ${colors.accent};
          }
        }

        &__btn {
          display: flex;
          align-items: center;

          height: 30px;

          background: ${colors.accent2};
          border: none;
          border-radius: 3px;

          color: #fff;
          padding: 5px 5px;

          div {
            border: 1px solid #ffffff70;
            border-radius: 2px;
            margin: 0 5px;
          }
        }

        &__btn,
        &__color {
          transition: 0.15s;

          &:hover {
            opacity: 0.75;
          }

          &:active {
            transform: scale(0.95);
          }
        }
      }

      &__picker {
        display: none;
        /* position: absolute; */
        /* top: 67px; */
        margin-top: 20px;
        z-index: 5;

        &--open {
          display: block;
        }
      }
    }
  `}
`;

export default SelectAvatarFeatures;
