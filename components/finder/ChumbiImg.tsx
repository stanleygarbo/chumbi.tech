import Image from "next/image";
import React from "react";
import styled from "styled-components";
import { IChumbiImg } from "../../interfaces/finder/IChumbiImg";

const ChumbiImg: React.FC<IChumbiImg> = ({ img }) => {
  return (
    <Container>
      <div className="img">
        {img ? (
          <Image src={img} alt="" layout="fill" />
        ) : (
          <Image src="/ripple-loader.svg" layout="fill" alt="" />
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .img {
    width: 450px;
    overflow: hidden;
    position: relative;
    border-radius: 20px;
    display: grid;
    place-items: center;

    &::before {
      content: "";
      display: block;
      padding-top: 100%;
      /* initial ratio of 1:1*/
    }

    @media (max-width: 798px) {
      width: 350px;
    }
    @media (max-width: 680px) {
      width: 100%;
    }
  }
`;

export default ChumbiImg;
