import React, {useState} from "react";
import styled from "styled-components";
import axios from "axios";

/*******************************************************************/

const LoginStyle = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
  text-align: center;
  width: 100%;
`;

const DescriptionStyle = styled.div`
  position: relative;
  align-content: left;
  text-align: left;
  //width: 50%;
  padding-top: 5px;
  padding-left: 10px;
  color: #191970;
`;

const FormInput = styled.input`
  width: 40%;
  margin: 0.5em 0;
  padding-left: 5px;
`;

const FormButton = styled.button`
  max-width: 200px;
  min-width: 150px;
  max-height: 2em;
  background: #6495ed;
  border: none;
  border-radius: 5px;
  line-height: 2em;
  font-size: 0.8em;
`;

const FormBase = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  // grid-template-columns: 30% 70%;
  // grid-auto-rows: minmax(10px, auto);
  padding: 0.1em;
  margin-top: 40px;
  width: 50%;
  @media (min-width: 500px) {
    padding: 1em;
  }
`;

export const Login = ({logIn}) => {
    const [respondentId, setRespondentId] = useState(null);

    const onSubmit = (ev) => {
        ev.preventDefault();

        console.log(
            `Submit the respondentId ${respondentId}, and log the respondent in`
        );

        axios.post('/api/respondent/login', {
            respondentId
        }, {
            withCredentials: true
        }).then(res => {
            console.log(`Logged in with ${res.data.respondentId}`);
            logIn(res.data.respondentId);
        }).catch(err => {
            console.log(err);
        });
    };

    const onChange = (ev) => {
        if (ev.target.name === "respondentId") {
            //console.log(`Update the respondentId to ${ev.target.value.toLowerCase()}`);
            setRespondentId(ev.target.value.toLowerCase());
        }
    };

    return (
        <div>
            <DescriptionStyle>
                Welcome! This is part of our housing survey. This platform gives you a
                chance to explore houses in your neighborhood. Before you proceed,
                please enter the unique, 9-digit ID that was given to you.{" "}
            </DescriptionStyle>
            <LoginStyle>
                <FormBase>
                    <FormInput
                        id="respondentId"
                        name="respondentId"
                        type="text"
                        placeholder="Respondent ID"
                        value={respondentId}
                        onChange={onChange}
                    />
                    <FormButton onClick={onSubmit}>Login</FormButton>
                </FormBase>
            </LoginStyle>
        </div>
    );
};
