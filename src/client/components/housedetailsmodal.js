/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

import React from "react";
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import PropTypes from "prop-types";
import styled from "styled-components";

import {DetailedHouseCard} from "./detailedhousecard";

/*************************************************************************/
/*
show={show}
                    handleClose={handleClose}
                    address={houseInfo.address}
                    price={houseInfo.price}
                    photos={houseInfo.photos}
                    bedrooms={houseInfo.bedrooms}
                    bathrooms={houseInfo.bathrooms}
                    sqft={houseInfo.sqft}
 */

Modal.setAppElement('#mainDiv');

const customStyles = {
    content : {
        position              : "absolute",
        height                : "80%",
        top                   : '10%',
        left                  : '15%',
        right                 : '15%',
        bottom                : '0%',
        overflow              : 'hide'
        //marginRight           : '-50%',
        //transform             : 'translate(-50%, -50%)'
    }
};

export const HouseDetailsModal = ({show, handleClose, _id, address, price, photos, bedrooms, bathrooms, sqft}) => {

    function openModal() {
        //setIsOpen(true);
        console.log("open da modal");
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModal(){
        setIsOpen(false);
    }

    //console.log(photos);

    return (
            <Modal
                isOpen={show}
                onAfterOpen={afterOpenModal}
                onRequestClose={handleClose}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <button onClick={handleClose}>close</button>
                <DetailedHouseCard style={{
                    position: 'relative',
                    height: "80%",
                    width: "80%"
                }} show={show} _id={_id}
                    address={address} price={price} photos={photos} bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} handleClose={handleClose}/>
            </Modal>
    );
};