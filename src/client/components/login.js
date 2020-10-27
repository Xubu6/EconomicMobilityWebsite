import React, {useState} from "react";
import styled from "styled-components";

/*******************************************************************/

const LoginStyle = styled.div`
    display: flex;
    flex-direction: row;
    align-content: center;
    text-align: center;
    width: 100%;
`;

const FormInput = styled.input`
  width: 40%
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
  align-content: center
  // grid-template-columns: 30% 70%;
  // grid-auto-rows: minmax(10px, auto);
  padding: 0.1em;
  width: 50%
  @media (min-width: 500px) {
    padding: 1em;
  }
`;

export const Login = (props) => {

    const [respondentId, setRespondentId] = useState("");

    const onSubmit = (ev) => {
        ev.preventDefault();
        console.log(`Submit the respondentId ${respondentId}, and log the respondent in`);

        fetch("/v1/respondent", {
            body: JSON.stringify({
                respondentId: respondentId,
            }),
            method: "POST",
            credentials: "include",
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            res.json().then(data => {
                if (res.ok) {
                    console.log(`Logged in with ${data.respondentId}`);
                    props.logIn(data.respondentId);
                } else {
                    console.log(`Login error for respondentId: ${data.respondentId}`);
                }
            });
        });
    };

    const onChange = (ev) => {
        if (ev.target.name === "respondentId"){
            //console.log(`Update the respondentId to ${ev.target.value.toLowerCase()}`);
            setRespondentId(ev.target.value.toLowerCase());
        }
    };

    return (
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
    );


};