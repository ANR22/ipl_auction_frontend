import { createContext, useState } from "react";

export const TeamContext = createContext();

const defaultTeam = {
  id: "",
  loginId: "",
  loggedIn: false,
  name: "",
  numPlayersBought: "",
  password: "",
  purseRemaining: "",
};

const TeamProvider = ({ children }) => {
  const [team, setTeam] = useState(defaultTeam);

  return (
    <TeamContext.Provider
      value={{
        team,
        setTeam,
      }}
    >
      {children}
    </TeamContext.Provider>
  );
};

export default TeamProvider;
