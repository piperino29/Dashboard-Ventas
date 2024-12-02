import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar bg-light">
      <ul>
        <li>
          <NavLink
            to="/"
            className="text-dark rounded py-2 w-100 d-inline-block px-3"
          >
            <FaIcons.FaHome className="me-2" />
            inicio
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Ventas"
            className="text-dark rounded py-2 w-100 d-inline-block px-3"
          >
            <FaIcons.FaChartBar className="me-2" />
            Ventas
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/Clientes"
            className="text-dark rounded py-2 w-100 d-inline-block px-3"
          >
            <FaIcons.FaUserFriends className="me-2" />
            Clientes
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
