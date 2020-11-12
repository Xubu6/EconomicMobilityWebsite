import React, { useState } from "react";
import styled from "styled-components";
import { HouseCardList } from "./housecardlist";
import { GoogleMapDisplay } from "./googlemapdisplay";

/*************************************************************************/

const LandingBase = styled.div`
  justify-content: right;
`;

const SearchBar = styled.form`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 6%;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #b8b8b8;
`;

const FormInput = styled.input`
  margin: 5px 5px;
  width: 30%;
  padding-left: 5px;
`;

const FormInput2 = styled.select`
  margin: 5px 5px;
  width: 18vw;
  padding-left: 5px;
`;

const FormButton = styled.button`
  margin: 5px 5px;
  width: 12vw;
  max-height: 3em;
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 3em;
  font-size: 0.8em;
`;

const ContentRow = styled.div`
  display: flex;
  width: 100%;
  height: 80%;
`;

const Error = styled.div`
  width: 100%;
  height: 5%;
  background-color: red;
`;

const Label = styled.div`
  display: flex;
  justify-content: right;
  font-size: 14px;
  height: 6%;
  padding-top: 15px;
  padding-bottom: 10px;
  margin-left: 5px;
`;

const ErrorBase = ({ error }) => {
  return error ? <Error>Entered zip code is invalid</Error> : <div />;
};

