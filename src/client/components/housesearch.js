"use strict";

import React, { useState } from 'react';
import styled from "styled-components";
import {HouseCardList} from "./housecardlist";
import {GoogleMapDisplay} from "./googlemapdisplay";

/*************************************************************************/

const LandingBase = styled.div`
    justify-content: right;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 4%;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #B8B8B8;
`;

const FormInput = styled.input`
  margin: 5px 5px;
  width: 30%;
  padding-left: 5px;
`;

const ContentRow = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

export const HouseSearch = () => {

    const [houses, setHouses] = useState([]);

    let onSubmit = () => {

        console.log("here we are");

        let zipCode = document.getElementById("zip").value;

        fetch(`/v1/homeData/${zipCode}`, {
            // body: JSON.stringify({
            //     username: 'doesnt',
            //     password: 'matter',
            //     zip: document.getElementById("zip").value
            // }),
            method: "GET",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error)
                    return; // FIXME change to show an error message to the user

                setHouses(data.homes);
            });
    };

    return (<LandingBase>
        <SearchBar>
            <FormInput id={"zip"} placeholder="ZIP Code"/>
            <button onClick={onSubmit}>Search</button>
        </SearchBar>
        <ContentRow>
            <GoogleMapDisplay house={houses}/>
            <HouseCardList style={{width: "40%", alignSelf: 'flex-end'}} houses={houses}/>
        </ContentRow>
    </LandingBase>);
};
