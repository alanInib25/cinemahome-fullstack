//react router dom
import { BrowserRouter, Routes, Route } from "react-router-dom";

//context
import { FetchProviders } from "./src/context/FetchContext";
import { MoviesProviders } from "./src/context/MoviesContext";
import { SeriesProvides } from "./src/context/SeriesContext";
import { PeopleProviders } from "./src/context/PeopleContext";
import { AuthProviders } from "./src/context/AuthContext";

//Pages (components)
import Dashboard from "./src/pages/dashboard/Dashboard";
import Movies from "./src/pages/movies/Movies";
import Series from "./src/pages/series/Series";
import Celebrities from "./src/pages/celebrities/Celebrities";
import MoviesDiscover from "./src/components/moviesDiscover/MoviesDiscover";
import SeriesDiscover from "./src/components/seriesDiscover/SeriesDiscover";
import DetailItem from "./src/pages/DetailItem/DetailItem";
import DetailPeople from "./src/pages/people/DetailPeople";
import Auth from "./src/pages/auth/Auth";
import ProtectedRoutes from "./src/components/protectedRoutes/ProtectedRoutes";

import MediaImages from "./src/components/item/media/images/MediaImages";
import MediaImage from "./src/components/item/media/images/mediaImage/MediaImage";
import MediaVideos from "./src/components/item/media/video/MediaVideos";

//components
import Layout from "./src/components/Layout";
import Home from "./src/pages/home/Home";
import ForgotPassword from "./src/components/forgotPassword/ForgotPassword";
import ResetPassword from "./src/components/resetPassword/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <FetchProviders>
        <AuthProviders>
          <MoviesProviders>
            <SeriesProvides>
              <PeopleProviders>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/auth/:auth" element={<Auth />} />
                    <Route path="/auth/forgotPassword" element={<ForgotPassword />}/>
                    <Route path="/auth/resetPassword/:token" element={<ResetPassword />}/>
                    <Route element={<ProtectedRoutes />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="celebrities" element={<Celebrities />} />
                      <Route
                        path="detail-people/:id"
                        element={<DetailPeople />}
                      />
                      <Route path="movies" element={<Movies />}>
                        <Route index element={<MoviesDiscover />} />
                      </Route>
                      <Route path="detail-item/:id" element={<DetailItem />}>
                        <Route index element={<MediaVideos />} />
                        <Route path="detail-images" element={<MediaImages />}>
                          <Route index element={<MediaImage />} />
                        </Route>
                      </Route>
                      <Route path="series" element={<Series />}>
                        <Route index element={<SeriesDiscover />} />
                      </Route>
                    </Route>
                    <Route
                      path="*"
                      element={
                        <h1 style={{ color: "white", padding: "5rem" }}>
                          Not found
                        </h1>
                      }
                    />
                  </Route>
                </Routes>
              </PeopleProviders>
            </SeriesProvides>
          </MoviesProviders>
        </AuthProviders>
      </FetchProviders>
    </BrowserRouter>
  );
}

export default App;