export const HouseSearch = (props) => {
  // full search results for houses within the zip code
  const [houses, setHouses] = useState(null);

  // boolean for showing a detailed house card
  const [show, setShow] = useState(false);

  // target house for the detailed house card
  const [targetHouse, setTargetHouse] = useState(null);

  // zipcode that is being searched
  const [zip, setZip] = useState("");

  // Error for nonexistent zip code
  const [error, setError] = useState(false);

  const respondent = props.respondentId; // the current respondent

  const experimentalGroup = props.experimentalGroup;

  const [address1, setAddress1] = useState("");
  const [classification1, setClassification1] = useState("");
  const [address2, setAddress2] = useState("");
  const [classification2, setClassification2] = useState("");
  const [address3, setAddress3] = useState("");
  const [classification3, setClassification3] = useState("");
  const [address4, setAddress4] = useState("");
  const [classification4, setClassification4] = useState("");

  const [searched, setSearched] = useState(false);

  // Called upon search button pressing
  let onSubmit = (ev) => {
    // this prevents the form from doing anything.. not really useful here I don't think
    ev.preventDefault();

    console.log(`Zip to be searched for ${zip}`);

    if (zip === "") {
      return;
    }

    // backend data requests for this zip
    fetch(`/v1/homeData/${zip}`, {
      // body: JSON.stringify({
      //     username: 'doesnt',
      //     password: 'matter',
      //     zip: document.getElementById("zip").value
      // }),
      method: "GET",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(`Error on house data request: ${data.error}`);
          setError(true);
          setSearched(false);
          return; // FIXME change to show an error message to the user
        }

        console.log(`Setting homes to be for zip ${zip}`);
        setError(false);
        setSearched(true);
        const homes = formatHouses(data.homes); // format based on classification group
        setHouses(homes);
      });
  };

  const formatHouses = (homes) => {
    let counter = 0;
    const keys = Object.keys(homes);
    let formattedHomes = [];
    if (experimentalGroup === 1) {
      while (counter < 10) {
        const rand = (keys.length * Math.random()) << 0;
        if (
          homes[keys[rand]].classification === "rich" &&
          !formattedHomes.some((e) => e.address === homes[keys[rand]].address)
        ) {
          // check for dups
          formattedHomes.push(homes[keys[rand]]);
          counter++;
        }
      }
    } else if (experimentalGroup === 2) {
      while (counter < 10) {
        const rand = (keys.length * Math.random()) << 0;
        if (
          homes[keys[rand]].classification === "poor" &&
          !formattedHomes.some((e) => e.address === homes[keys[rand]].address)
        ) {
          formattedHomes.push(homes[keys[rand]]);
          counter++;
        }
      }
    } else if (experimentalGroup === 3) {
      while (counter < 10) {
        const rand = (keys.length * Math.random()) << 0;
        if (
          homes[keys[rand]].classification === "medium" &&
          !formattedHomes.some((e) => e.address === homes[keys[rand]].address)
        ) {
          formattedHomes.push(homes[keys[rand]]);
          counter++;
        }
      }
    } else if (experimentalGroup === 4) {
      while (counter < 5) {
        const rand = (keys.length * Math.random()) << 0;
        if (
          homes[keys[rand]].classification === "rich" &&
          !formattedHomes.some((e) => e.address === homes[keys[rand]].address)
        ) {
          formattedHomes.push(homes[keys[rand]]);
          counter++;
        }
      }
      while (counter < 10) {
        const rand = (keys.length * Math.random()) << 0;
        if (
          homes[keys[rand]].classification === "poor" &&
          !formattedHomes.some((e) => e.address === homes[keys[rand]].address)
        ) {
          formattedHomes.push(homes[keys[rand]]);
          counter++;
        }
      }
      formattedHomes.sort(() => Math.random() - 0.5); // randomize the order so it isn't 5 rich then 5 poor
    }
    return formattedHomes;
  };

  const onChange = (ev) => {
    if (ev.target.id === "zip") {
      console.log(`Setting zip to ${ev.target.value}`);
      setZip(ev.target.value);
    }
  };

  // for rating submissions
  const handleSubmit = (ev) => {
    ev.preventDefault();

    const ratingData = {
      respondentId: respondent,
      classificationGroup: experimentalGroup,
      zipcode: zip,
      address1: address1,
      classification1: classification1,
      address2: address2,
      classification2: classification2,
      address3: address3,
      classification3: classification3,
      address4: address4,
      classification4: classification4,
    };

    console.log(JSON.stringify(ratingData));

    fetch("/v1/rating", {
      body: JSON.stringify(ratingData),
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          console.log(`Sent rating data for respondent: ${respondent}`);
        } else {
          console.log(`Rating error for respondentId: ${respondent}`);
        }
      });
    });
    alert(
      "Thanks for your submission! You can close this window and return to the survey."
    );
  };

  // for changing rating inputs
  const handleChange = (ev) => {
    const targetAddress = ev.target.value.replace(/ /g, "-");
    let classification = "";
    if (ev.target.id === "1") {
      setAddress1(targetAddress);
      for (let house in houses) {
        if (houses[house].address === targetAddress)
          classification = houses[house].classification;
      }
      setClassification1(classification);
      console.log(`Current State: ${address1}, ${classification1}`);
    } else if (ev.target.id === "2") {
      setAddress2(targetAddress);
      for (let house in houses) {
        if (houses[house].address === targetAddress)
          classification = houses[house].classification;
      }
      setClassification2(classification);
    } else if (ev.target.id === "3") {
      setAddress3(targetAddress);
      for (let house in houses) {
        if (houses[house].address === targetAddress)
          classification = houses[house].classification;
      }
      setClassification3(classification);
    } else if (ev.target.id === "4") {
      setAddress4(targetAddress);
      for (let house in houses) {
        if (houses[house].address === targetAddress)
          classification = houses[house].classification;
      }
      setClassification4(classification);
    }
  };

  return (
    <LandingBase>
      <ErrorBase error={error} />
      {!searched ? (
        <SearchBar>
          <FormInput
            id={"zip"}
            placeholder="ZIP Code"
            onChange={onChange}
            value={zip}
          />
          <FormButton onClick={onSubmit}>Search</FormButton>
        </SearchBar>
      ) : (
        <SearchBar>
          <Label>Best:</Label>
          <FormInput2 id={"1"} onChange={handleChange}>
            <option value="" disabled selected hidden>
              Please choose the best home...
            </option>
            <option value={houses ? houses[0].address : ""}>
              {houses ? houses[0].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[1].address : ""}>
              {houses ? houses[1].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[2].address : ""}>
              {houses ? houses[2].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[3].address : ""}>
              {houses ? houses[3].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[4].address : ""}>
              {houses ? houses[4].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[5].address : ""}>
              {houses ? houses[5].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[6].address : ""}>
              {houses ? houses[6].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[7].address : ""}>
              {houses ? houses[7].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[8].address : ""}>
              {houses ? houses[8].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[9].address : ""}>
              {houses ? houses[9].address.replace(/-/g, " ") : ""}
            </option>
          </FormInput2>
          <Label>2nd Best:</Label>
          <FormInput2 id={"2"} onChange={handleChange}>
            <option value="" disabled selected hidden>
              Please choose the 2nd best home...
            </option>
            <option value={houses ? houses[0].address : ""}>
              {houses ? houses[0].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[1].address : ""}>
              {houses ? houses[1].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[2].address : ""}>
              {houses ? houses[2].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[3].address : ""}>
              {houses ? houses[3].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[4].address : ""}>
              {houses ? houses[4].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[5].address : ""}>
              {houses ? houses[5].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[6].address : ""}>
              {houses ? houses[6].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[7].address : ""}>
              {houses ? houses[7].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[8].address : ""}>
              {houses ? houses[8].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[9].address : ""}>
              {houses ? houses[9].address.replace(/-/g, " ") : ""}
            </option>
          </FormInput2>
          <Label>Worst:</Label>
          <FormInput2 id={"4"} onChange={handleChange}>
            <option value="" disabled selected hidden>
              Please choose the worst home...
            </option>
            <option value={houses ? houses[0].address : ""}>
              {houses ? houses[0].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[1].address : ""}>
              {houses ? houses[1].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[2].address : ""}>
              {houses ? houses[2].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[3].address : ""}>
              {houses ? houses[3].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[4].address : ""}>
              {houses ? houses[4].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[5].address : ""}>
              {houses ? houses[5].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[6].address : ""}>
              {houses ? houses[6].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[7].address : ""}>
              {houses ? houses[7].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[8].address : ""}>
              {houses ? houses[8].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[9].address : ""}>
              {houses ? houses[9].address.replace(/-/g, " ") : ""}
            </option>
          </FormInput2>
          <Label>2nd Worst:</Label>
          <FormInput2 id={"3"} onChange={handleChange}>
            <option value="" disabled selected hidden>
              Please choose the 2nd worst home...
            </option>
            <option value={houses ? houses[0].address : ""}>
              {houses ? houses[0].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[1].address : ""}>
              {houses ? houses[1].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[2].address : ""}>
              {houses ? houses[2].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[3].address : ""}>
              {houses ? houses[3].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[4].address : ""}>
              {houses ? houses[4].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[5].address : ""}>
              {houses ? houses[5].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[6].address : ""}>
              {houses ? houses[6].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[7].address : ""}>
              {houses ? houses[7].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[8].address : ""}>
              {houses ? houses[8].address.replace(/-/g, " ") : ""}
            </option>
            <option value={houses ? houses[9].address : ""}>
              {houses ? houses[9].address.replace(/-/g, " ") : ""}
            </option>
          </FormInput2>
          <FormButton onClick={handleSubmit}>Submit Ratings</FormButton>
        </SearchBar>
      )}
      <ContentRow>
        <GoogleMapDisplay
          houses={houses}
          show={show}
          setShow={setShow}
          targetHouse={targetHouse}
          setTargetHouse={setTargetHouse}
        />

        {/* // this manages the house photos */}
        <HouseCardList
          style={{ width: "75%", alignSelf: "flex-end" }}
          houses={houses}
          show={show}
          setShow={setShow}
          targetHouse={targetHouse}
          setTargetHouse={setTargetHouse}
        />
      </ContentRow>
    </LandingBase>
  );
};
