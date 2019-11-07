import React, { useContext, useRef } from "react"
import { RADIUS, MAROON } from "../components/shared_css"

import Layout from "../components/layout"
import styled from "styled-components"
import { useUserContext } from "../components/UserContext"
import { navigate } from "gatsby"

const Login = () => {
  const [updateUser] = useUserContext()
  const name = useRef(null)
  return (
    <Layout>
      <VerticalForm
        onSubmit={async e => {
          e.stopPropagation()
          e.preventDefault()
          await updateUser(name.current.value)
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

const VerticalForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px;
  border: gray 1px solid;
  border-radius: 4px;
  align-content: center;
  justify-content: center;
`

const Button = styled.button`
  background-color: #58a4b0;
  border: none;
  border-radius: ${RADIUS};
  width: 60px;
  color: ${MAROON};
  margin: 10px;
`

export default Login
