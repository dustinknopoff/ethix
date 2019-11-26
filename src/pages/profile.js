import React, { useContext, useState, useEffect } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import { VerticalForm } from "./login"
import "chart.js"
import { UserContext } from "../components/UserContext"
import styled, { css } from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { Button } from "../components/shared_css"
import Sortable from "../components/sortable"
import arrayMove from "array-move"

const Profile = () => {
  const [showPreferences, setShowPreferences] = useState(false)
  const [state] = useContext(UserContext)
  const { loggedIn } = state

  useEffect(() => {
    !loggedIn && navigate("/login", { replace: "/" })
  }, [loggedIn])

  return loggedIn ? (
    <Layout>
      <h3 style={{ marginTop: "20px" }}>Profile</h3>
      <div style={{ width: "80vw" }}>
        <HiddenButton
          onClick={() => setShowPreferences(false)}
          left
          active={!showPreferences}
        >
          <h5>Info</h5>
        </HiddenButton>
        <HiddenButton
          onClick={() => setShowPreferences(true)}
          active={showPreferences}
        >
          <h5>Preferences</h5>
        </HiddenButton>
      </div>
      {!showPreferences && <Info data={state.info} name={state.name} />}
      {showPreferences && <Preferences />}
      <Button style={{ width: "140px" }} onClick={() => navigate("/")}>
        Start Searching
      </Button>
    </Layout>
  ) : (
    <Layout>
      <p>This page requires logging. You're now being redirected to login.</p>
    </Layout>
  )
}

const Info = ({ data, name }) => (
  <ReactCSSTransitionGroup
    transitionName="pref"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <VerticalForm border={false} small>
      <label htmlFor="fname">Name</label>
      <input type="text" name="fname" required defaultValue={name} />
      <label htmlFor="age">Age</label>
      <input type="number" name="age" defaultValue={data.age} />
      <label htmlFor="loc">Location</label>
      <input type="text" name="loc" defaultValue={data.location} />
    </VerticalForm>
  </ReactCSSTransitionGroup>
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
    <ReactCSSTransitionGroup
      transitionName="pref"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnter={false}
      transitionLeave={false}
    >
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
          <Sortable items={state.categories} onSortEnd={onSortEnd} />
        </VerticalForm>
      </div>
    </ReactCSSTransitionGroup>
  )
}

// const FormElement = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;

//   > label {
//     padding-right: 10px;
//   }

//   > * {
//     margin: 10px;
//   }
// `

const HiddenButton = styled.button`
  border: none;
  height: 24px;
  background: var(--primary);
  color: white;
  border-radius: ${props => (props.left ? "4px 0 0 4px" : "0 4px 4px 0")};
  padding: 5px;
  ${props =>
    props.left &&
    css`
      border-right: solid 1px white;
    `};
  ${props =>
    !props.active &&
    css`
      color: gray;
      background: #efefef;
    `}
`

export default Profile
