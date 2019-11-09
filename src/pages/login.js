import React, { useContext, useRef } from "react"
import { Button } from "../components/shared_css"

import Layout from "../components/layout"
import styled, { css } from "styled-components"
import { UserContext } from "../components/UserContext"
import { navigate } from "gatsby"

const Login = () => {
  const [, setState] = useContext(UserContext)
  const name = useRef(null)
  return (
    <Layout displayCenter>
      <VerticalForm
        border={true}
        onSubmit={e => {
          e.stopPropagation()
          e.preventDefault()
          setState(stt => ({
            ...stt,
            name: name.current.value,
            loggedIn: true,
          }))
          navigate("/profile/")
        }}
      >
        <label htmlFor="fname">Name</label>
        <input type="text" name="fname" ref={name} required />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" />
        <Button type="submit">Go</Button>
      </VerticalForm>
    </Layout>
  )
}

export const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  ${props =>
    props.border &&
    css`
      border: gray 1px solid;
      border-radius: 4px;
    `}
  align-content: center;
  justify-content: center;
`

export default Login
