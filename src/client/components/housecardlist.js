/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

import React, { useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {HouseDetailsModal} from './housedetailsmodal';

/*************************************************************************/

let CardBase = styled.div`
  width: 46%;
  justify-content: flex-end;
  height: 50%;
  padding: 2%;
`;

let PrincipalImg = styled.img`
  position: relative;
  width: 100%;
  height: 70%
`;

let HomeDetailsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%
`;

let CardDetails = styled.div`
  width: 100%
`;

let HomeInfoStyle = styled.div`
  float: ${props => props.placement};
`;

let HomePriceStyle = styled.div`
    float: left;
    font-size: 24px;
`;

let AddressDetails = styled.div`

`;

let HomeDetails = ({bedrooms, bathrooms, sqft, price}) => {
    return (
        <CardDetails>
            <HomeDetailsStyle>
                <HomePriceStyle placement={'left'}>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</HomePriceStyle>
                <HomeInfoStyle placement={'right'}>{bedrooms} bd | {bathrooms} ba | {sqft} sqft </HomeInfoStyle>
                {/*<HomeInfoStyle placement={'right'}>{bathrooms} bath </HomeInfoStyle>*/}
                {/*<HomeInfoStyle placement={'right'}>{sqft} sqft </HomeInfoStyle>*/}
            </HomeDetailsStyle>
        </CardDetails>
    );
};

// component for an individual HouseCard (single house listing)
export const HouseCard = ({ _id, address, price, photos, bedrooms, bathrooms, sqft, category, lat, lng, onClick}) => {
// src={`${photos[0].replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/')}`}
    // [params are self explanatory] onClick is the function for setting show and targetHouse

    return ((photos[0]) ? (<CardBase>
            // photo url does a string replace cause I am too lazy to write something to update the image paths in the DB
            // that's very doable though using mongoose in a script
        <PrincipalImg src={`${photos[0].replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/')}`}
                      onClick={() => onClick(_id, address, price, photos, bedrooms, bathrooms, sqft, category, lat, lng)}/>
        <HomeDetails bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} price={price}
                     onClick={() => onClick(_id, address, price, photos, bedrooms, bathrooms, sqft, category, lat, lng)}/>
        <AddressDetails
            onClick={() => onClick(_id, address, price, photos, bedrooms, bathrooms, sqft, category, lat, lng)}
        >{address.replace(/-/g, ' ')}</AddressDetails>
    </CardBase>) : (<div></div>));
};

/*************************************************************************/
// I hate styling
const CardCol = styled.div`
  align-items: flex-end;
  text-align: right;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  grid-row: 2;
  grid-column: 2 / 7;
  overflow: auto;
  height: 100%;
  // height: auto;
  width: 50%;
  align-content: space-between;
  box-shadow: -5px 0px 5px 3px #D3D3D3;
`;

const HouseModalStyle = {
    height: "100px",
    width: "80%"
};

// component rendered from HoushSearch component
export const HouseCardList = ({houses, show, setShow, targetHouse, setTargetHouse}) => {
    // houses -> list of houses, could be "null"
    // show -> should it show a detailed house card?
    // setShow -> function to be called to set show.. setShow(true) or setShow(false)
    // targetHouse -> house to show if show==targetHouse
    // setTargetHouse -> function to be called to set a house as targetHouse

    const handleClose = () => {
        setTargetHouse(null);
        setShow(false);
    };
    const handleShow = (_id, address, price, photos, bedrooms, bathrooms, sqft, category, lat, lng) => {
        setTargetHouse({
            _id: _id,
            address: address,
            price: price,
            photos: photos,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            sqft: sqft,
            category: category,
            lat: lat,
            lng: lng
        });
        setShow(true);
    };

    // creates an array of HouseCard components
    const children = houses ? (houses.map((houseInfo, i) => {

        return (
            <HouseCard
                key={i}
                _id={houseInfo._id}
                address={houseInfo.address}
                price={houseInfo.price}
                photos={houseInfo.photos}
                bedrooms={houseInfo.bedrooms}
                bathrooms={houseInfo.bathrooms}
                sqft={houseInfo.sqft}
                category={houseInfo.category}
                lat={houseInfo.lat}
                lng={houseInfo.lng}
                onClick={handleShow}
            />
        );
    })) : <div/>;
    return (
        <CardCol>
            {children}
            // this is for the popup window with detailed house info
            <HouseDetailsModal
                style={HouseModalStyle}
                show={show}
                handleClose={handleClose}
                {...targetHouse}
            >
            </HouseDetailsModal>
        </CardCol>
    );
};
