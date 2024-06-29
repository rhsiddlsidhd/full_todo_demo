import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import { api } from "./utils/api";

function App() {
  const [user, setUser] = useState("");

  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");

      if (storedToken) {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      }
    } catch (err) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;
