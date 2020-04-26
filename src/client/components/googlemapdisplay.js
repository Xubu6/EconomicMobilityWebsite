import React, { Fragment } from "react";
import GoogleMapReact from "google-map-react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {HouseCard} from "./housecardlist";

/*******************************************************************/

const GoogleMapBase = styled.div`
  position: relative;
  padding-right: 4px;
  width: 50%;
  display: flex;
  height: 100%
`;

export const GoogleMapDisplay = ({ houses = "", email = "" }) => {

    // const children = houses.map((houseInfo, i) => {
    //     return (
    //         <HouseCard
    //             key={i}
    //             address={houseInfo.address}
    //             price={houseInfo.price}
    //             photos={houseInfo.photos}
    //             bedrooms={houseInfo.bedrooms}
    //             bathrooms={houseInfo.bathrooms}
    //             sqft={houseInfo.sqft}
    //         />
    //     );
    // });

    let center = {
        lat: 29.187,
        lng: -82.14
    };


    return (
        <GoogleMapBase>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDL_A5wQnUSyio3otmRzu3N5yl9-eaQyZY" }}
                center={center}
                defaultZoom={6}
            >
            </GoogleMapReact>
        </GoogleMapBase>
    );
};