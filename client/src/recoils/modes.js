import { atom } from "recoil";

export const modesData = atom({
  key: "modesData",
  default: [
    {
      name: "practice",
      title: "practice mode",
      explanation: "practice mode explanation",
    },
    {
      name: "promotion test",
      title: "promotion test",
      explanation: "promotion test explanation",
    },
    {
      name: "gyeorugi",
      title: "gyeorugi",
      explanation: "gyeorugi explanation",
    },
  ],
});
