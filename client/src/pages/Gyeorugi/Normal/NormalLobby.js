import InButton from "components/atoms/Buttons/in-btns";
import Icon from "components/atoms/Icons/CustomIcon";
import { Enter } from "pages/MainPage/startWS";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { battleToken, gyeorugiMsg, message, userInfo } from "recoils";
import axiosInstance from "utils/API";
import { colors } from "_foundation";
import {
  BackgroundImg,
  Champion,
  ChampionBox,
  ChampionInfo,
  ImgSize,
  ImgWrapper,
  Layout,
  Name,
  ProfileImg,
  ProfileImgBox,
  SearchBox,
  SearchInput,
  SearchLayout,
  SearchList,
  SearchMsg,
  Standby,
  Status,
  Tier,
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
  const [finishSearch, setFinishSearch] = useState(false);
  const [userList, setUserList] = useState(null);
  const [targetUser, setTargetUser] = useState("");

  const setGyeorugiToken = useSetRecoilState(battleToken);
  const acceptMsg = useRecoilValue(gyeorugiMsg);
  const resetMsg = useResetRecoilState(message);

  const myInfo = useRecoilValue(userInfo);

  const [isHost, setIsHost] = useState(false);
  const [hostInfo, setHostInfo] = useState(null);
  const [guestInfo, setGuestInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`/api/que/select/ready/${myInfo.userId}`).then((res) => {
      setGyeorugiToken(res);
    });
  }, []);

  useEffect(() => {
    if (myInfo && !hostInfo) {
      setHostInfo(myInfo);
    }
  }, [myInfo]);

  useEffect(() => {
    if (hostInfo && hostInfo.userNick === myInfo.userNick) {
      setIsHost(true);
    }
  }, [hostInfo]);

  useEffect(() => {
    if (acceptMsg.type === "ACCEPT") {
      axiosInstance
        .post("/api/que/battle/ready", {
          hostId: acceptMsg.hostId,
          guestId: acceptMsg.guestId,
        })
        .then((res) => {
          setHostInfo(res.Host);
          setGuestInfo(res.Guest);
        });
    }
    // if (hostInfo && hostInfo.userNick === myInfo.userNick) {
    //   setIsHost(true);
    // }
  }, [acceptMsg]);

  const startGyeorugi = () => {
    Enter();
    resetMsg();
    navigate(`/gyeorugi/normal/stage`, {
      state: {
        isHost: isHost,
        hostId: acceptMsg.hostId,
        guestId: acceptMsg.guestId,
        roomSeq: acceptMsg.roomId,
      },
    });
  };

  const onChangeNick = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  const searchUserInfo = async () => {
    const userInfo = await axiosInstance.post("/api/que/select", {
      userId: myInfo.userId,
      search: searchInput,
    });
    setUserList(userInfo);
    setFinishSearch(true);
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

  const tier = {
    1: "bronze",
    2: "silver",
    3: "gold",
    4: "platinum",
    5: "diamond",
    6: "master",
  };

  return (
    <div className="NormalLobby">
      <Layout>
        <BackgroundImg src="/images/practiceBackground.jpg" />
        <Standby>
          <ChampionBox>
            <Champion>
              {hostInfo && (
                <ChampionInfo>
                  <Name>
                    <Icon width={19} height={15} icon="crown" />
                    <span>{hostInfo.userNick}</span>
                  </Name>
                  <ProfileImgBox>
                    <ImgWrapper>
                      {hostInfo.userProfilePath ? (
                        <ProfileImg src={hostInfo.userProfilePath} alt="" />
                      ) : (
                        <ProfileImg src="/images/defaultUser.png" alt="" />
                      )}
                    </ImgWrapper>
                  </ProfileImgBox>
                  <Tier language={t("language")}>
                    {t(tier[hostInfo.userTier])}
                  </Tier>
                </ChampionInfo>
              )}
            </Champion>
            <Champion>
              {guestInfo && (
                <ChampionInfo>
                  <Name>
                    <span>{guestInfo.userNick}</span>
                  </Name>
                  <ProfileImgBox>
                    <ImgWrapper>
                      {guestInfo.userProfilePath ? (
                        <ProfileImg src={guestInfo.userProfilePath} alt="" />
                      ) : (
                        <ProfileImg src="/images/defaultUser.png" alt="" />
                      )}
                    </ImgWrapper>
                  </ProfileImgBox>
                  <Tier language={t("language")}>
                    {t(tier[guestInfo.userTier])}
                  </Tier>
                </ChampionInfo>
              )}
            </Champion>
          </ChampionBox>
          <center>
            {isHost && guestInfo && (
              <InButton onClick={startGyeorugi}>{t("start")}</InButton>
            )}
          </center>
        </Standby>
        <SearchLayout>
          <SearchBox>
            <SearchInput
              onKeyPress={onKeyEnter}
              onChange={onChangeNick}
              placeholder={t("search")}
            />
            <Icon
              icon="search"
              onClick={searchUserInfo}
              width={27}
              height={27}
            />
          </SearchBox>
          {userList && userList.length ? (
            <SearchList>
              {userList.map((user) => (
                <UserProfile
                  key={user.userId}
                  onClick={() =>
                    setTargetUser(user.userId === targetUser ? "" : user.userId)
                  }
                >
                  <UserDetail
                    userData={user}
                    target={targetUser}
                    hostId={myInfo.userId}
                  />
                  {user.userProfilePath ? (
                    <ImgSize>
                      <ImgWrapper>
                        <UserImg
                          state={user.userState}
                          src={user.userProfilePath}
                          alt=""
                        />
                      </ImgWrapper>
                    </ImgSize>
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
            <>
              {finishSearch ? (
                <SearchMsg>{t("search output")}</SearchMsg>
              ) : (
                <SearchMsg>{t("search msg")}</SearchMsg>
              )}
            </>
          )}
        </SearchLayout>
      </Layout>
    </div>
  );
}
export default NormalLobby;
