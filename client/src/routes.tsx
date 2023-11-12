import LoginPage from "./pages/login";
import HomePage from "./pages/home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoutes";
import FilesPage from "./pages/Files";

const PageRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/playground/:id"
          element={
            <ProtectedRoute>
              <div>
                <HomePage />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/files"
          element={
            <ProtectedRoute>
              <div>
                <FilesPage />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoutes;
