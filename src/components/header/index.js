import React from "react";

import { Navbar, Logo } from "./styles";

const Header = () => {
  return (
    <Navbar>
      <Logo
        src="/logo_livehere.svg"
        alt="Livehere"
      />
    </Navbar>
  );
};

export default Header;
