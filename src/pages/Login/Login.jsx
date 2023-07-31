import { useState } from "react"
import { useLogin } from '../../hooks/useLogin'

export default function Register() {


  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const {login, error, isLoading} = useLogin();

  const handleInputChange = (e) => {
    const { id, value } = e.target

    if (id === "email") {
      setEmail(value)
    }

    if (id === "password") {
      setPassword(value)
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
      //send data to backend 
      await login(email, password)
  }
  return (
    <div className="register page">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>Login</h3>

        <div className="form-body">
          <div className="email">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              className="form__input"
              placeholder="Email"
              onChange={handleInputChange}
            />
          </div>

          <div className="password">
            <label className="form__label" htmlFor="password">
              Password
            </label>
            <input
              className="form__input"
              type="password"
              id="password"
              placeholder="Password"
              minLength={6}
              maxLength={20}
              onChange={handleInputChange}
            />
          </div>
        </div>

          {error && <div className="error">{error}</div>}
        <input type="submit" value="Login" disabled={isLoading}/>
      </form>
    </div>
  )
}
