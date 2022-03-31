import React from "react";
import Layout from "Layout";
import GyeorugiNormalStage from "pages/Gyeorugi/GyeorugiStage/GyeorugiNormalStage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import GyeorugiStage from "./pages/Gyeorugi/GyeorugiStage";
import NormalLobby from "./pages/Gyeorugi/Normal/NormalLobby";
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
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <RecoilRoot>
          <React.Suspense fallback={<div>Loading...</div>}>
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

                  <Route path="gyeorugi/normal" element={<NormalLobby />} />
                  <Route path="mypage" element={<MyPage />} />
                </Route>
                <Route path="gyeorugi/stage" element={<GyeorugiStage />} />
                <Route path="gyeorugi/stage/normal" element={<GyeorugiNormalStage />} />
              </Routes>
            </BrowserRouter>
          </React.Suspense>
        </RecoilRoot>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
