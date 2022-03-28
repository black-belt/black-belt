import axios from "axios";
import Recoil, { atom, selector } from "recoil";
import axiosInstance from "utils/API";

export const token = atom({
  key: "token",
  default: {
    accessToken: undefined,
  },
  // effects_UNSTABLE: localStorage.getItem("blackbelt_token"),
});
// const token = localStorage.getItem("blackbelt_token");

export const authTrigger = atom({
  key: "authTrigger",
  default: 0,
});

export const userInfo = selector({
  key: "userInfo",
  get: async ({ get }) => {
    if (!!get(token).accessToken) {
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + "/api/user/userinfo",
        {
          headers: {
            Authorization: get(token).accessToken,
          },
        }
      );
      // const res = await axiosInstance({ url: "/api/user/userinfo" });
      // const res = await axiosInstance.get("/api/user/userinfo", {});
      console.log(res?.data);
      return res?.data;
    }
    return {
      battleHistories: [],
      countryImagePath: "",
      countryName: "",
      levelImagePath: "",
      levelName: "",
      levelNameE: "",
      userDraw: "",
      userEmail: "",
      userId: "",
      userLose: "",
      // userLvDates: ['2022-03-25T00:00:00.000+00:00'],
      userNick: "",
      userProfilePath: "",
      userScore: "",
      userTier: "",
      userTierPath: "",
      userWin: "",
    };
  },
  set: ({ set }, value) => {
    if (value instanceof Recoil.DefaultValue) {
      set(authTrigger, (v) => v + 1);
    }
  },
});

export const accessToken = selector({
  key: "accessToken",
  get: ({ get }) => {
    return get(token).accessToken;
  },
});

export const username = atom({
  key: "username",
  default: "",
});

export const profileImg = atom({
  key: "profileImg",
  default: "",
});
