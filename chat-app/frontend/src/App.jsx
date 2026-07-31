import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

import { socket } from "./socket/socket";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import Welcome from "./pages/Welcome";
import useAuthStore from "./store/auth.store";

function App() {
const isAuthenticated = useAuthStore(
  (state) => state.isAuthenticated
);

  // ✅ CONNECT ONLY ON LOGIN
  useEffect(()=>{

if(isAuthenticated){

 const token =
 useAuthStore.getState().token;


 socket.auth={
  token
 };


 if(!socket.connected){
  socket.connect();
 }

}

},[isAuthenticated]);

useEffect(() => {
  socket.on("connect", () => {
    console.log("✅ Connected", socket.id);
  });

  socket.on("disconnect", () => {
    console.log("❌ Disconnected");
  });

  return () => {
    socket.off("connect");
    socket.off("disconnect");
  };
}, []);
  return (
    <>
      <Toaster position="top-right" />

      <Routes>

        {/* ✅ PUBLIC WELCOME PAGE */}
        <Route
          path="/"
          element={
           isAuthenticated ? <Navigate to="/home" /> : <Welcome />
           }
        />

        {/* ✅ AUTH PAGES */}
        <Route
          path="/login"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <LoginPage />
          }
        />

        <Route
          path="/register"
          element={
            isAuthenticated ? <Navigate to="/home" /> : <RegisterPage />
          }
        />

        {/* ✅ PROTECTED HOME */}
        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/login" />
          }
        />

        {/* ✅ PROTECTED CHAT */}
        <Route
          path="/chat/:id"
          element={
            isAuthenticated ? <ChatPage /> : <Navigate to="/login" />
          }
        />

        {/* ✅ FALLBACK ROUTE */}
        <Route
          path="*"
          element={<Navigate to="/" />}
        />
      </Routes>
    </>
  );
}

export default App;
