import React from "react";
import styled from "styled-components";
import { advantages } from "../../Data/data";
import { mobile } from "../../Utils/responsive";

const Advantages = () => {
  return (
    <AdvantagesContainer>
      <AdvantagesTitle>Advantages</AdvantagesTitle>
      <Row>
        {advantages.map((item) => (
          <Container key={item.img}>
            <Image src={item.img} />
            <ContainerTitle>{item.title}</ContainerTitle>
            <ContainerInfo>{item.desc}</ContainerInfo>
          </Container>
        ))}
      </Row>
    </AdvantagesContainer>
  );
};

export default Advantages;

const AdvantagesContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 4rem auto;
`;
const AdvantagesTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
  line-height: 1.4;
  font-weight: 800;
`;

const Row = styled.div`
  padding-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  ${mobile({
    "grid-template-columns": `repeat(2,1fr)`,
  })}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;

const Image = styled.img`
  padding-bottom: 1.4rem;
  width: 70px;
`;

const ContainerTitle = styled.div`
  padding: 1rem 0;
  font-size: 24px;
  line-height: 1.4;
  font-weight: 500;
`;

const ContainerInfo = styled.div`
  font-size: 15px;
  line-height: 2;
  font-weight: 300;
`;
