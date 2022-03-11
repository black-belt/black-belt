import { Layout, NavItemBox, NavItemLink } from "./Navbar.styled";

function Navbar({ isLogin, navItemData }) {
  return (
    <Layout>
      {isLogin ? (
        <NavItemBox>
          {navItemData.map(({ name, title, url }) => (
            <NavItemLink to={url} key={name}>
              {title}
            </NavItemLink>
          ))}
        </NavItemBox>
      ) : (
        <NavItemBox>
          <NavItemLink>로그인</NavItemLink>
          <NavItemLink>회원가입</NavItemLink>
        </NavItemBox>
      )}
    </Layout>
  );
}
export default Navbar;
