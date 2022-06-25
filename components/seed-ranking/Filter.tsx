import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { CheckBox } from "../Checkbox";
import Image from "next/image";
import { filterObj, IFilter } from "../../interfaces/seed-ranking/IFilter";
import qs from "qs";
import { CgClose } from "react-icons/cg";

import * as Yup from "yup";
import { FormikField } from "../FormikField";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useScreenSize } from "../../contexts/screenSizeContext";

const ChubmiIDSchema = Yup.object().shape({
  id: Yup.number().min(1, "Too low").required("Required"),
});

const Filter: React.FC<IFilter> = ({
  setQuery,
  query,
  setFilters,
  filters,
  setQueryString,
}) => {
  const { colors } = useTheme();

  const inputFieldStyles = {
    padding: "9px 10px",
    background: colors.bg1,
    width: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const errorFieldStyle = {
    border: `1px solid ${colors.danger}`,
  };

  const router = useRouter();
  const { screenWidth } = useScreenSize();

  return (
    <Container colors={colors}>
      <div className="filter">
        <div className="filter__title">Filter</div>
        <button
          className="filter__btn"
          onClick={() => {
            const newArr: filterObj[] = [];
            filters?.map((i) => {
              const newObj: filterObj = {
                ...i,
                checkedProperties: [],
                checked: 0,
              };
              newArr.push(newObj);
            });

            setFilters(newArr);
            setQuery({ page: 1, filter: [], limit: query.limit });
            setQueryString(
              qs.stringify(
                { page: query.page, limit: query.limit, filter: [] },
                {
                  encode: false,
                }
              )
            );
          }}
        >
          Clear
        </button>
      </div>

      <div className="property">
        <Formik
          validationSchema={ChubmiIDSchema}
          initialValues={{ id: "" }}
          onSubmit={(values, { resetForm }) => {
            router.push(
              screenWidth > 1000
                ? `/seed-ranking?id=${values.id}`
                : `/finder/${values.id}`
            );
            resetForm();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <FormikField
                colors={colors}
                placeholder="Enter Chumbi ID"
                name="id"
                autoComplete="off"
                type="number"
                style={{
                  ...inputFieldStyles,
                  ...(errors.id && touched.id && errorFieldStyle),
                }}
              />
              <button className="find" type="submit">
                Search
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {filters &&
        filters.map(
          (filter, filterIdx) =>
            filter.name !== "_id" && (
              <div key={filterIdx} className="property">
                <div
                  className="property__header"
                  onClick={() => {
                    const newArr = [...filters];

                    newArr[filterIdx].isOpened = !filter.isOpened;
                    setFilters(newArr);
                  }}
                >
                  <div className="property__header__arrow">
                    {filter.isOpened ? <VscTriangleUp /> : <VscTriangleDown />}
                  </div>
                  <div className="property__header__title">
                    {filter.name.replace(/([A-Z])/g, " $1")}
                  </div>
                  {filter.checked ? (
                    <div className="property__header__count">
                      {filter.checked}
                    </div>
                  ) : null}
                </div>
                <div
                  className={`property__items ${
                    (filter.name === "mainType" ||
                      filter.name === "coatType") &&
                    "property__items--type"
                  } ${filter.isOpened ? "property__items--opened" : ""}`}
                >
                  <section className="property__items__filter">
                    <input
                      className="property__items__filter__txt"
                      type="text"
                      placeholder="Filter Trait"
                      value={filter.txtFilter}
                      onChange={(e) => {
                        const newFilters = [...filters];
                        const newFilters_idxToUpdate = newFilters.findIndex(
                          (i) => i.name === filter.name
                        );
                        newFilters[newFilters_idxToUpdate].txtFilter =
                          e.target.value;

                        setFilters(newFilters);
                      }}
                    />
                    {filter.txtFilter && (
                      <button
                        className="property__items__filter__clear"
                        onClick={() => {
                          const newFilters = [...filters];
                          const newFilters_idxToUpdate = newFilters.findIndex(
                            (i) => i.name === filter.name
                          );
                          newFilters[newFilters_idxToUpdate].txtFilter = "";

                          setFilters(newFilters);
                        }}
                      >
                        <CgClose size={20} />
                      </button>
                    )}
                  </section>
                  {filter.properties &&
                    Object.entries(filter.properties).map(
                      (property, propertyIdx) =>
                        property[0]
                          .toLowerCase()
                          .includes(filter.txtFilter.toLowerCase()) ? (
                          <div
                            key={propertyIdx}
                            className={`property__items__item`}
                          >
                            <CheckBox
                              bg={colors.bg3}
                              withLabel
                              checked={filter.checkedProperties.includes(
                                property[0]
                              )}
                              checkHandler={(e) => {
                                const isChecked = e.target.checked;

                                if (isChecked) {
                                  const newFilters = [...filters];

                                  const newFilters_idxToUpdate =
                                    newFilters.findIndex(
                                      (i) => i.name === filter.name
                                    );
                                  newFilters[
                                    newFilters_idxToUpdate
                                  ].checked += 1;
                                  newFilters[
                                    newFilters_idxToUpdate
                                  ].checkedProperties.push(property[0]);

                                  setFilters(newFilters);

                                  const newQueryFilter = [...query.filter];
                                  let page: number | undefined = 1;
                                  let limit: number | undefined = 20;

                                  const newQueryFilter_idxToUpdate =
                                    newQueryFilter.findIndex(
                                      (i) => i.name === filter.name
                                    );
                                  // if (newQueryFilter.length < 1) {
                                  if (newQueryFilter_idxToUpdate < 0) {
                                    newQueryFilter.push({
                                      name: filter.name,
                                      value: [property[0]],
                                    });
                                  } else {
                                    newQueryFilter[
                                      newQueryFilter_idxToUpdate
                                    ].value.push(property[0]);
                                  }

                                  setQuery({
                                    page,
                                    limit,
                                    filter: newQueryFilter,
                                  });

                                  setQueryString(
                                    qs.stringify(
                                      {
                                        page,
                                        limit,
                                        filter: newQueryFilter,
                                      },
                                      {
                                        encode: false,
                                      }
                                    )
                                  );
                                } else {
                                  const newFilters = [...filters];
                                  const toUpdateIdx = newFilters.findIndex(
                                    (i) => i.name === filter.name
                                  );
                                  newFilters[toUpdateIdx].checked -= 1;
                                  newFilters[toUpdateIdx].checkedProperties =
                                    newFilters[
                                      toUpdateIdx
                                    ].checkedProperties.filter(
                                      (i) => i !== property[0]
                                    );

                                  setFilters(newFilters);

                                  const newFilter: {
                                    name: string;
                                    value: string[];
                                  }[] = [];

                                  query.filter.map((q) => {
                                    const newValues = q.value.filter(
                                      (n) => n !== property[0]
                                    );

                                    const newObj = {
                                      name: q.name,
                                      value:
                                        newValues.length > 0 ? newValues : [],
                                    };

                                    if (newValues.length > 0)
                                      newFilter.push(newObj);
                                  });

                                  if (newFilter) {
                                    setQuery({
                                      page: query.page,
                                      limit: query.limit,
                                      filter: newFilter,
                                    });
                                    setQueryString(
                                      qs.stringify(
                                        {
                                          ...query,
                                          filter: newFilter,
                                        },
                                        { encode: false }
                                      )
                                    );
                                  }
                                }
                              }}
                              style={{ marginBottom: 20 }}
                            >
                              <CheckBoxContent>
                                <section>
                                  {(filter.name === "Main Type" ||
                                    filter.name === "Coat Type") && (
                                    <Image
                                      src={`/types/${property[0].toLowerCase()}.png`}
                                      width={25}
                                      height={25}
                                      alt=""
                                    />
                                  )}
                                  &nbsp;{property[0]}
                                </section>
                              </CheckBoxContent>
                            </CheckBox>
                          </div>
                        ) : null
                    )}
                </div>
              </div>
            )
        )}
      <div className="footer">--Nothing Follows--</div>
    </Container>
  );
};

const CheckBoxContent = styled.div`
  font-size: 14px;
  padding: 10px 0px;
  text-transform: capitalize;
  width: 100%;

  section {
    display: flex;
    align-items: center;
  }
`;

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    width: 300px;
    height: 100vh;
    background: ${colors.bg1};
    border-right: 1px solid ${colors.border1};
    overflow-y: auto;
    position: sticky;
    top: 0px;

    form {
      display: flex;
      padding: 20px;

      button {
        align-self: flex-end;
        border: none;
        border-radius: 3px;
        background-color: ${colors.accent};
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 43px;
        padding: 0 10px;

        border-top-left-radius: 0px;
        border-bottom-left-radius: 0px;
      }
    }

    .footer {
      height: 70px;
      width: 100%;
      color: ${colors.text2 + 60};
      display: grid;
      place-items: center;
    }

    @media (max-width: 867px) {
      width: 100vw;
      height: 100%;
      padding-bottom: 100px;
    }

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${colors.bg2};
    }

    .filter {
      padding: 20px;
      border-bottom: 1px solid ${colors.border1};
      display: flex;
      justify-content: space-between;

      &__title {
        font-size: 20px;
        color: ${colors.text1};
      }

      &__btn {
        padding: 5px 20px;
        background: ${colors.accent2};
        color: #fff;
        border: none;
        border-radius: 5px;
        transition: height 0.1s linear;

        &:hover {
          opacity: 0.9;
        }

        &:active {
          transform: scale(0.9);
        }
      }
    }

    .property {
      border-bottom: 1px solid ${colors.border1};

      &__header {
        position: sticky;
        top: 0px;
        z-index: 1;
        background: ${colors.bg1};
        cursor: pointer;
        display: flex;
        align-items: center;
        height: 50px;
        padding: 0 20px;
        border-bottom: 1px solid ${colors.border1 + 10};

        &__arrow {
          color: ${colors.text1};
          height: 18px;
        }

        &__title {
          color: ${colors.text1};
          margin-left: 10px;
          text-transform: capitalize;
        }

        &__count {
          width: 23px;
          height: 23px;
          display: grid;
          place-items: center;
          background: ${colors.accent};
          border-radius: 100%;
          color: #fff;
          font-size: 14px;
          position: absolute;
          right: 20px;
        }
      }

      &__items {
        overflow: hidden;
        height: 0px;

        &__filter {
          grid-column: span 2;
          width: 100%;
          position: relative;
          margin-bottom: 30px;

          &__txt {
            background: ${colors.bg1};
            border: 1px solid ${colors.border1};
            border-radius: 5px;
            padding: 10px 20px;
            color: ${colors.text2};
            width: 100%;
            outline: none;

            &:focus {
              border: 1px solid ${colors.accent};
            }

            &::placeholder {
              color: ${colors.text2 + 80};
            }
          }

          &__clear {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 40px;
            background: transparent;
            border: none;
            color: ${colors.text2};

            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        &--opened {
          height: fit-content;
          padding: 20px;
        }

        &--type {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
      }
    }
  `}
`;

export default Filter;
