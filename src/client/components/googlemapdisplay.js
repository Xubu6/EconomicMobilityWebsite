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

const Marker = ({text}) => (<div> style={{
        color: 'white',
        background: 'blue',
        padding: '5px 5px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
}}>
{text}
</div>);

export const GoogleMapDisplay = ({ houses = ""}) => {

    let markers = [];

    let center = {
        lat: 29.187,
        lng: -82.14
    };

    if (houses !== ""){

        let i = 0;
        for (let home of houses){

            if (i === 0){
                center.lat = home.lat;
                center.lng = home.lng;
            }
            console.log(`Marker should be at lat: ${home.lat} lng: ${home.lng}`);
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
                text={home.address}
            /> );
            i++;
        }
    } else {
        console.log("The houses for google map markers are empty");
    }

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