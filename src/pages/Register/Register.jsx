import { useState, useEffect } from "react"
import { useSignup } from "../../hooks/useSignup"

import "./Register.css"


export default function Register() {

  const [username, setUsername] = useState(null)
  const [email, setEmail] = useState(null)
  const [isValid, setIsValid] = useState(false)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [check, setCheck] = useState(false)
  const { signup, error, isLoading } = useSignup()
  const valid = ()=> {
    return username && email &&password && confirmPassword && (password === confirmPassword)
  }
useEffect(()=>{
  setIsValid(valid())
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [username, email, password, confirmPassword])
  const handleInputChange = (e) => {
    const { id, value } = e.target
    if (id === "username") {
      setUsername(value)
    }

    if (id === "email") {
      setEmail(value)
    }
    if (id === "password") {
      setPassword(value)
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value)
    }
    if (id === "onlineNewLetterTrue") {
      setCheck(e.target.checked);      
    }
    setIsValid(valid)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(username,email, password, check)
  }
  return (
    <div className="register page">
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <h3>Sign up</h3>

        <div className="form-body">
          <div className="username">
            <label className="form__label" htmlFor="username">
              Username
            </label>
            <input
              className="form__input"
              type="text"
              id="username"
              placeholder="Username"
              onChange={handleInputChange}
              required
            />
            <div>{}</div>
          </div>

          <div className="email">
            <label className="form__label" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="form__input"
              placeholder="Email"
              onChange={handleInputChange}
              required
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
              onChange={handleInputChange}
              required
              minLength={6}
              maxLength={20}
            />
          </div>

          <div className="confirm-password">
            <label className="form__label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              className="form__input"
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="news-letter">
            <label htmlFor="onlineNewLetterTrue">
              sign up for our news letter?
            </label>
            <input
              type="checkbox"
              name="lolThisWontWork"
              id="onlineNewLetterTrue"
              onChange={handleInputChange}
            />
          </div>
        </div>
        {error && <div className="error">{error}</div>}
        <input type="submit" value="Sign Up" disabled={!isValid||isLoading}/>
        
      </form>
    </div>
  )
}
