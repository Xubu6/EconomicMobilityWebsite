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

const Marker = () => (<></>);

export const GoogleMapDisplay = ({ houses = ""}) => {

    let markers = [];

    if (houses !== ""){

        console.log(`Marker should be at lat: ${houseInfo.lat} lng: ${houseInfo.lng}`);
        let i = 0;
        for (let home of houses){
            markers.push(
            <Marker
                key={i}
                address={home.address}
                price={home.price}
                photos={home.photos}
                bedrooms={home.bedrooms}
                bathrooms={home.bathrooms}
                sqft={home.sqft}
                lat={home.lat}
                lng={home.lng}
            /> );
            i++;
        }
    } else {
        console.log("The houses for google map markers are empty");
    }

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
                {markers}
            </GoogleMapReact>
        </GoogleMapBase>
    );
};