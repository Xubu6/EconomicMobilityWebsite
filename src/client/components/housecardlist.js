/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { HouseDetailsModal } from "./housedetailsmodal";

/*************************************************************************/

let CardBase = styled.div`
  width: 18.5%;
  justify-content: flex-start;
  height: 47.5%;
  padding: 0.5%;
  border: 1px solid grey;
`;

let PrincipalImg = styled.img`
  position: relative;
  width: 100%;
  height: 60%;
  cursor: pointer;
`;

let HomeDetailsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 12px;
`;

let CardDetails = styled.div`
  width: 100%;
`;

let HomeInfoStyle = styled.div`
  float: ${(props) => props.placement};
`;

let HomePriceStyle = styled.div`
  float: left;
  font-size: 22px;
  font-weight: bolder;
`;

let AddressDetails = styled.div`
  justify-content: flex-start;
  float: left;
  font-weight: bold;
  font-size: 14px;
  margin-top: 10px;
`;

let MapDetails = styled.div`
  position: fixed;
  padding-top: 30px;
  margin-top: 30px;
  justify-content: flex-start;
  float: left;
  font-size: 12px;
`;

let TextStyle = styled.div`
  position: fixed;
  padding-top: 40px;
  margin-top: 40px;
  justify-content: flex-start;
  float: left;
  font-size: 12px;
  font-style: italic;
`;

let HomeDetails = ({
  index,
  bedrooms,
  bathrooms,
  sqft,
  price,
  classification,
  address,
}) => {
  return (
    <CardDetails>
      {/* <HomeDetailsStyle> */}
      <HomeDetailsStyle>
        <HomePriceStyle>
          ${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </HomePriceStyle>
        <HomeInfoStyle placement={"right"}>
          {bedrooms} bd | {bathrooms} ba | {sqft} sqft
        </HomeInfoStyle>
      </HomeDetailsStyle>
      <AddressDetails>{address.replace(/-/g, " ")}</AddressDetails>
      <MapDetails>
        Map Marker: <strong>{index + 1}</strong>
      </MapDetails>
      {/* <div placement={"left"}>Classification: {classification}</div> */}
      <TextStyle>Click the photo above to see more!</TextStyle>
    </CardDetails>
  );
};

// component for an individual HouseCard (single house listing)
export const HouseCard = ({
  index,
  _id,
  address,
  price,
  photos,
  bedrooms,
  bathrooms,
  sqft,
  category,
  classification,
  lat,
  lng,
  onClick,
}) => {
  // src={`${photos[0].replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/')}`}
  // [params are self explanatory] onClick is the function for setting show and targetHouse

  return photos[0] ? (
    <CardBase>
      <PrincipalImg
        src={`${photos[0].replace(
          "/images/",
          "https://zillowprojs3.s3.us-east-2.amazonaws.com/"
        )}`}
        onClick={() =>
          onClick(
            _id,
            address,
            price,
            photos,
            bedrooms,
            bathrooms,
            sqft,
            category,
            classification,
            lat,
            lng
          )
        }
      />
      <HomeDetails
        index={index}
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        sqft={sqft}
        price={price}
        classification={classification}
        address={address}
        onClick={() =>
          onClick(
            _id,
            address,
            price,
            photos,
            bedrooms,
            bathrooms,
            sqft,
            category,
            classification,
            lat,
            lng
          )
        }
      />
      <AddressDetails
        onClick={() =>
          onClick(
            _id,
            address,
            price,
            photos,
            bedrooms,
            bathrooms,
            sqft,
            category,
            classification,
            lat,
            lng
          )
        }
      />
    </CardBase>
  ) : (
    <div></div>
  );
};

/*************************************************************************/
// I hate styling
const CardCol = styled.div`
  align-items: flex-start;
  text-align: left;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: hidden;
  height: 100%;
  // height: auto;
  width: 74%;
  align-content: stretch;
`;

const HouseModalStyle = {
  height: "100px",
  width: "80%",
};

// component rendered from HoushSearch component
export const HouseCardList = ({
  houses,
  show,
  setShow,
  targetHouse,
  setTargetHouse,
}) => {
  // houses -> list of houses, could be "null"
  // show -> should it show a detailed house card?
  // setShow -> function to be called to set show.. setShow(true) or setShow(false)
  // targetHouse -> house to show if show==targetHouse
  // setTargetHouse -> function to be called to set a house as targetHouse

  const handleClose = () => {
    setTargetHouse(null);
    setShow(false);
  };
  const handleShow = (
    _id,
    address,
    price,
    photos,
    bedrooms,
    bathrooms,
    sqft,
    category,
    classification,
    lat,
    lng
  ) => {
    setTargetHouse({
      _id: _id,
      address: address,
      price: price,
      photos: photos,
      bedrooms: bedrooms,
      bathrooms: bathrooms,
      sqft: sqft,
      category: category,
      classification: classification,
      lat: lat,
      lng: lng,
    });
    setShow(true);
  };

  // creates an array of HouseCard components
  const children = houses ? (
    houses.map((houseInfo, i) => {
      return (
        <HouseCard
          key={i}
          index={i}
          _id={houseInfo._id}
          address={houseInfo.address}
          price={houseInfo.price}
          photos={houseInfo.photos}
          bedrooms={houseInfo.bedrooms}
          bathrooms={houseInfo.bathrooms}
          sqft={houseInfo.sqft}
          category={houseInfo.category}
          classification={houseInfo.classification}
          lat={houseInfo.lat}
          lng={houseInfo.lng}
          onClick={handleShow}
        />
      );
    })
  ) : (
    <div />
  );
  return (
    <CardCol>
      {children}
      {/* // this is for the popup window with detailed house info */}
      <HouseDetailsModal
        style={HouseModalStyle}
        show={show}
        handleClose={handleClose}
        {...targetHouse}
      ></HouseDetailsModal>
    </CardCol>
  );
};
