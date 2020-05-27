"use strict";

import React, {useState} from 'react';
import styled from "styled-components";
import {HouseCardList} from "./housecardlist";
import {GoogleMapDisplay} from "./googlemapdisplay";

/*************************************************************************/

const LandingBase = styled.div`
    justify-content: right;
`;

const SearchBar = styled.form`
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

const FormButton = styled.button`
  max-width: 200px;
  min-width: 150px;
  max-height: 2em;
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 2em;
  font-size: 0.8em;
`;


const ContentRow = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const Error = styled.div`
  width: 100%;
  height: 5%;
  background-color: red;
`

const ErrorBase = ({error}) => {
    return (error) ? (
        <Error>Entered zip code is invalid</Error>
    ) : (
        <div/>
    );
}

export const HouseSearch = () => {

    const [houses, setHouses] = useState(null);
    const [show, setShow] = useState(false);
    const [targetHouse, setTargetHouse] = useState(null);
    const [zip, setZip] = useState("");
    const [error, setError] = useState(false);

    let onSubmit = (ev) => {
        ev.preventDefault();

        console.log(`Zip to be searched for ${zip}`);

        if (zip === ""){
            return;
        }

        fetch(`/v1/homeData/${zip}`, {
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
                if (data.error) {
                    console.log(`Error on house data request: ${data.error}`);
                    setError(true);
                    return; // FIXME change to show an error message to the user
                }

                console.log(`Setting homes to be for zip ${zip}`);
                setError(false);
                setHouses(data.homes);
            });
    };

    const onChange = (ev) => {
        if (ev.target.id === "zip"){
            console.log(`Setting zip to ${ev.target.value}`);
            setZip(ev.target.value);
        }
    };

    return (<LandingBase>
        <ErrorBase error={error}/>
        <SearchBar>
            <FormInput id={"zip"} placeholder="ZIP Code" onChange={onChange} value={zip}/>
            <FormButton onClick={onSubmit}>Search</FormButton>
        </SearchBar>
        <ContentRow>
            <GoogleMapDisplay houses={houses} show={show} setShow={setShow} targetHouse={targetHouse} setTargetHouse={setTargetHouse}/>
            <HouseCardList style={{width: "40%", alignSelf: 'flex-end'}} 
              houses={houses} show={show} setShow={setShow} targetHouse={targetHouse} setTargetHouse={setTargetHouse}/>
        </ContentRow>
    </LandingBase>);
};
