import useAuth from "../hooks/useAuth";
export default function LoginForm(props) {
  const { persist } = useAuth();
  return (
    <form onSubmit={props.handleSubmit}>
      <br />
      <label htmlFor="username">Username:</label>
      <input
        name="username"
        id="login-username"
        type="username"
        placeholder="Username"
        onChange={props.handleChange}
        value={props.formData.username}
      />
      <br />
      <br />
      <label htmlFor="password">Password:</label>
      <input
        name="password"
        id="login-password"
        type="password"
        placeholder="*******"
        onChange={props.handleChange}
        value={props.formData.password}
      />
      <br />
      <br />
      <button className="button">Login</button>

      <div className="persist-check">
        <input
          type="checkbox"
          id="persist"
          onChange={props.togglePersist}
          checked={persist}
        />
        <label htmlFor="persist">Trust this device?</label>
      </div>
      {props.errMsg && <p className="error">{props.errMsg}</p>}
    </form>
  );
}
