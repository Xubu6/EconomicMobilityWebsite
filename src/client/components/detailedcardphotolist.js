import styled from "styled-components";
import React from "react";

let DetailedImage = styled.img`
  position: relative;
  width: 28vw;
  height: auto;
  margin-left: 3px;
  margin-top: 3px;
  border: 2px solid grey;
`;

const CardCol = styled.div`
  display: flex;
  align-items: flex-start;
  text-align: right;
  flex-direction: row;
  flex-wrap: wrap;
  overflow: scroll;
  height: auto;
  width: 100%;
`;

export const DetailedCardPhotoList = ({ photos }) => {
  console.log("calling the photos here, should see the src next");

  if (!photos) {
    return <CardCol />;
  }

  // src={src.replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/')}

  let photoList = photos.map((src, i) => {
    //console.log(src.replace('/images/', 'https://zillowprojs3.s3.us-east-2.amazonaws.com/'));
    let url = src;
    return (
      <div
        key={i}
      >
        <DetailedImage
          src={src.replace(
            "/images/",
            "https://zillowprojs3.s3.us-east-2.amazonaws.com/"
          )}
          key={i}
        />
      </div>
    );
  });

  return <CardCol>{photoList}</CardCol>;
};
