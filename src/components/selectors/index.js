import React, { useEffect } from "react";

import users from "../../account_list";
import { SelectorUser } from "./styles";

const Selectors = () => {
  async function handleChange() {
    console.log("t");
  }

  useEffect(() => {}, []);

  return (
    <SelectorUser onChange={handleChange}>
      {users.length > 0 &&
        users.map(user => <option>{user.client_name}</option>)}
    </SelectorUser>
  );
};

export default Selectors;
