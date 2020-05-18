import React, { Fragment } from "react";
import GoogleMapReact from "google-map-react";
import { fitBounds } from 'google-map-react/utils';
import styled from "styled-components";
import CustomMarker from "./custommarker";

/*******************************************************************/

const GoogleMapBase = styled.div`
  position: relative;
  padding-right: 4px;
  width: 50%;
  display: flex;
  height: 100%
`;

export const GoogleMapDisplay = ({ houses = "", setShow, setTargetHouse}) => {

    let markers = [];

    let center = {};

    let nwLat;
    let nwLng;
    let seLat;
    let seLng;

    console.log(`Houses to be displayed within maps are : ${houses}`);

    if (houses === ""){
        console.log("Houses equal to empty string");
    }

    if (houses === []){
        console.log("Houses equal to empty array");
    }

    if (!houses){
        console.log("Houses in null or undefined");
    }

    if (houses){

        nwLat = houses[0].lat;
        nwLng = houses[0].lng;
        seLat = houses[0].lat;
        seLng = houses[0].lng;

        let i = 0;
        for (let home of houses){

            if (!home)
                continue;

            if (i === 0){
                center.lat = home.lat;
                center.lng = home.lng;
            }

            nwLat = Math.max(nwLat, home.lat);
            nwLng = Math.max(nwLng, home.lng);
            seLat = Math.min(seLat, home.lat);
            seLng = Math.min(seLng, home.lng);

            if (home.photos[0]) {
                console.log(`Marker should be at lat: ${home.lat} lng: ${home.lng}`);
                markers.push(
                    <CustomMarker
                        key={i}
                        _id={home._id}
                        address={home.address}
                        price={home.price}
                        photos={home.photos}
                        bedrooms={home.bedrooms}
                        bathrooms={home.bathrooms}
                        sqft={home.sqft}
                        lat={home.lat}
                        lng={home.lng}
                        setShow={setShow}
                        setTargetHouse={setTargetHouse}
                        text={i}
                    /> );
                i++;
            }
        }
    }

    console.log(`nwLat : ${nwLat}`);
    console.log(`nwLng : ${nwLng}`);
    console.log(`seLat : ${seLat}`);
    console.log(`seLng : ${seLng}`);

    const fit = fitBounds(
        {
            nw: {
                lat: nwLat,
                lng: nwLng
            },
            se: {
                lat: seLat,
                lng: seLng
            }},
        {width: 600, height: 600}
    );

    console.log(fit);

    return (
        <GoogleMapBase>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDL_A5wQnUSyio3otmRzu3N5yl9-eaQyZY" }}
                center={center}
                defaultZoom={ 9 }
            >
                {markers}
            </GoogleMapReact>
        </GoogleMapBase>
    );
};