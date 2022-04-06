import Icon from "components/atoms/Icons/Icon";
import React from "react";
import GoogleLogin from "react-google-login";
import { useTranslation } from "react-i18next";
// import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { token } from "recoils";
import axiosInstance from "utils/API";
import {
  GoogleContent,
  GoogleLoginBtn,
  GoogleWrapper,
} from "./GoogleButton.styled";

const clientId = process.env.REACT_APP_GOOGLE_API_KEY;

export default function GoogleButton() {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const setToken = useSetRecoilState(token);

  const onSuccess = async (response) => {
    const {
      googleId,
      profileObj: { email, name },
    } = response;

    const googleLogin = async () => {
      const data = await axiosInstance.post("/api/user/login", {
        googleId: googleId,
        userName: name,
        userEmail: email,
      });
      await setToken({
        accessToken: data.Authorization,
      });
      // await navigate("/");
      await window.location.reload();
    };
    googleLogin();
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
                <span>{t("welcome google")}</span>
              </GoogleContent>
            </GoogleWrapper>
          </GoogleLoginBtn>
        )}
      />
    </div>
  );
}
