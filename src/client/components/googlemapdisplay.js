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
  //height: 100%;
`;

// this google map component caused me trouble
export const GoogleMapDisplay = ({ houses = [], setShow, setTargetHouse}) => {
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


    if (houses){

        nwLat = houses.reduce((a, v) => Math.max(a, v), Number.NEGATIVE_INFINITY);
         nwLng = houses.reduce((a, v) => Math.max(a, v), Number.NEGATIVE_INFINITY);
         seLat = houses.reduce((a, v) => Math.min(a, v), Number.POSITIVE_INFINITY);
         seLat = houses.reduce((a, v) => Math.min(a, v), Number.POSITIVE_INFINITY);

        let i = 0;

        for (let home of houses){

            if (!home)
                continue;

            if (i === 0){
                center.lat = home.lat;
                center.lng = home.lng;
            }

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
                        text={i+1}
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
                onMapReady={fitAllMarkers}
            >
                {markers}
            </GoogleMapReact>
        </GoogleMapBase>
    );
};
