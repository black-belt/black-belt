import React, { useState } from "react";
import GoogleLogin from "react-google-login";

// const clientId = process.env.GOOGLE_CLIENT_ID;
const clientId =
  "27965048955-gtgpg5thqqnh8t61hu9r3rb7nhineu15.apps.googleusercontent.com";

export default function GoogleButton({ onSocial }) {
  const onSuccess = async (response) => {
    console.log(response);

    const {
      googleId,
      profileObj: { email, name },
    } = response;

    await onSocial({
      socialId: googleId,
      socialType: "google",
      email,
      nickname: name,
    });
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={"id_token"}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </div>
  );
}
