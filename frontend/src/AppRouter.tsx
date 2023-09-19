import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage";
import ProfilePage from "./pages/ProfilePage";
import ProfileSettingPage from "./pages/ProfileSettingPage";
import Test from "./pages/Test";
import IdeaPage from "./pages/IdeaPage";
import MessagePage from "./pages/MessagePage";
import TaskPage from "./pages/TaskPage";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";
import sh from "./assets/sh.jpg";

const Login = lazy(() => import("./pages/LoginPage"));
const Main = lazy(() => import("./pages/MainPage"));
const CreatePjt = lazy(() => import("./pages/CreateProjectPage"));
const Redirect = lazy(() => import("./pages/RedirectPage"));

function AppRouter() {
  return (
    <div className="AppRouter">
      <BrowserRouter>
        <Suspense
          fallback={
            <>
              <Box sx={{ width: "100%" }}>
                <LinearProgress />
              </Box>
              <img
                style={{
                  width: "30vw",
                  margin: "0 auto",
                  alignItems: "center",
                  display: "flex",
                }}
                src={sh}
                alt="sh"
              />
            </>
          }
        >
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/createpjt" element={<CreatePjt />}></Route>
            <Route path="/analysis" element={<AnalysisPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
            <Route path="/profile/setting" element={<ProfileSettingPage />}></Route>
            <Route path="/test" element={<Test />}></Route>
            <Route path="/idea" element={<IdeaPage />}></Route>
            <Route path="/message" element={<MessagePage />}></Route>
            <Route path="/task" element={<TaskPage />}></Route>
            <Route path="/oauth2/sign-up" element={<Redirect />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
