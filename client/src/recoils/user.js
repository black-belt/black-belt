import Recoil, { atom, selector } from "recoil";
import axiosInstance from "utils/API";

// export const userInfo = selector({
//   key: "userInfo",
//   get: async ({ get }) => {
//     if (!!get(token)) {
//       const res = await axiosInstance({ url: "/api/user/userinfo" });
//       console.log(res);
//     }
//   },
// });

export const username = atom({
  key: "username",
  default: "",
});

export const profileImg = atom({
  key: "profileImg",
  default: "",
});
