import Image from "next/image";
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTheme } from "../contexts/themeContext";
import { IColors } from "../interfaces/IColors";
import * as Yup from "yup";
import { FormikField } from "./FormikField";
import { Form, Formik } from "formik";
import { CheckBox } from "./Checkbox";
import { useWallet } from "../contexts/walletContext";
import Socials from "./Socials";

const ChubmiIDSchema = Yup.object().shape({
  walletAddress: Yup.string()
    .matches(/^0x[a-zA-Z0-9]{40}$/, "Invalid address")
    .required("Required"),
});

const ConnectWallet: React.FC = () => {
  const { colors } = useTheme();
  const { setCurrent, connectWallet } = useWallet();

  const inputFieldStyles = {
    padding: "9px 10px",
    background: colors.bg1,
    borderColor: colors.border1,
    width: "100%",
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: "none",
  };

  const errorFieldStyle = {
    border: `1px solid ${colors.danger}`,
  };

  const [isRememberChecked, setIsRememberChecked] = useState<boolean>(true);

  return (
    <Container colors={colors}>
      <div className="top">
        <h2>Add wallet address</h2>
        <Formik
          validationSchema={ChubmiIDSchema}
          initialValues={{ walletAddress: "" }}
          onSubmit={(values, { resetForm }) => {
            setCurrent(values.walletAddress);
            localStorage.setItem("SavedWallet", values.walletAddress);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <section>
                <FormikField
                  colors={colors}
                  placeholder="Enter Wallet address"
                  name="walletAddress"
                  autoComplete="off"
                  type="text"
                  style={{
                    ...inputFieldStyles,
                    ...(errors.walletAddress &&
                      touched.walletAddress &&
                      errorFieldStyle),
                  }}
                />
                <button className="find" type="submit">
                  {false ? (
                    <img src="/dots-loader.svg" width={23} alt="" />
                  ) : (
                    // <FiSearch />
                    "Search"
                  )}
                </button>
              </section>
            </Form>
          )}
        </Formik>
        <CheckBox
          bg={colors.bg1}
          label="Save wallet address for my next visit"
          withLabel
          checked={isRememberChecked}
          checkHandler={() => {
            setIsRememberChecked(!isRememberChecked);
          }}
        />
        <div className="divider">or</div>
        <div className="metamask" onClick={connectWallet}>
          <Image src="/icons/metamask-fox.svg" width={30} height={25} alt="" />
          &nbsp; Connect Metamask
        </div>
      </div>
      <div className="socials">
        <Socials
          showTitle
          isHorizontal
          rawSocialsStyle={{ width: 250 }}
          socialsStyle={{ height: 100 }}
          iconSize={25}
          showBorders
        />
      </div>
    </Container>
  );
};

const Container = styled.div<{ colors: IColors }>`
  ${({ colors }) => css`
    color: ${colors.text2};
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 70px;

    h2 {
      color: ${colors.text2};
      margin-bottom: 20px;
    }

    form {
      margin-bottom: 15px;

      section {
        display: flex;

        button {
          background: ${colors.accent2};
          padding: 0 20px;
          border: none;
          border-top-right-radius: 3px;
          border-bottom-right-radius: 3px;

          color: #fff;
        }
      }
    }
    .divider {
      margin-top: 30px;
      margin-bottom: 30px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      &::before {
        content: "";
        position: absolute;
        width: 42%;
        height: 1px;
        left: 0;
        background-color: ${colors.border1};
      }
      &::after {
        content: "";
        position: absolute;
        width: 42%;
        height: 1px;
        right: 0;
        background-color: ${colors.border1};
      }
    }

    .metamask {
      display: flex;
      align-items: center;
      font-weight: 300;
      font-size: 14px;
      border: 1px solid ${colors.border1};
      /* background: ${colors.accent2 + "99"}; */
      padding: 10px 50px;
      margin-top: 10px;
      border-radius: 5px;
      cursor: pointer;
    }

    .socials {
      width: 100%;
      margin-top: 60px;
      justify-self: flex-end;
    }
  `}
`;

export default ConnectWallet;
