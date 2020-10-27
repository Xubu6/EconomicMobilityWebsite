import React, { useEffect, useState } from "react";
import GoogleMapReact from "google-map-react";
//import { fitBounds } from 'google-map-react/utils';
import styled from "styled-components";
import CustomMarker from "./custommarker";

/*******************************************************************/

const GoogleMapBase = styled.div`
  position: relative;
  padding-right: 4px;
  width: 27%;
  display: flex;
  height: 100%
`;

// this google map component caused me trouble
export const GoogleMapDisplay = ({ houses = "", setShow, setTargetHouse}) => {
    if (!houses){
        console.log("Houses in null or undefined");
        return (
            <GoogleMapBase>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDL_A5wQnUSyio3otmRzu3N5yl9-eaQyZY" }}
                    defaultZoom={ 12 }
                >
                </GoogleMapReact>
            </GoogleMapBase>
        );
    }

    let center = {};
    let markers = [];

    let nwLat;
    let nwLng;
    let seLat;
    let seLng;

    // this was debugging stuff
    console.log(`Houses to be displayed within maps are : ${houses}`);

    if (houses === undefined){
        console.log("Houses is undefined");
    }

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
                // add to array of markers to display on the google map
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
                        classification={home.classification}
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

    // TODO failed attempt to set the zoom of the google map.. needs work here
    const bounds = {
        nw: {
            lat: nwLat,
            lng: nwLng
        },
        se: {
            lat: seLat,
            lng: seLng
        }
    }

    // const fit = fitBounds(
    //     {
    //         nw: {
    //             lat: nwLat,
    //             lng: nwLng
    //         },
    //         se: {
    //             lat: seLat,
    //             lng: seLng
    //         }},
    //     {width: 600, height: 600}
    // );

    // part of the failed attempt to set the markers
    const fitAllMarkers= (map) => {
        console.log(map);
        map.fitBounds(bounds)
        // map.fitToCoordinates(markers, {
        //     edgePadding: 5,
        //     animated: true
        // })
    }

    return (
        <GoogleMapBase>
            {/* // Someone else's component */}
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyDL_A5wQnUSyio3otmRzu3N5yl9-eaQyZY" }}
                center={center}
                defaultZoom={ 12 }
                // failed attempt to size the window
                onMapReady={(map) => {fitAllMarkers(map)}}
            >
                {markers}
            </GoogleMapReact>
        </GoogleMapBase>
    );
};
