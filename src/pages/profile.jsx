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
import { BarChart } from "react-chartkick"
import { BASIC } from "../components/shared_css"
import { constructData } from "../templates/company"
import { numberToGrade } from "../components/math"

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

export const PlayPreferences = () => {
  const [state, setState] = React.useState({
    categories: [
      "Labor",
      "Sustainability",
      "Local Source",
      "Recent Scandals",
      "Price",
      "Privacy",
    ],
    defaultCategories: [
      "Labor",
      "Sustainability",
      "Local Source",
      "Recent Scandals",
      "Price",
      "Privacy",
    ],
  })

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const { categories } = state
    setState(stt => ({
      ...stt,
      categories: arrayMove(categories, oldIndex, newIndex),
    }))
  }
  const { graphData, unweighted_sum, weighted_sum } = constructData(
    state.defaultCategories,
    state.categories,
    5,
    {
      Labor: 3,
      Sustainability: 5,
      Local_Source: 3,
      Recent_Scandals: 2,
      Price: 4,
      Privacy: 3,
    },
    true
  )
  console.log(weighted_sum)
  return (
    <div>
      <BarChart
        data={graphData}
        colors={["#4b627d", "#56B8B8"]}
        max={5}
        library={{ fontColor: BASIC }}
        round={2}
      />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h5>
            Raw Score{" "}
            <span style={{ fontSize: "22px" }}>
              {numberToGrade(unweighted_sum)}
            </span>
          </h5>
        </div>
        <div>
          <h5>
            Weighted Score{" "}
            <span style={{ fontSize: "22px" }}>
              {numberToGrade(weighted_sum)}
            </span>
          </h5>
        </div>
      </div>
      <p style={{ marginTop: "20px" }}>
        Click and drag to rearrange and watch the graph with sample scores
        change to match.
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
    </div>
  )
}

const Horzduo = styled.div`
  display: flex;

  @media only screen and (max-width: 414px) {
    flex-direction: column;
  }
`

export default Profile
