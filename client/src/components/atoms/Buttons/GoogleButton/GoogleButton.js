import Icon from "components/atoms/Icons/Icon";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import {
  GoogleContent,
  GoogleLoginBtn,
  GoogleWrapper,
} from "./GoogleButton.styled";

const clientId = process.env.REACT_APP_GOOGLE_API_KEY;

export default function GoogleButton({ onSocial }) {
  const onSuccess = async (response) => {
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    // await onSocial({
    //   socialId: googleId,
    //   socialType: "google",
    //   email,
    //   nickname: name,
    // });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        // responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
        render={(renderProps) => (
          <GoogleLoginBtn onClick={renderProps.onClick}>
            <GoogleWrapper className="googlewrapper">
              <GoogleContent>
                <Icon icon="google" />
                <span>Sign in with Google Account</span>
              </GoogleContent>
            </GoogleWrapper>
          </GoogleLoginBtn>
        )}
      />
    </div>
  );
}
