import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./pages/LoginPage"));

function AppRouter() {
  return (
    <div className="AppRouter">
      <BrowserRouter>
        <Suspense fallback={<h1>Loading...</h1>}>
          <Routes>
            <Route path="/" element={<Login />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
