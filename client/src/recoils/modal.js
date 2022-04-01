import { atom } from "recoil";

export const modalState = atom({
  key: "modalState",
  default: false,
});

export const loginModalState = atom({
  key: "loginModalState",
  default: null,
});

export const userDetailModalState = atom({
  key: "userDetailModalState",
  default: false,
});
