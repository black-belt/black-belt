import InButton from "components/atoms/Buttons/in-btns";
import {
  BackgroundImg,
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
