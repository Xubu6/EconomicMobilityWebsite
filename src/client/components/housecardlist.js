/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/*************************************************************************/

// const CardImg = styled.div`
//   position: absolute;
//   height: auto;
//   width: 100%;
// `;

let CardBase = styled.div`
  width: 99%;
`;

let PrincipalImg = styled.img`
  position: relative;
  height: auto;
  width: 100%;
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
                <HomePriceStyle placement={'left'}>{price}</HomePriceStyle>
                <HomeInfoStyle placement={'right'}>{bedrooms} bd | {bathrooms} ba | {sqft} sqft </HomeInfoStyle>
                {/*<HomeInfoStyle placement={'right'}>{bathrooms} bath </HomeInfoStyle>*/}
                {/*<HomeInfoStyle placement={'right'}>{sqft} sqft </HomeInfoStyle>*/}
            </HomeDetailsStyle>
        </CardDetails>
    );
};

export const HouseCard = ({ address, price, photos, bedrooms, bathrooms, sqft}) => {
    return (<CardBase>
        <PrincipalImg src={`${photos[0]}`}/>
        <HomeDetails bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} price={price}/>
        <AddressDetails>{address.replace(/_/g, ' ')}</AddressDetails>
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
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  grid-row: 2;
  grid-column: 2 / 7;
  overflow: auto;
  height: 80%;
  // height: auto;
  width: 40%
`;

export const HouseCardList = ({houses}) => {
    console.log(houses);
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
            />
        );
    });
    return (
        <CardCol>
            {children}
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
