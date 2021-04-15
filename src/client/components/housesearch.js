import React, {useState} from "react";
import styled from "styled-components";
import {HouseCardList} from "./housecardlist";
import {GoogleMapDisplay} from "./googlemapdisplay";
import axios from "axios";

/*************************************************************************/

const LandingBase = styled.div`
  justify-content: right;
`;

const DescriptionStyle = styled.div`
  position: relative;
  align-content: left;
  text-align: left;
  padding-top: 5px;
  padding-left: 10px;
  color: #191970;
`;

const SearchBar = styled.form`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 5%;
  overflow: hidden;
  padding-top: 45px;
  padding-bottom: 10px;
  padding-left: 5px;
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

const ErrorBase = ({error}) => {
    return error ? <Error>Entered zip code is invalid</Error> : <div/>;
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

    const [address1, setAddress1] = useState("");
    const [address2, setAddress2] = useState("");
    const [address3, setAddress3] = useState("");
    const [address4, setAddress4] = useState("");

    const [searched, setSearched] = useState(false);

    const [startTime, setStartTime] = useState(null);

    // Called upon search button pressing
    let onSubmit = (ev) => {
        // this prevents the form from doing anything.. not really useful here I don't think
        ev.preventDefault();

        console.log(`Zip to be searched for ${zip}`);

        if (zip === "") {
            return;
        }

        // backend data requests for this zip
        axios.get(`/api/home/${ zip }`, {
            withCredentials: true
        }).then(res => {
            console.log(`Setting homes to be for zip ${zip}`);

            setError(false);
            setSearched(true);

            setStartTime(new Date().getTime());

            setHouses(res.data.homes);
        }).catch(err => {
            console.log(err);

            setError(true);
            setSearched(false);
        });
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

        const endTime = new Date().getTime();

        if (
            address1 === "" ||
            address2 === "" ||
            address3 === "" ||
            address4 === ""
        ) {
            alert("Please make sure to fill out your house selections!");
        } else if (
            address1 === address2 ||
            address1 === address3 ||
            address1 === address4 ||
            address2 === address3 ||
            address2 === address4 ||
            address3 === address4
        ) {
            alert("Please make sure your choices do not overlap!");
        } else if (endTime - startTime < 5000) {
            // user must spend at least a minute before submitting
            alert("Please spend more time exploring the houses before submitting.");
            console.log(endTime - startTime);
        } else {
            axios.post('/api/rating', {
                bestAddress1: address1,
                bestAddress2: address2,

                worstAddress2: address3,
                worstAddress1: address4
            }, {
                withCredentials: true
            }).then(res => {
                console.log(`Sent rating data for respondent: ${respondent}`);

                alert(
                    "Thanks for your submission! You can close this window and return to the survey."
                );
            }).catch(err => {
                console.log(err);
            });
        }
    };

    // for changing rating inputs
    const handleChange = (ev) => {
        const targetAddress = ev.target.value.replace(/ /g, "-");
        if (ev.target.id === "1") {
            setAddress1(targetAddress);
        } else if (ev.target.id === "2") {
            setAddress2(targetAddress);
        } else if (ev.target.id === "3") {
            setAddress3(targetAddress);
        } else if (ev.target.id === "4") {
            setAddress4(targetAddress);
        }
    };

    return (
        <LandingBase>
            <ErrorBase error={error}/>
            {!searched ? (
                <div>
                    <DescriptionStyle>
                        We are now going to show you houses in your community. Please enter
                        your zip code.
                    </DescriptionStyle>
                    <SearchBar>
                        <FormInput
                            id={"zip"}
                            placeholder="ZIP Code"
                            onChange={onChange}
                            value={zip}
                        />
                        <FormButton onClick={onSubmit}>Search</FormButton>
                    </SearchBar>
                </div>
            ) : (
                <div>
                    <DescriptionStyle>
                        We are interested in what you think about these houses in your
                        community. Below, you see ten different houses, each with their own
                        features. When you click a photo of a house or its map marker, you
                        will see more photos of the same house (i.e. its interiors, outdoor
                        space). <strong>Please explore all ten houses.</strong> Then, tell
                        us your <strong>two favorite houses</strong> and your{" "}
                        <strong>two least favorite houses.</strong>
                    </DescriptionStyle>
                    <SearchBar>
                        <Label>Best:</Label>
                        <FormInput2 id={"1"} onChange={handleChange}>
                            <option value="" disabled selected hidden>
                                Please choose the best home...
                            </option>

                            {houses && <React.Fragment>
                                {houses.map(h => (
                                    <option value={h.address}>
                                        {h.address.replace(/-/g, " ")}
                                    </option>
                                ))}
                            </React.Fragment>}
                        </FormInput2>
                        <Label>2nd Best:</Label>
                        <FormInput2 id={"2"} onChange={handleChange}>
                            <option value="" disabled selected hidden>
                                Please choose the 2nd best home...
                            </option>

                            {houses && <React.Fragment>
                                {houses.map(h => (
                                    <option value={h.address}>
                                        {h.address.replace(/-/g, " ")}
                                    </option>
                                ))}
                            </React.Fragment>}

                        </FormInput2>
                        <Label>Worst:</Label>
                        <FormInput2 id={"4"} onChange={handleChange}>
                            <option value="" disabled selected hidden>
                                Please choose the worst home...
                            </option>

                            {houses && <React.Fragment>
                                {houses.map(h => (
                                    <option value={h.address}>
                                        {h.address.replace(/-/g, " ")}
                                    </option>
                                ))}
                            </React.Fragment>}

                        </FormInput2>
                        <Label>2nd Worst:</Label>
                        <FormInput2 id={"3"} onChange={handleChange}>
                            <option value="" disabled selected hidden>
                                Please choose the 2nd worst home...
                            </option>

                            {houses && <React.Fragment>
                                {houses.map(h => (
                                    <option value={h.address}>
                                        {h.address.replace(/-/g, " ")}
                                    </option>
                                ))}
                            </React.Fragment>}

                        </FormInput2>
                        <FormButton onClick={handleSubmit}>Submit Ratings</FormButton>
                    </SearchBar>
                </div>
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
                    style={{width: "75%", alignSelf: "flex-end"}}
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
