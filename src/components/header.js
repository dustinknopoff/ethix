import React, { useContext, Fragment } from "react"

import { Link, navigate } from "gatsby"
import styled from "styled-components"
import { UserContext } from "./UserContext"
import { PRIMARY } from "./shared_css"

const Header = ({ location }) => {
  const [state, setState] = useContext(UserContext)
  const { name, loggedIn } = state
  return (
    <header>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: `100vw`,
          padding: `1.45rem 1.0875rem`,
          display: `flex`,
          justifyContent: ` space-between`,
          alignItems: `baseline`,
          height: "5vh",
        }}
      >
        <span style={{ margin: 0 }}>
          <Link
            to="/"
            style={{
              textDecoration: `none`,
              color: PRIMARY,
            }}
          >
            {name ? `Hi, ${name}` : ""}
          </Link>
        </span>
        <Link to="/">
          <h4 style={{ color: PRIMARY, fontSize: "24px" }}>ethix</h4>
        </Link>
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
        to="/login/"
        style={{
          textDecoration: `none`,
        }}
      >
        Create Account
      </Link>
    </li>
    <li>
      <Link
        to="/login/"
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
    color: var(--primary);
  }
  > * > button {
    color: var(--primary);
    background: none;
    border: none;
  }
`
