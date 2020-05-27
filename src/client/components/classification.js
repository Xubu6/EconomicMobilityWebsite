import React, {useState} from "react";
import styled from "styled-components";
//import Dropdown from 'react-dropdown';
//import 'react-dropdown/style.css';
import {Button} from "react-bootstrap";
import Select from "react-dropdown-select";

/*******************************************************************/

let ClassificationStyle = styled.div`
    position: relative;
    width: 80%;
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
`;

export const Classification = ({handleClose, _id, address}) => {

    // this was originally 0, which caused unsure to be marked as 0 in the DB
    const [classification, setClassification] = useState("unsure");

    let submitClassification = () => {
        //let classSubmit = document.getElementById("classification");
        console.log(classification);

        fetch("/v1/homeData", {
            body: JSON.stringify({
                _id: _id,
                address: address,
                category: classification,
            }),
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    console.log(`Updated home address ${data.address} to ${classification} category`);
                } else {
                    console.log(`Classification error for address: ${data.address}`);
                }
            });
        });

        handleClose();
    };

    return (
        <ClassificationStyle>
            <select id="classification" onChange={(ev)=>{
                setClassification(ev.target.value);
            }}>
                <option value="unsure">Unsure</option>
                <option value="rich">Rich</option>
                <option value="medium">Medium</option>
                <option value="poor">Poor</option>
                <option value="useless">Useless</option>
            </select>
            <Button variant={"primary"} style={{width: "40%", textAlign: "center"}}
                    size={"md"} onClick={submitClassification}>Submit Classification</Button>
        </ClassificationStyle>
    );


};
