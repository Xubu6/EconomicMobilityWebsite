import React, { Fragment } from "react";
import GoogleMapReact from "google-map-react";
import { fitBounds } from 'google-map-react/utils';
import styled from "styled-components";

/*******************************************************************/

const GoogleMapBase = styled.div`
  position: relative;
  padding-right: 4px;
  width: 50%;
  display: flex;
  height: 100%
`;

const Marker = ({text}) => (<div style={{
        color: 'white',
        background: 'blue',
        padding: '2px 2px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
    {text}
    </div>
);

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
                text={i}
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
                defaultZoom={ 12 }
            >
                {markers}
            </GoogleMapReact>
        </GoogleMapBase>
    );
};