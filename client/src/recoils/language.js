import { atom, selector } from "recoil";
import { localStorageEffect } from "utils/localStorageEffect";

export const language = atom({
  key: "language",
  default: "ko",
  effects_UNSTABLE: [localStorageEffect("language")],
});

export const selectedLanguage = selector({
  key: "selectedLanguage",
  get: ({ get }) => {
    return get(language);
  },
});
