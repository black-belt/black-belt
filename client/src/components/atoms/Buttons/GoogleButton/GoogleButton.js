import Icon from "components/atoms/Icons/Icon";
import React from "react";
import GoogleLogin from "react-google-login";
import { useTranslation } from "react-i18next";
import { useRecoilState } from "recoil";
import { username, profileImg } from "recoils";
import axiosInstance from "utils/API";
import {
  GoogleContent,
  GoogleLoginBtn,
  GoogleWrapper,
} from "./GoogleButton.styled";

const clientId = process.env.REACT_APP_GOOGLE_API_KEY;

export default function GoogleButton({ onSocial }) {
  const { t, i18n } = useTranslation();
  const [name, setName] = useRecoilState(username);
  const [profileImgUrl, setProfileImgUrl] = useRecoilState(profileImg);

  const onSuccess = async (response) => {
    console.log(response);
    // localStorage.setItem('blackbelt_token', )

    const {
      googleId,
      profileObj: { email, name },
    } = response;
    // console.log(googleId, email, name);

    const googleLogin = async () => {
      const data = await axiosInstance.post("/api/user/login", {
        googleId: googleId,
        userName: name,
        userEmail: email,
      });
      // console.log(data);
      // const token = data.Authorization
      setName(data.userInfo.userNick);
      setProfileImgUrl(data.userInfo.userProfilePath);
      console.log(name, profileImgUrl);
      localStorage.setItem("blackbelt_token", data.Authorization);
      // window.location.reload();
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
