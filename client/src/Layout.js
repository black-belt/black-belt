import Navbar from "components/molecules/Navbar";
import LoginModal from "components/organisms/LoginModal/LoginModal";
import PushAlarm from "components/organisms/PushAlarm/PushAlarm";
import TaekwonDoModal from "components/organisms/TaekwondoModal/TaekwondoModal";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  gyeorugiMsg,
  gyeorugiMsgState,
  loginModalState,
  selectedLanguage,
  taekwondoModal,
} from "recoils";
import i18n from "_foundation/translation/i18n";

const Layout = () => {
  const isLoginModal = useRecoilValue(loginModalState);
  const isTaekwondo = useRecoilValue(taekwondoModal);
  const isGyeorugiMsg = useSetRecoilState(gyeorugiMsgState);
  const lang = useRecoilValue(selectedLanguage);
  const message = useRecoilValue(gyeorugiMsg);

  // useEffect(() => {
  //   if (message.type === "INVITE") {
  //     console.log("hi");
  //     isGyeorugiMsg(true);
  //   }
  // }, [message]);
  // console.log(useRecoilState(gyeorugiMsgState));
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      {/* {isGyeorugiMsg && <PushAlarm />} */}
      {isTaekwondo && <TaekwonDoModal />}
      {message.type === "INVITE" && <PushAlarm />}
      {isLoginModal && <LoginModal />}
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;
