import React, { useContext, useState, useEffect } from "react"
import { navigate } from "gatsby"

import Layout from "../components/layout"
import { VerticalForm } from "./login"
import { PieChart } from "react-chartkick"
import "chart.js"
import { UserContext } from "../components/UserContext"
import styled from "styled-components"
import ReactCSSTransitionGroup from "react-addons-css-transition-group"
import { Button } from "../components/shared_css"

// Chartkick.options = {
//   colors: ["#b00", "#666"],
// }

const Profile = () => {
  const [showPreferences, setShowPreferences] = useState(false)
  const [state] = useContext(UserContext)
  const { loggedIn } = state

  useEffect(() => {
    !loggedIn && navigate("/login")
  }, [])

  return loggedIn ? (
    <Layout>
      <h3 style={{ marginTop: "20px" }}>Profile</h3>
      <div style={{ width: 960 }}>
        <HiddenButton onClick={() => setShowPreferences(false)}>
          <h5>Info</h5>
        </HiddenButton>
        <HiddenButton onClick={() => setShowPreferences(true)}>
          <h5>Preferences</h5>
        </HiddenButton>
      </div>
      {!showPreferences && <Info />}
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

const Info = () => (
  <ReactCSSTransitionGroup
    transitionName="pref"
    transitionAppear={true}
    transitionAppearTimeout={500}
    transitionEnter={false}
    transitionLeave={false}
  >
    <VerticalForm border={false} style={{ width: "15vw" }}>
      <label htmlFor="fname">Name</label>
      <input type="text" name="fname" required />
      <label htmlFor="age">Age</label>
      <input type="number" name="age" />
      <label htmlFor="loc">Location</label>
      <input type="text" name="loc" />
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
                  type="number"
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
        </VerticalForm>
        <PieChart data={state.preferences} max={100} />
      </div>
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
  background: none;
`

export default Profile
