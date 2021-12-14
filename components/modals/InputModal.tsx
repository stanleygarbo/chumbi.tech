import React from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../../contexts/themeContext";
import { IColors } from "../../interfaces/IColors";
import { IInputModal } from "../../interfaces/modals/IInputModal";
import * as Yup from "yup";
import { FormikField } from "../FormikField";
import { Form, Formik } from "formik";
import { FiSearch } from "react-icons/fi";

const ChubmiIDSchema = Yup.object().shape({
  id: Yup.number().min(1, "Too low").required("Required"),
});

const InputModal: React.FC<IInputModal> = ({ title, onSubmit }) => {
  const { colors } = useTheme();

  const inputFieldStyles = {
    padding: "9px 10px",
    background: colors.bg2,
    width: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  };

  const errorFieldStyle = {
    border: `1px solid ${colors.danger}`,
  };

  return (
    <Container colors={colors}>
      <h2>
        <img
          src="https://cdn.discordapp.com/emojis/910733798843510824.png?size=48"
          alt="chumbi"
        />
        &nbsp;
        {title}
        &nbsp;
        <img
          src="https://cdn.discordapp.com/emojis/910732933508268063.png?size=48"
          alt="chumbi"
        />
      </h2>

      <p className="p">You can use your chumbi's ID in order to find it. </p>

      <p className="desc">What's your Chumbi's ID?</p>
      <Formik
        validationSchema={ChubmiIDSchema}
        initialValues={{ id: "" }}
        onSubmit={(values, { resetForm }) => {
          onSubmit(Number(values.id));
          resetForm();
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
              <button className="find">
                <FiSearch />
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    width: 350px;

    h2 {
      color: ${colors.text1};
      font-size: 16px;
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 30px;
      }
    }

    .p,
    .desc {
      font-size: 14px;
      color: ${colors.text2};
    }

    .p {
      margin-top: 15px;
      margin-bottom: 10px;
      text-align: center;
    }

    .desc {
      text-transform: uppercase;
      font-size: 12px;
      margin-bottom: 5px;
      margin-top: 30px;
    }

    form {
      display: flex;
      flex-direction: column;

      section {
        display: grid;
        grid-template-columns: 1fr 50px;
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

export default InputModal;
