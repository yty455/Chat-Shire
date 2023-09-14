import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AnalysisPage from "./pages/AnalysisPage";
import ProfilePage from "./pages/ProfilePage";
import Test from "./pages/Test";
import IdeaPage from "./pages/IdeaPage";
import MessagePage from "./pages/MessagePage";
import TaskPage from "./pages/TaskPage";

const Login = lazy(() => import("./pages/LoginPage"));
const Main = lazy(() => import("./pages/MainPage"));
const CreatePjt = lazy(() => import("./pages/CreateProjectPage"));
const Redirect = lazy(() => import("./pages/RedirectPage"));

function AppRouter() {
  return (
    <div className="AppRouter">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/main" element={<Main />}></Route>
            <Route path="/createpjt" element={<CreatePjt />}></Route>
            <Route path="/analysis" element={<AnalysisPage />}></Route>
            <Route path="/profile" element={<ProfilePage />}></Route>
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
