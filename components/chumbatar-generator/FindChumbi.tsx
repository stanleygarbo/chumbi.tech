import React from "react";
import styled, { css } from "styled-components";
import { IFindChumbi } from "../../interfaces/chumbatar-generator/IFindChumbi";

import * as Yup from "yup";
import { FormikField } from "../FormikField";
import { Form, Formik } from "formik";
import { FiSearch } from "react-icons/fi";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";

const ChubmiIDSchema = Yup.object().shape({
  id: Yup.number().min(1, "Too low").required("Required"),
});

const FindChumbi: React.FC<IFindChumbi> = ({ onSubmit, isLoading }) => {
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

  return (
    <Container colors={colors}>
      <h1>Chumbi Avatar Generator</h1>

      <p>You can use your Chumbi&apos;s ID in order to find it.</p>

      <Formik
        validationSchema={ChubmiIDSchema}
        initialValues={{ id: "" }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(Number(values.id));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <section>
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
                {isLoading ? (
                  <img src="/dots-loader.svg" width={23} alt="" />
                ) : (
                  <FiSearch />
                )}
              </button>
            </section>
            <div className={`${errors.id && touched.id && "error"} message`}>
              {errors.id && touched.id
                ? errors.id
                : "What is your Chumbi's ID?"}
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    /* display: flex;
    flex-direction: column;
    align-items: center; */

    h1 {
      color: ${colors.text1};
      font-size: 20px;
    }

    p {
      margin: 10px 0 40px 0;
      color: ${colors.text2};
      font-size: 13px;
    }

    form {
      display: flex;
      flex-direction: column;
      position: relative;

      section {
        display: grid;
        grid-template-columns: 1fr 50px;

        max-width: 400px;
      }

      .message {
        color: ${colors.text2};
        font-size: 13px;
        margin-top: 5px;
        position: absolute;
        top: -30px;
        font-size: 12px;
      }

      .error {
        color: ${colors.danger};
      }
    }

    .find {
      align-self: flex-end;
      border: none;
      border-radius: 3px;
      background-color: ${colors.accent};
      color: #fff;
      font-size: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;

      border-top-left-radius: 0px;
      border-bottom-left-radius: 0px;
    }
  `}
`;

export default FindChumbi;
