import styled from "styled-components";
import React from "react";
import {DetailedCardPhotoList} from "./detailedcardphotolist"

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
  height: 15%;
  flex-direction: column;
  justify-content: space-around;
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

let DetailedHomeDetails = ({address, bedrooms, bathrooms, sqft, price}) => {
    return (
        <CardDetails>
            <AddressDetails
                onClick={() => onClick(address, price, photos, bedrooms, bathrooms, sqft)}
            >{address.replace(/-/g, ' ')}</AddressDetails>
            <HomeDetailsStyle>
                <HomePriceStyle>${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</HomePriceStyle>
                <HomeInfoStyle>{bedrooms} bd | {bathrooms} ba | {sqft} sqft </HomeInfoStyle>
                {/*<HomeInfoStyle placement={'right'}>{bathrooms} bath </HomeInfoStyle>*/}
                {/*<HomeInfoStyle placement={'right'}>{sqft} sqft </HomeInfoStyle>*/}
            </HomeDetailsStyle>
        </CardDetails>
    );
};

export const DetailedHouseCard = ({ show, address, price, photos, bedrooms, bathrooms, sqft, onClick}) => {
    if (!show){
        return <div></div>;
    }
    return (<CardBase>
        <DetailedPhotosList>
            <DetailedCardPhotoList photos={photos}/>
        </DetailedPhotosList>
        <DetailedHomeDetails style={{
            width: '50%',
            height: '30%',
            display: 'flex',
            float: 'right'
        }} address={address} bedrooms={bedrooms} bathrooms={bathrooms} sqft={sqft} price={price}
                             onClick={() => onClick(address, price, photos, bedrooms, bathrooms, sqft)}/>
    </CardBase>);
};