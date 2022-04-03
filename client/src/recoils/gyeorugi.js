import { atom, selector } from "recoil";
import { localStorageEffect } from "utils/localStorageEffect";

export const gyeorugiToken = atom({
  key: "gyeorugiToken",
  default: "ko",
  effects_UNSTABLE: [localStorageEffect("gyeorugi_token")],
});

// export const selectedLanguage = selector({
//   key: "selectedLanguage",
//   get: ({ get }) => {
//     return get(gyeorugiToken);
//   },
// });
