import InButton from "components/atoms/Buttons/in-btns";
import Icon from "components/atoms/Icons/CustomIcon";
// import Icon from "components/atoms/Icons/Icon";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { userInfo } from "recoils";
import axiosInstance from "utils/API";
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
                      // src={`http://j6a506.p.ssafy.io:8000${user.userProfilePath}`}
                      src={user.userProfilePath}
                      alt=""
                    />
                  ) : (
                    <Icon
                      icon="defaultUser"
                      block="block"
                      width={45}
                      height={45}
                    />
                  )}
                  <UserTextBox>
                    <UserName>{user.userNick}</UserName>
                    <UserStatus state={user.userState}>
                      {user.userState}
                    </UserStatus>
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
