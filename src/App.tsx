import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoPage from "./pages/TodoPages";
import PrivateRoute from "./components/PrivateRoute";
import LoginPage from "./pages/LoginPages";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/todo" element={<TodoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
