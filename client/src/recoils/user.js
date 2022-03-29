import Recoil, { atom, selector } from "recoil";
import axiosInstance from "utils/API";
import { localStorageEffect } from "utils/localStorageEffect";

export const token = atom({
  key: "token",
  default: { accessToken: undefined },
  effects_UNSTABLE: [localStorageEffect("blackbelt_token")],
});

export const userInfo = selector({
  key: "userInfo",
  get: async ({ get }) => {
    if (!!get(token).accessToken) {
      const res = await axiosInstance.get("/api/user/userinfo", {});
      return res;
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
});

export const accessToken = selector({
  key: "accessToken",
  get: ({ get }) => {
    return get(token).accessToken;
  },
});
