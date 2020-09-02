import React, { Component } from "react";
import { render } from "react-dom";
import styled from "styled-components";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

import {Login} from "./components/login";
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


// this is the base of the website
class MyApp extends Component {
    constructor(props) {
        super(props);
        // If the user has logged in, grab info from sessionStorage
        const data = window.__PRELOADED_STATE__;
        this.state = (data.respondentId) ? data : {};
        console.log(`Starting as respondent: ${this.state.respondent}`);

        // just gotta do this cause React
        this.loggedIn = this.loggedIn.bind(this);
        this.logIn = this.logIn.bind(this);
        this.logOut = this.logOut.bind(this);
    }

    // is the respondent logged in?
    loggedIn() {
        return this.state.respondentId && this.state.experimentalGroup;
    }

    // Log a respondent in
    logIn(respondentId) {
        console.log(`called login function with ${respondentId}`);

        // backend call to log a respondent in
        fetch(`/v1/respondent/${respondentId}`)
            .then(res => res.json())
            .then(res => {
                // puts the respondent info in the state, so we know they're logged in
                this.setState(res.respondent);
            })
            .catch(() => {
                alert("An unexpected error occurred.");
                this.logOut();
            });
    }

    logOut() {
        fetch("/v1/respondent", {
            method: "DELETE",
            credentials: "include"
        }).then(() => {
            // Reset user state
            this.setState(defaultUser);
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
                        (<HouseSearch {...props}/>):
                        (<Login {...props} logIn={this.logIn}/>)
                }/>
            </BrowserRouter>
            </div>
    );
    }
}

render(<MyApp />, document.getElementById("mainDiv"));
