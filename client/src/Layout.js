import Navbar from "components/molecules/Navbar";
import LoginModal from "components/organisms/LoginModal/LoginModal";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginModalState, selectedLanguage } from "recoils";
import i18n from "_foundation/translation/i18n";

const Layout = () => {
  const isLoginModal = useRecoilValue(loginModalState);
  const lang = useRecoilValue(selectedLanguage);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);

  return (
    <>
      {isLoginModal && <LoginModal />}
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;
