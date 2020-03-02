/* Copyright G. Hemingway, 2019 - All rights reserved */
"use strict";

import React from "react";
import Modal from 'react-bootstrap-modal'
import PropTypes from "prop-types";
import styled from "styled-components";

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

export const HouseDetailsModal = ({show, handleClose, address, price, photots, bedrooms, bathrooms, sqft}) => {

    return (
            <Modal show={show} onHide={handleClose} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
    );
};