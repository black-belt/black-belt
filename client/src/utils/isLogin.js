const isLogin = () => {
  const token = localStorage.getItem("blackbelt_token");
  // console.log(token);
  if (token === null) {
    // console.log(token);
    return false;
  } else {
    return true;
  }
};
export default isLogin;
