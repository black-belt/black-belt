import Navbar from "components/molecules/Navbar";
import LoginModal from "components/organisms/LoginModal/LoginModal";
import { Outlet } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginModalState } from "recoils";

const Layout = () => {
  const isLoginModal = useRecoilValue(loginModalState);

  return (
    <>
      {isLoginModal && <LoginModal />}
      <Navbar />
      <Outlet />
    </>
  );
};
export default Layout;
