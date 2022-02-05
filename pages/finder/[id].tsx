import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";
import ChumbiInfo from "../../components/finder/ChumbiInfo";

const ID: NextPage = () => {
  const { query } = useRouter();

  return (
    <Container className="hero">
      {query.id && <ChumbiInfo id={Number(query.id)} />}
    </Container>
  );
};

const Container = styled.div`
  max-width: 900px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 100px !important;
  margin: 0 auto;
`;

export default ID;
