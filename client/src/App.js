import Layout from "Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";

import GyeorugiStage from "./pages/Gyeorugi/GyeorugiStage";
import Lobby from "./pages/Gyeorugi/Lobby";
import MainPage from "./pages/MainPage/MainPage";
import MyPage from "./pages/Mypage/MyPage";
import Basics from "./pages/Practice/Basics";
import BasicStage from "./pages/Practice/BasicStage";
import Combos from "./pages/Practice/Combos";
import ComboStage from "./pages/Practice/ComboStage";
import Poomsae from "./pages/Practice/Poomsae";
import PoomsaeStage from "./pages/Practice/PoomsaeStage";
import Practice from "./pages/Practice/Practice";
import PromotionStage from "./pages/Promotion/PromotionStage";

function App() {
  return (
    <div className="App">
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<MainPage />} />

              <Route path="practice" element={<Practice />}>
                <Route path="basics" element={<Basics />} />
                <Route path="basics/stage" element={<BasicStage />} />
                <Route path="combos" element={<Combos />} />
                <Route path="combos/stage" element={<ComboStage />} />
                <Route path="poomsae" element={<Poomsae />} />
                <Route path="poomsae/stage" element={<PoomsaeStage />} />
              </Route>

              <Route path="promotion" element={<PromotionStage />} />

              <Route path="gyeorugi" element={<Lobby />} />
              <Route path="mypage" element={<MyPage />} />
            </Route>
            <Route path="gyeorugi/stage" element={<GyeorugiStage />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
