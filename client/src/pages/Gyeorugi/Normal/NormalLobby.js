import InButton from "components/atoms/Buttons/in-btns";
import Icon from "components/atoms/Icons/Icon";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t, i18n } = useTranslation();
  const [searchInput, setSearchInput] = useState("");
  const onChangeNick = useCallback((e) => {
    setSearchInput(e.target.value);
  });
  const searchUserInfo = async () => {
    const userInfo = await axiosInstance.get(`/api/que/select/${searchInput}`);
    console.log(userInfo);
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
            <Icon icon="search" onClick={searchUserInfo} />
          </SearchBox>
          <SearchList>
            <UserProfile>
              {/* <UserImg /> */}
              <UserTextBox>
                <UserName></UserName>
                <UserStatus></UserStatus>
              </UserTextBox>
            </UserProfile>
          </SearchList>
        </SearchLayout>
      </Layout>
    </div>
  );
}
export default NormalLobby;
