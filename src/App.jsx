import "./App.scss";
import NavbarNav from "./components/NavbarNav";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Homes";
import Ventas from "./pages/Ventas";
import Clientes from "./pages/Clientes";
import Page from "./pages/404";
import KamLab from "./pages/KamLab";
function App() {
  return (
    <div className="content  p-10 w-100">
      <NavbarNav />
      <Routes>
        <Route path="/" exact element={<Home />} errorElement={<Page />} />
        <Route
          path="/Ventas"
          exact
          element={<Ventas />}
          errorElement={<Page />}
        />
        <Route
          path="/Clientes"
          errorElement={<Page />}
          exact
          element={<Clientes />}
        />
        <Route
          path="/KamLab"
          errorElement={<Page />}
          exact
          element={<KamLab />}
        />
        <Route element={<Page />} path="*"></Route>
      </Routes>
    </div>
  );
}

export default App;
