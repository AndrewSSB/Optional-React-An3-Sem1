import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar"
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import { Login } from "./pages/Login";
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState(true)
  
  return(isAuth === true ? 
    (
      <Routes>
        <Route path="/register" element={ <Register /> }/>
        <Route path="/login" element={ <Login /> }/>
      </Routes>
    ) 
    : 
    (
      <ShoppingCartProvider>
        <Navbar />
        <Container className="mb-4">
          <Routes>
            <Route path="" element={ <Home /> }/>
            <Route path="/store" element={ <Store /> }/>
            <Route path="/about" element={ <About /> }/>
          </Routes>
        </Container>
      </ShoppingCartProvider>
    )
  )
}

export default App;
