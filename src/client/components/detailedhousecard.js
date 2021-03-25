import styled from "styled-components";
import React, { useState } from "react";
import { DetailedCardPhotoList } from "./detailedcardphotolist";
import { Button } from "react-bootstrap";
import { Classification } from "./classification";

let CardBase = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  width: 96%;
  height: 92%;
`;

let HomeDetailsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`;

let CardDetails = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  margin-left: 10px;
`;

let HomeInfoStyle = styled.div`
  display: flex;
  float: left;
  font-size: 14px;
  font-weight: lighter;
  font-style: italic;
  text-align: left;
  margin: 10px;
`;

let ClassificationInfoStyle = styled.div`
  display: flex;
  float: left;
  font-size: 14px;
  font-weight: lighter;
  font-style: italic;
  text-align: left;
  margin: 10px;
`;

let HomePriceStyle = styled.div`
  display: flex;
  float: left;
  font-size: 28px;
  font-weight: bold;
  text-align: left;
`;

let AddressDetails = styled.div`
  justify-content: flex-end;
  text-align: left;
  font-size: 16px;
  margin-bottom: 15px;
`;

let TextStyle = styled.div`
  justify-content: flex-end;
  text-align: left;
  font-size: 14px;
  font-style: italic;
`;

let DetailedPhotosList = styled.div`
  display: flex;
  overflow: auto;
  margin-top: 33px;
  top: 10%;
  width: 100%;
  flex-wrap: wrap;
  height: 96%;
  float: left;
`;

let Header = styled.div`
  z-index: 10000;
  position: absolute;
  display: block;
  align-items: center;
  text-align: center;
  text-decoration: underline;
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 10px;
`;

let DetailedHomeDetails = ({
  _id,
  address,
  bedrooms,
  bathrooms,
  sqft,
  price,
  classification,
  handleClose,
}) => {
  return (
    // <CardDetails>
    <CardDetails>
      <AddressDetails>{address.replace(/-/g, " ")}</AddressDetails>
      <br />
      <HomeDetailsStyle>
        <HomePriceStyle>
          ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </HomePriceStyle>
        <br />
        <HomeInfoStyle>{bathrooms} bath </HomeInfoStyle>
        <br />
        <HomeInfoStyle>{sqft} sqft </HomeInfoStyle>
      </HomeDetailsStyle>
      <br />
      <ClassificationInfoStyle>
        Classification: {classification}
      </ClassificationInfoStyle>
    </CardDetails>
    // </CardDetails>
  );
};

// Most of the stuff in this file was done for styling, which I am not a fan of
export const DetailedHouseCard = ({
  show,
  _id,
  address,
  price,
  photos,
  bedrooms,
  bathrooms,
  sqft,
  classification,
  handleClose,
}) => {
  if (!show) {
    return <div />;
  }

  return (
    <CardBase>
      <Header>Photos</Header>
      <br />
      <DetailedPhotosList>
        <DetailedCardPhotoList photos={photos} />
      </DetailedPhotosList>
    </CardBase>
  );
};
