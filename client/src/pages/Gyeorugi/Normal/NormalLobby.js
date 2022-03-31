import InButton from "components/atoms/Buttons/in-btns";
import Icon from "components/atoms/Icons/CustomIcon";
// import Icon from "components/atoms/Icons/Icon";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRecoilState, useSetRecoilState } from "recoil";
import { userDetailModalState, userInfo } from "recoils";
import axiosInstance from "utils/API";
import { colors } from "_foundation";
import {
  BackgroundImg,
  ChampBackground,
  ChampionBox,
  CounterChampion,
  Layout,
  MyChampion,
  SearchBox,
  SearchInput,
  SearchLayout,
  SearchList,
  Standby,
  Status,
  // UserDetail,
  UserImg,
  UserName,
  UserProfile,
  UserStatus,
  UserTextBox,
} from "./NormalLobby.styled";
import UserDetail from "./UserDetails";

function NormalLobby() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [userList, setUserList] = useState(null);
  // const openDetails = useSetRecoilState(userDetailModalState);
  const [openDetails, setOpenDetails] = useRecoilState(userDetailModalState);
  const [targetUser, setTargetUser] = useState("");

  const onclickTargetUser = (user) => {
    setOpenDetails(!openDetails);
    setTargetUser(user);
  };
  // console.log(openDetails(false));
  const onChangeNick = useCallback((e) => {
    setSearchInput(e.target.value);
  });
  const searchUserInfo = async () => {
    const userInfo = await axiosInstance.get(`/api/que/select/${searchInput}`);
    console.log(userInfo);
    setUserList(userInfo);
  };
  const onKeyEnter = (e) => {
    if (e.key === "Enter") {
      searchUserInfo();
    }
  };
  const status = {
    Y: {
      state: "online",
      color: colors.green,
    },
    B: {
      state: "battle",
      color: colors.blue0,
    },
    T: {
      state: "test",
      color: colors.star,
    },
    N: {
      state: "offline",
      color: colors.gray6,
    },
  };

  return (
    <div className="NormalLobby">
      <Layout>
        <BackgroundImg src="/images/practiceBackground.jpg" />
        <Standby>
          <ChampionBox>
            <MyChampion>
              <ChampBackground src="/images/gyeorugi-profile-big.png" alt="" />
            </MyChampion>
            <CounterChampion>
              <ChampBackground src="/images/gyeorugi-profile-big.png" alt="" />
            </CounterChampion>
          </ChampionBox>
          <center>
            <InButton>{t("start")}</InButton>
          </center>
        </Standby>
        <SearchLayout>
          <SearchBox>
            <SearchInput onKeyPress={onKeyEnter} onChange={onChangeNick} />
            <Icon
              icon="search"
              onClick={searchUserInfo}
              width={27}
              height={27}
            />
          </SearchBox>
          {userList ? (
            <SearchList>
              {userList.map((user) => (
                <UserProfile
                  key={user.userId}
                  // onClick={() => setOpenDetails(!openDetails)}
                  // onClick={onclickTargetUser(user.userId)}
                  onClick={() => setTargetUser(user.userId)}
                >
                  {!openDetails && (
                    <UserDetail userData={user} target={targetUser} />
                  )}
                  {user.userProfilePath ? (
                    <UserImg
                      state={user.userState}
                      src={user.userProfilePath}
                      alt=""
                    />
                  ) : (
                    <Icon
                      state={user.userState}
                      icon="defaultUser"
                      block="block"
                      width={40}
                      height={40}
                    />
                  )}
                  <UserTextBox>
                    <UserName
                      state={user.userState}
                      // onClick={() => setOpenDetails(!openDetails)}
                    >
                      {user.userNick}
                    </UserName>
                    <Status>
                      <svg
                        width="7"
                        height="7"
                        viewBox="0 0 7 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle
                          cx="3.5"
                          cy="3.5"
                          r="3.5"
                          fill={status[user.userState].color}
                        />
                      </svg>
                      <UserStatus state={status[user.userState].color}>
                        {t(status[user.userState].state)}
                      </UserStatus>
                    </Status>
                  </UserTextBox>
                </UserProfile>
              ))}
            </SearchList>
          ) : (
            <></>
          )}
        </SearchLayout>
      </Layout>
    </div>
  );
}
export default NormalLobby;
