import { Link, navigate } from "gatsby"
import React, { useContext, Fragment } from "react"
import styled from "styled-components"
import { UserContext } from "./UserContext"
import { MAROON } from "./shared_css"

const Header = () => {
  const [state, setState] = useContext(UserContext)
  const { name, loggedIn } = state
  return (
    <header>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          justifyContent: ` space-between`,
          alignItems: `baseline`,
          height: "5vh",
        }}
      >
        <span style={{ margin: 0, color: MAROON }}>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
            }}
          >
            {name ? `Hi, ${name}` : ""}
          </Link>
        </span>
        <div>
          <List>{loggedIn ? <LoggedIn setState={setState} /> : <Fresh />}</List>
        </div>
      </div>
    </header>
  )
}

const Fresh = () => (
  <Fragment>
    <li>
      <Link
        to="/login"
        style={{
          textDecoration: `none`,
        }}
      >
        Create Account
      </Link>
    </li>
    <li>
      <Link
        to="/login"
        style={{
          textDecoration: `none`,
        }}
      >
        Login
      </Link>
    </li>
  </Fragment>
)

const LoggedIn = ({ setState }) => (
  <Fragment>
    <li>
      <Link
        to="/profile"
        style={{
          textDecoration: `none`,
        }}
      >
        Your Profile
      </Link>
    </li>
    <li>
      <button
        onClick={() => {
          setState(state => ({ ...state, name: "", loggedIn: false }))
          navigate("/")
        }}
      >
        Logout
      </button>
    </li>
  </Fragment>
)

export default Header

const List = styled.ul`
  text-decoration: none;
  list-style: none;
  display: flex;

  > * {
    padding: 10px;
  }

  > *:hover,
  > * > button:hover {
    text-decoration: underline;
  }

  > * > a {
    color: var(--maroon);
  }
  > * > button {
    color: var(--maroon);
    background: none;
    border: none;
  }
`
