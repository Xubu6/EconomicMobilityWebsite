import React  from "react";
import styled from "styled-components";
import Rating from "react-star-ratings";

/*******************************************************************/

let RatingsStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    text-align: center;
`;

// THIS IS NO LONGER USED. CAN DELETE
export const MyRating = ({rating, setRating, displayName}) => {

    return (
        <RatingsStyle>
            {displayName}<br/>
            <Rating
                rating={rating}
                starRatedColor="blue"
                changeRating={ (newRating, name) => {
                    setRating(newRating);
                    console.log(`Updated ${name} rating to ${newRating}`);
                }}
                numberOfStars={5}
                name={displayName}
            />
        </RatingsStyle>

    );


};
