"use strict";

import React, { useState } from 'react';
import styled from "styled-components";
import {HouseCardList} from "./housecardlist";

/*************************************************************************/

const LandingBase = styled.div`
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

export const HouseSearch = () => {

    const [houses, setHouses] = useState([]);

    let onSubmit = () => {

        console.log("here we are");

        fetch("/v1/homeData/10019", {
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
                let text;
                text = data.homes[0].address;
                setHouses(data.homes);
            });
    };

    return (<LandingBase>
        <SearchBar>
            <FormInput id={"zip"} placeholder="ZIP Code"/>
            <button onClick={onSubmit}>Search</button>
        </SearchBar>
        <HouseCardList style={{width: "40%"}} houses={houses}/>
    </LandingBase>);
};
