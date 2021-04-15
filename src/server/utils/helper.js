/* Copyright D. Ryan @2019 - All rights reserved */
"use strict";

const SORT_FIELD_NAME = "price"


// sorting helper
const sortByPrice = (a, b) => {
    if (a[SORT_FIELD_NAME] > b[SORT_FIELD_NAME]){
        return -1;
    }
    if (a[SORT_FIELD_NAME] < b[SORT_FIELD_NAME])
        return 1;

    return 0;
    //return (a[SORT_FIELD_NAME] > b[SORT_FIELD_NAME]) - (a[SORT_FIELD_NAME] < b[SORT_FIELD_NAME])
};

module.exports =  {
    sortByPrice: sortByPrice
};