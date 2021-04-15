import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import {Login} from "./components/login";
import {HouseSearch} from "./components/housesearch";
import {Header} from "./components/header";

import axios from "axios";


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


// this is the base of the website
class MyApp extends Component {
    constructor(props) {
        super(props);

        // If the user has logged in, grab info from sessionStorage
        this.state = window.__PRELOADED_STATE__;

        // just gotta do this cause React
        this.loggedIn = this.loggedIn.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    // is the respondent logged in?
    loggedIn() {
        return this.state.respondentId;
    }

    // Log a respondent in
    logIn(respondentId) {
        console.log(`called login function with ${respondentId}`);

        // backend call to log a respondent in
        axios.post('/api/respondent/login', {
            respondentId
        }).then(res => {
            this.setState(res.data);
        }).catch(err => {
            alert("An unexpected error occurred.");
            console.log(err);
        });
    }

    logOut() {
        // backend call to log a respondent out
        axios.post('/api/respondent/logout', {}).then(res => {
            this.setState(null);
        }).catch(err => {
            alert("An unexpected error occurred.");
            console.log(err);
        });
    }

    render() {
        return (
            <div>
            <Header/>
             {/* BrowserRouter is around so other paths can be created */}
            <BrowserRouter>
                <Route path="/" render={props =>
                    // if loggedIn, display the search menu
                    // if not, show login page
                    this.loggedIn() ?
                        (<HouseSearch {...props} respondentId={this.state.respondentId}/>):
                        (<Login {...props} logIn={this.logIn}/>)
                }/>
            </BrowserRouter>
            </div>
    );
    }
}

render(<MyApp />, document.getElementById("mainDiv"));
