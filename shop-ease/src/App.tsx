import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Login } from "./pages/Login";
import { AuthProvider } from "./context/authContext";
import { ProtectedRoutes } from "./components/Redirect";
import { PageNotFound } from "./pages/PageNotFound";

function App() {
  interface Props {
    isAuth: boolean;
  }

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
      <ShoppingCartProvider>
        <Container className="mb-4">
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/store" element={[<Navbar />, <Store />]} />
              <Route path="/about" element={[<Navbar />, <About />]} />
              <Route path="/" element={[<Navbar />, <Home />]} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Container>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
