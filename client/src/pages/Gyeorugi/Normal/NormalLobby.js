import InButton from "components/atoms/Buttons/in-btns";
import Icon from "components/atoms/Icons/CustomIcon";
import {
  ChampBackground,
  ChampionBox,
  CounterChampion,
  Layout,
  MyChampion,
  SearchInput,
  SearchLayout,
  SearchList,
  Standby,
} from "./NormalLobby.styled";

function NormalLobby() {
  return (
    <div className="NormalLobby">
      <Layout>
        <Standby>
          <ChampionBox>
            <MyChampion>
              <ChampBackground src="/images/gyeorugi-profile-big.png" alt="" />
              {/* <img src="/images/gyeorugi-profile-big.png" alt="" />
              </ChampBackground> */}
              {/* <Icon
                width={383}
                height={736}
                block="block"
                icon="gyeorugiBigProfile"
              /> */}
            </MyChampion>
            <CounterChampion>
              <ChampBackground src="/images/gyeorugi-profile-big.png" alt="" />
              {/* <Icon
                width={383}
                height={736}
                block="block"
                icon="gyeorugiBigProfile"
              /> */}
            </CounterChampion>
          </ChampionBox>
          <InButton>겨루기 시작</InButton>
        </Standby>
        <SearchLayout>
          <SearchInput></SearchInput>
          <SearchList></SearchList>
        </SearchLayout>
      </Layout>
    </div>
  );
}

export default NormalLobby;
