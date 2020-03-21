/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React, { useState} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {HouseDetailsModal} from './housedetailsmodal';

/*************************************************************************/

// const CardImg = styled.div`
//   position: absolute;
//   height: auto;
//   width: 100%;
// `;

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

export const HouseCard = ({ address, price, photos, bedrooms, bathrooms, sqft, onClick}) => {

    return (<CardBase>
        <PrincipalImg src={`${photos[0]}`} onClick={() => onClick(address, price, photos, bedrooms, bathrooms, sqft)}/>
        <HomeDetails bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} price={price}
                     onClick={() => onClick(address, price, photos, bedrooms, bathrooms, sqft)}/>
        <AddressDetails
            onClick={() => onClick(address, price, photos, bedrooms, bathrooms, sqft)}
        >{address.replace(/-/g, ' ')}</AddressDetails>
    </CardBase>);
};

/*************************************************************************/

const PileBase = styled.div`
  margin: 5px;
  position: relative;
  display: inline-block;
  width: 12%;
`;

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

export const HouseCardList = ({houses}) => {
    console.log(houses);

    const [show, setShow] = useState(false);
    const [targetHouse, setTargetHouse] = useState(null);

    const handleClose = () => {
        console.log("Don't show house modal");
        setTargetHouse(null);
        setShow(false);
    };
    const handleShow = (address, price, photos, bedrooms, bathrooms, sqft) => {
        console.log("Show house modal");
        setTargetHouse({
            address: address,
            price: price,
            photos: photos,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            sqft: sqft
        });
        setShow(true);
    };

    const children = houses.map((houseInfo, i) => {

        return (
            <HouseCard
                key={i}
                address={houseInfo.address}
                price={houseInfo.price}
                photos={houseInfo.photos}
                bedrooms={houseInfo.bedrooms}
                bathrooms={houseInfo.bathrooms}
                sqft={houseInfo.sqft}
                onClick={handleShow}
            />
        );
    });
    return (
        <CardCol>
            {children}
            <HouseDetailsModal
                show={show}
                handleClose={handleClose}
                style={HouseModalStyle}
                {...targetHouse}
            >
            </HouseDetailsModal>
        </CardCol>
    );
};

HouseCardList.propTypes = {
    // cards: PropTypes.arrayOf(PropTypes.object).isRequired,
    // onClick: PropTypes.func,
    // horizontal: PropTypes.bool,
    // spacing: PropTypes.number,
    // maxCards: PropTypes.number,
    // top: PropTypes.number,
    // left: PropTypes.number
};
HouseCardList.defaultProps = {
    // horizontal: false, // Layout horizontal?
    // spacing: 8 // In percent
};
