import React from "react";
const Login = () => (
    <div className="form-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" />
        </div>
        <button type="submit" className="form-button">Login</button>
        <button type="button" className="form-button">Back</button>
      </form>
    </div>
  );

  export default Login;