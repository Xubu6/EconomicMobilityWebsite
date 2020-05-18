import styled from "styled-components";
import React from "react";

let DetailedImage = styled.img`
  position: relative;
  width: 100%;
  padding-top: 25%;
`;

const CardCol = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: right;
  flex-direction: row;
  flex-wrap: wrap;
  grid-row: 2;
  grid-column: 2 / 7;
  overflow: scroll;
  height: auto;
  width: auto;
  align-content: space-between;
  //box-shadow: -5px 0px 5px 3px #D3D3D3;
`;

export const DetailedCardPhotoList = ({ photos }) => {
    console.log("calling the photos here, should see the src next");

    if (!photos){
        return (<CardCol/>);
    }

    // src={src.replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/')}

    let photoList = photos.map((src, i) => {
        //console.log(src.replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/'));
        let url = src;
        return (
            <div key={i} style={{
                width: '400px',
                height: '400px',
            }} >
                <DetailedImage
                    src={src.replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/')}
                    key={i}
                />
            </div>
        );
    });

    return (<CardCol>
        {photoList}
    </CardCol>);
};