import LangBtn from "components/atoms/Buttons/lang-btn";
import Icon from "components/atoms/Icons/Icon";
import isLogin from "utils/isLogin";
import { Layout, Logo, NavItemBox, NavItemLink } from "./Navbar.styled";

function Navbar({ navItemData }) {
  return (
    <Layout>
      <Logo>
        <img src="/images/logo.png" alt="" />
      </Logo>
      {isLogin() ? (
        <NavItemBox>
          <div>for test</div>
          {/* {navItemData.map(({ name, title, url }) => (
            <NavItemLink to={url} key={name}>
              {title}
            </NavItemLink>
          ))} */}
        </NavItemBox>
      ) : (
        <NavItemBox>
          <NavItemLink to="/">로그인</NavItemLink>
          <NavItemLink to="/">회원가입</NavItemLink>
          <LangBtn>
            <Icon icon="korean" />
            KOR
          </LangBtn>
        </NavItemBox>
      )}
    </Layout>
  );
}
export default Navbar;
