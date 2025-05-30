import React from "react";
import styled from "styled-components";
import { mobile, tablet } from "../../Utils/responsive";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { publicRequest } from "../../Utils/requestMethods";

const ServicesEg = () => {
  const TURBO =
    "https://res.cloudinary.com/dotuxkpjj/image/upload/v1672165307/NeatNest%27s%20Garage/turbo-engine_jskppj.webp";

  let content;
  const { data: services, isFetching } = useQuery({
    queryKey: ["servicesData"],
    queryFn: async () => {
      const res = await publicRequest.get("/services/");
      // console.log(res.data);
      return res.data;
    },
  });

  if (isFetching) {
    content = <div>Fetching data, please wait...</div>;
  } else {
    content = services.map((service) => (
      <Item key={service._id}>
        <Link
          style={{ textDecoration: "none" }}
          to={`/service/${service._id}`}
          state={{ service: service }}
        >
          <Icon>
            <Image src={service.homeIcon} />
            <Content>{service.name}</Content>
          </Icon>
        </Link>
      </Item>
    ));
  }
  return (
    <ServicesContainer>
      <Container>
        <Row>
          <Item>
            <Link style={{ textDecoration: "none" }} to={`/products`}>
              <Icon>
                <Image src={TURBO} />
                <Content>Parts</Content>
              </Icon>
            </Link>
          </Item>
          {content}
        </Row>
      </Container>
    </ServicesContainer>
  );
};

export default ServicesEg;

const ServicesContainer = styled.div`
  margin-top: -50px;
  padding-top: 0;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: auto;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3rem;
  ${mobile({
    "grid-template-columns": `repeat(2, 1fr)`,
    gap: "0.5rem",
  })}
  ${tablet({ padding: "0 30px" })}
`;

const Item = styled.div`
  position: relative;
  width: 100%;
  ${mobile({ padding: "5px 0" })}
`;
const Icon = styled.div`
  cursor: pointer;
  padding: 20px;
  position: relative;
  border: 1px solid #f0f2f3;
  background-color: #fff;
  border-radius: 8px;
  z-index: 1;
  box-shadow: 0 3px 24px rgb(0 0 0 / 4%);
  text-align: center !important;
  transition: all 0.5s ease;
  transform: scale(0.95);
  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;

const Image = styled.img`
  width: 50px;
  padding-bottom: 15px;
`;

const Content = styled.h5`
  color: #18181d;
  font-weight: 500;
  font-size: 20px;
  line-height: 1.5;
  ${mobile({
    fontSize: "18px",
  })}
`;
