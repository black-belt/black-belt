import InButton from "components/atoms/Buttons/in-btns";
import Icon from "components/atoms/Icons/CustomIcon";
// import Icon from "components/atoms/Icons/Icon";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfo } from "recoils";
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
  UserImg,
  UserName,
  UserProfile,
  UserStatus,
  UserTextBox,
} from "./NormalLobby.styled";

function NormalLobby() {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const [userList, setUserList] = useState(null);
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
                <UserProfile key={user.userId}>
                  {user.userProfilePath ? (
                    <UserImg
                      state={user.userState}
                      // src={`http://j6a506.p.ssafy.io:8000${user.userProfilePath}`}
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
                    <UserName state={user.userState}>{user.userNick}</UserName>
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
