import "./App.css";

import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import Login from "./components/Login";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import WritePost from "./components/WritePost";
import UnpublishedPosts from "./components/UnpublishedPosts";
import EditPost from "./components/EditPost";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<PersistLogin />}>
            {/* public routes */}
            <Route path="/" element={<Home />} />
            <Route path="post/:id" element={<PostDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* protected routes */}
            <Route element={<RequireAuth />}>
              <Route path="/write-post" element={<WritePost />} />
              <Route path="/unpublished" element={<UnpublishedPosts />} />
              <Route path="/edit/:id" element={<EditPost />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
