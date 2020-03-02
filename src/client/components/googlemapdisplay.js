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
        lat: 36.12,
        lng: 86.78
    };


    return (
        <GoogleMapBase>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyCYto64Ak34HVWuvAxhOfg-wErJeFXqUqM" }}
                defaultCenter={center}
                defaultZoom={4}
            >
            </GoogleMapReact>
        </GoogleMapBase>
    );
}