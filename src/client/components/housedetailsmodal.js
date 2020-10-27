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
        left                  : '20%',
        right                 : '20%',
        bottom                : '0%',
        overflow              : 'hide',
        border                : '2px solid grey'
    }
};

// this is fun popup handling code, was a little tricky to set up
export const HouseDetailsModal = ({show, handleClose, _id, address, price, photos, bedrooms, bathrooms, classification, sqft}) => {

    function openModal() {
        //setIsOpen(true);
        console.log("open da modal");
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        //subtitle.style.color = '#f00';
    }

    function closeModal(){
        // setIsOpen(false);
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
                {/* // shows detailed home information */}
                <DetailedHouseCard style={{
                    position: 'relative',
                    height: "100",
                    width: "100%"
                }} show={show} _id={_id}
                    address={address} price={price} photos={photos} bedrooms={bedrooms} bathrooms={bathrooms} classification={classification} sqft={sqft} handleClose={handleClose}/>
            </Modal>
    );
};
