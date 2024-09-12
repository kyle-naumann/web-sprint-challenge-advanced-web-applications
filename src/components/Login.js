import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"

const initialState = {
  username: "",
  password: "",
  errorMessage: ""
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const { push } = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const handleChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const login = e => {
    e.preventDefault();

  axios.post(`http://localhost:5000/api/login`, user)
    .then(res => {
      console.log("Login event handler Res: ", res);
      localStorage.setItem("token", res.data.payload);
      setUser({
        ...user,
        errorMessage: ""
      });
      push("/private");
    })
    .catch(err => {
      console.error("Could not log in: ", err.message);
      setUser({
        ...user,
        errorMessage: "Username or Password not valid"
      });
    });
}
  const error = "";
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid= "loginForm" className= "login-form">
      { user.errorMessage && <h3 className="error" style={{text: "blue"}}> { user.errorMessage } </h3> }
      <form onSubmit={login}>
        <label htmlFor="username">Username: </label>
        <input name="username" id="username" onChange={handleChange} type="text" />

        <label htmlFor="password">Password: </label>
        <input name="password" id="password" onChange={handleChange} type="password" />

        <button name="login" >Login</button>
      </form>

      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.