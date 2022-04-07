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

export const gyeorugiMsgState = atom({
  key: "gyeorugiMsgState",
  default: false,
});

export const changeNickname = atom({
  key: "changeNickname",
  default: false,
});

export const taekwondoModal = atom({
  key: "taekwondoModal",
  default: false,
});
