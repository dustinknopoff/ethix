import React, { useContext, useState, useEffect } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import { VerticalForm } from "./login"
import { PieChart } from "react-chartkick"
import "chart.js"
import { UserContext } from "../components/UserContext"
import styled, { css } from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { Button } from "../components/shared_css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { fab } from "@fortawesome/free-brands-svg-icons"
import { fas } from "@fortawesome/free-solid-svg-icons"
import Sortable from "../components/Sortable"
import arrayMove from "array-move"

// Chartkick.options = {
//   colors: ["#b00", "#666"],
// }

const Profile = () => {
  const [showPreferences, setShowPreferences] = useState(false)
  const [state] = useContext(UserContext)
  const { loggedIn } = state

  useEffect(() => {
    !loggedIn && navigate("/login")
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
    <VerticalForm border={false} style={{ width: "15vw" }}>
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

  const onChange = (name, currTarget, max) => {
    const { preferences } = state
    if (currTarget.value > max) {
      currTarget.value = max
    }
    const idx = preferences.findIndex(([key, val]) => {
      return key === name
    })
    if (idx !== -1) {
      preferences[idx] = [name, currTarget.value]
      setState(stt => ({ ...stt, preferences }))
    }
  }

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const { preferences } = state
    setState(stt => ({
      ...stt,
      preferences: arrayMove(preferences, oldIndex, newIndex),
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <VerticalForm border={false}>
          {state.preferences.map(([name, value]) => {
            const max = state.preferences.reduce((acc, [n, v]) => {
              if (name === n) return acc
              return acc - v
            }, 100)
            return (
              <FormElement key={name}>
                <label htmlFor={name}>{name}</label>
                <input
                  type="range"
                  name={name}
                  defaultValue={value}
                  onChange={e => {
                    onChange(name, e.currentTarget, max)
                  }}
                  min={0}
                  max={max}
                />
              </FormElement>
            )
          })}
          <label htmlFor="la">
            Labor
            <FontAwesomeIcon icon={fab.faEnvira} />
          </label>
          <Sortable items={state.preferences} onSortEnd={onSortEnd} />
          <input type="range" min="1" max="5" name="la" />
        </VerticalForm>
        <PieChart data={state.preferences} max={100} />
      </div>
      <span>
        Adjust the values of these categories to have ethix create a custom
        score based on your preferences
      </span>
    </ReactCSSTransitionGroup>
  )
}

const FormElement = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  > label {
    padding-right: 10px;
  }

  > * {
    margin: 10px;
  }
`

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
