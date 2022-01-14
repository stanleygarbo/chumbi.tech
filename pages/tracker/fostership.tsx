import { NextPage } from "next";
import styled from "styled-components";
import ComingSoon from "../../components/ComingSoon";

const fostership: NextPage = () => {
  return (
    <Container className="tracker">
      <ComingSoon />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

export default fostership;
