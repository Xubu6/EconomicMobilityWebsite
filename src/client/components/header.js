import React, { Fragment } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const fontColor = "#006aff";

const HeaderLeftBase = styled.div`
  flex-grow: 1;
  font-style: italic;
  & > h2 {
    color: ${fontColor};
    margin: 0.75em 0 0.75em 0.5em;
  }
  & > a {
    text-decoration: none;
    & > h2 {
      color: ${fontColor};
      margin: 0.75em 0 0.75em 0.5em;
    }
  }
`;

const HeaderLeft = ({ user }) => {
    return (
        <HeaderLeftBase>
            <h2>Housing Search</h2>
        </HeaderLeftBase>
    );
};

HeaderLeft.propTypes = {
    user: PropTypes.string
};

/*************************************************************************/

const HeaderRightBase = styled.div`
  display: flex;
  flex-direction: ${props => (props.vertical ? "row" : "column")};
  justify-content: center;
  align-items: ${props => (props.vertical ? "center" : "flex-end")};
  padding-right: 0.5em;
  & > a {
    color: ${fontColor};
    padding-right: ${props => (props.vertical ? "0.5em" : "0")};
  }
`;

const HeaderRight = ({ user, email }) => {
    return (
        <HeaderRightBase></HeaderRightBase>
    );
};

HeaderRight.propTypes = {
    user: PropTypes.string,
    email: PropTypes.string
};

/*******************************************************************/

const HeaderBase = styled.div`
  grid-area: hd;
  display: flex;
  background: #ffffff;
  border-bottom: 1px solid #B8B8B8;
`;

export const Header = ({ user = "", email = "" }) => (
    <HeaderBase>
        <HeaderLeft />
        <HeaderRight />
    </HeaderBase>
);

Header.propTypes = {
    user: PropTypes.string,
    email: PropTypes.string
};