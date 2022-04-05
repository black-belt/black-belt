import { atom, selector } from "recoil";
import { localStorageEffect } from "utils/localStorageEffect";

export const battleToken = atom({
  key: "battleToken",
  default: "ko",
  effects_UNSTABLE: [localStorageEffect("gyeorugi_token")],
});

export const gyeorugiToken = selector({
  key: "gyeorugiToken",
  get: ({ get }) => {
    return get(battleToken);
  },
});

export const message = atom({
  key: "message",
  default: {
    type: undefined,
    hostId: undefined,
    guestId: undefined,
    token: undefined,
  },
  effects_UNSTABLE: [localStorageEffect("gyeorugi_msg")],
});

export const gyeorugiMsg = selector({
  key: "gyeorugiMsg",
  get: ({ get }) => {
    return get(message);
  },
});
