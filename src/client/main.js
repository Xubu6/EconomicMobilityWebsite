import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import {HouseSearch} from "./components/housesearch";
import {Header} from "./components/header";


const GridBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  grid-template-areas:
    "hd"
    "main"
    "ft";

  @media (min-width: 500px) {
    grid-template-columns: 40px 50px 1fr 50px 40px;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      "hd hd hd hd hd"
      "sb sb main main main"
      "ft ft ft ft ft";
  }
`;



class MyApp extends Component {
    constructor(props) {
        super(props);
        // If the user has logged in, grab info from sessionStorage
        const data = window.__PRELOADED_STATE__;
        this.state = data.username ? data : {};
        console.log(`Starting the webpage`);
    }

    render() {
        return (
            <div>
            <Header/>
            <BrowserRouter>
            <Route path="/" component={HouseSearch} />
            </BrowserRouter>
            </div>
    );
    }
}

render(<MyApp />, document.getElementById("mainDiv"));
