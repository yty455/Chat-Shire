import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage";
import ProfilePage from "./pages/ProfilePage";

const Login = lazy(() => import("./pages/LoginPage"));
const Main = lazy(() => import("./pages/MainPage"));

function AppRouter() {
  return (
    <div className="AppRouter">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/analysis" element={<AnalysisPage/>}></Route>
            <Route path="/profile" element={<ProfilePage/>}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
