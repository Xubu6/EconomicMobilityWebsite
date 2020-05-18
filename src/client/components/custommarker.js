import React from 'react';
//import {Marker} from 'react-google-maps';

const Marker = ({text, onClick}) => (<div onClick={onClick}
                                          style={{
        color: 'white',
        background: 'blue',
        padding: '2px 2px',
        display: 'inline-flex',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '100%',
        transform: 'translate(-50%, -50%)'
    }}>
    {text}
    </div>
);

                // key={i}
                // address={home.address}
                // price={home.price}
                // photos={home.photos}
                // bedrooms={home.bedrooms}
                // bathrooms={home.bathrooms}
                // sqft={home.sqft}
                // lat={home.lat}
                // lng={home.lng}
                // text={i}
const CustomMarker = ({key, _id, address, price, photos, bedrooms, bathrooms, sqft, lat, lng, setShow, setTargetHouse, text}) => {

    const onMarkerClick = (evt) => {

        // add the id?
        setTargetHouse({
            _id: _id,
            address: address,
            price: price,
            photos: photos,
            bedrooms: bedrooms,
            bathrooms: bathrooms,
            sqft: sqft,
            lat: lat,
            lng: lng
        });
        setShow(true);
    };

    return (
        <Marker
            key={key}
            text={text}
            onClick={onMarkerClick}
        />
    );
};

export default CustomMarker;