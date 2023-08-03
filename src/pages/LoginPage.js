import { TeamContext } from "../context/TeamContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "../styles/login.css";

export default function SignInSide() {
  const { team, setTeam } = useContext(TeamContext);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  useEffect(() => {
    if (team["loggedIn"]) {
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
  }, [team, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const credentials = {
      loginId: email[0],
      password: password[0],
    };
    console.log(JSON.stringify(credentials));

    try {
      const response = await fetch("http://localhost:8080/teams/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const get_team = await response.json();
      console.log(get_team);
      get_team["loggedIn"] = true;
      setTeam(get_team);
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: [e.target.value] });
  };

  return (
    <div className="wrapper">
      <div>IPL Player Auction</div>
      <div className="login-container">
        <center>
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-heading">Login</div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={email}
              onChange={changeHandler}
            />
            <br />
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={changeHandler}
            />
            <br />
            <input type="submit" name="submit" />
          </form>
        </center>
      </div>
    </div>
  );
}
