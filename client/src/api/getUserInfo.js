import { useQuery } from "react-query";
import axiosInstance from "utils/API";

export const GetUserInfo = () => useQuery(["getUserInfo"], () => fetchData());

const fetchData = async () => {
  const res = await axiosInstance.get("/api/user/userinfo", {});
  // const res = await axiosInstance({
  //   url: "/api/user/userinfo",
  // });
  // console.log(res);
  return res;

  // return res;
};

export const UserProfileSelector = (user) => {
  const profileData = {
    nickname: user.userNick,
    profileImg: user.userProfilePath,
    tier: user.userTier,
    tierImg: user.userTierPath,
    level: user.levelNameE,
    levelImg: user.levelImagePath,
    win: user.userWin,
    lose: user.userLose,
    draw: user.userDraw,
    score: user.userScore,
  };
  return profileData;
};
