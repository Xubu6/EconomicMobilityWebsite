import styled from "styled-components";
import React, {useState} from "react";
import {DetailedCardPhotoList} from "./detailedcardphotolist"
import {MyRating} from "./ratings";
import {Button} from "react-bootstrap";
import {Classification} from "./classification";

let CardBase = styled.div`
  display: flex;
  position: absolute;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

let PrincipalImg = styled.img`
  position: relative;
  width: 100%;
  height: 70%
`;

let HomeDetailsStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%
`;

let CardDetails = styled.div`
  display: flex;
  //position: absolute;
  width: 50%;
  height: 50%;
  flex-direction: column;
  justify-content: space-around;
  align-content: center;
`;

let HomeInfoStyle = styled.div`
  display: flex;
  float: right;
  width: auto;
`;

let HomePriceStyle = styled.div`
    display: flex;
    float: left;
    width: auto;
    font-size: 24px;
    text-align: center;
`;

let AddressDetails = styled.div`
    justify-content: flex-end;
    text-align: center;
    font-size: 16px;
`;

let DetailedPhotosList = styled.div`
    display: flex;
    overflow: auto;
//    position: absolute;
    //width: 576px;
    width: 50%;
    height: 90%;
    float: left;
`;

let DetailedHomeDetails = ({_id, address, bedrooms, bathrooms, sqft, price, handleClose}) => {

    // Commented code here is from a rating system that Professor Kim asked for, then plans changed
    // Delete once confirming the vision doesn't include any Ratings
    // const [rating1, setRating1] = useState(0);
    // const [rating2, setRating2] = useState(0);
    // const [rating3, setRating3] = useState(0);

    // let submitRatings = () => {
    //     // implement rating submission logic here
    //     console.log(`Verify {${rating1}, ${rating2}, ${rating3}} and submit them`);
    //
    //     fetch("/v1/rating", {
    //         body: JSON.stringify({
    //             _id: _id,
    //             address: address,
    //             rating1: rating1,
    //             rating2: rating2,
    //             rating3: rating3
    //         }),
    //         method: "POST",
    //         credentials: "include",
    //         headers: {
    //             "content-type": "application/json"
    //         }
    //     }).then(res => {
    //         res.json().then(data => {
    //             if (res.ok) {
    //                 console.log(`Saved rating with ${data.address}`);
    //             } else {
    //                 Console.log(`Rating error for address: ${data.address}`);
    //             }
    //         });
    //     });
    //     handleClose();
    // };

    // This was the rating components for below
    /*
                <MyRating rating={rating1} setRating={setRating1} displayName={"Cleanliness"}/>
            <MyRating rating={rating2} setRating={setRating2} displayName={"Curb Appeal"}/>
            <MyRating rating={rating3} setRating={setRating3} displayName={"Livability"}/>

            <div style={{width: "100%", textAlign: "center"}}>
                <Button variant={"primary"} style={{width: "20%", textAlign: "center"}} size={"sm"} onClick={submitRatings}>Submit Ratings</Button>
            </div>
    */

    return (
        <CardDetails>
            <AddressDetails>{address.replace(/-/g, ' ')}</AddressDetails>
            <HomeDetailsStyle>
                <HomePriceStyle>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</HomePriceStyle>
                <HomeInfoStyle>{bedrooms} bd | {bathrooms} ba | {sqft} sqft </HomeInfoStyle>
                {/*<HomeInfoStyle placement={'right'}>{bathrooms} bath </HomeInfoStyle>*/}
                {/*<HomeInfoStyle placement={'right'}>{sqft} sqft </HomeInfoStyle>*/}
            </HomeDetailsStyle>
            <br/>
            <br/>
            <Classification handleClose={handleClose} _id={_id} address={address} />
        </CardDetails>
    );
};

// Most of the stuff in this file was done for styling, which I am not a fan of
export const DetailedHouseCard = ({ show, _id, address, price, photos, bedrooms, bathrooms, sqft, handleClose}) => {
    if (!show){
        return <div/>;
    }

    return (<CardBase>
        // the photos, again styling is awful
        <DetailedPhotosList>
            <DetailedCardPhotoList photos={photos}/>
        </DetailedPhotosList>
        // the actual house info
        <DetailedHomeDetails style={{
            width: '50%',
            height: '30%',
            display: 'flex',
            float: 'right'
        }} _id={_id} address={address} bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} price={price} handleClose={handleClose}/>
    </CardBase>);
};
