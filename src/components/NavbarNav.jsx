import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
function NavbarNav(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  let fecha = new Date();
  let mes = fecha.toLocaleString("es-ES", { month: "long" });
  mes = mes.charAt(0).toUpperCase() + mes.slice(1);

  return (
    <div>
      <Navbar {...args} color="light" light expand="md">
        <NavbarBrand href="/">
          DASHBOARD VENTAS : {mes} - {fecha.getFullYear()}
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className="ms-auto">
            <UncontrolledDropdown nav inNavbar direction="left">
              <DropdownToggle nav caret size="lg">
                Monitores
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>KAM</DropdownItem>
                <DropdownItem tag={Link} to="/kamLab">
                  Laboratorios
                </DropdownItem>
                <DropdownItem tag={Link} to="/kamEquipos">
                  Equipos
                </DropdownItem>
                <DropdownItem tag={Link} to="/KamFM">
                  Repuestos y FM
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to="/">
                  Vendedores
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarNav;
