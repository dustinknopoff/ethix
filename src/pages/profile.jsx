import React, { useContext, useEffect, Fragment } from "react"
import { navigate } from "gatsby"
import Layout from "../components/layout"
import { VerticalForm } from "./login"
import "chart.js"
import { UserContext } from "../components/UserContext"
import styled from "styled-components"
import { Button } from "../components/shared_css"
import { SortableList } from "../components/Sortable"
import arrayMove from "array-move"

const Profile = () => {
  const [state] = useContext(UserContext)
  const { loggedIn } = state

  useEffect(() => {
    !loggedIn && navigate("/login", { replace: "/" })
  }, [loggedIn])

  return loggedIn ? (
    <Layout>
      <Horzduo>
        <div style={{ width: "80vw" }}>
          <h3 style={{ marginTop: "20px" }}>Personal Information</h3>
          <Info data={state.info} name={state.name} />
          <h3 style={{ marginTop: "20px" }}>Preferences</h3>
          <Preferences />
        </div>
        <Button
          style={{ width: "140px", height: "40px" }}
          onClick={() => navigate("/")}
        >
          Save
        </Button>
      </Horzduo>
    </Layout>
  ) : (
    <Layout>
      <p>This page requires logging. You're now being redirected to login.</p>
    </Layout>
  )
}

const Info = ({ data, name }) => (
  <Fragment>
    <VerticalForm border={false} small>
      <label htmlFor="fname">Name</label>
      <input type="text" name="fname" required defaultValue={name} />
      <label htmlFor="age">Age</label>
      <input type="number" name="age" defaultValue={data.age} />
      <label htmlFor="loc">Location</label>
      <input type="text" name="loc" defaultValue={data.location} />
    </VerticalForm>
  </Fragment>
)

const Preferences = () => {
  const [state, setState] = useContext(UserContext)

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const { categories } = state
    setState(stt => ({
      ...stt,
      categories: arrayMove(categories, oldIndex, newIndex),
    }))
  }

  return (
    <Fragment>
      <p style={{ marginTop: "20px" }}>
        Click and drag to rearrange these core categories to match your
        priorities.
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <VerticalForm border={false}>
          <SortableList items={state.categories} onSortEnd={onSortEnd} />
        </VerticalForm>
      </div>
    </Fragment>
  )
}

const Horzduo = styled.div`
  display: flex;

  @media only screen and (max-width: 414px) {
    flex-direction: column;
  }
`

export default Profile
