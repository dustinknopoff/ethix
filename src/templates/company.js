import React from "react"
import { graphql, Link } from "gatsby"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"
import { BASIC } from "../components/shared_css"
import { apply, numberToGrade } from "../components/math"
import { BarChart } from "react-chartkick"

const numToWeight = {
  5: 45,
  4: 25,
  3: 15,
  2: 10,
  1: 5,
}

const Company = ({ data }) => {
  const [state] = React.useContext(UserContext)
  let info = [
    {
      name: "Default",
      data: state.defaultCategories.map((val, idx) => {
        return [val, data.markdownRemark.frontmatter[val.replace(" ", "_")]]
      }),
    },
  ]
  state.loggedIn &&
    info.push({
      name: "Weighted",
      data: state.categories.map((val, idx) => {
        return [
          val,
          apply(
            data.markdownRemark.frontmatter[val.replace(" ", "_")],
            5 - idx
          ),
        ]
      }),
    })
  let unweighted_sum =
    state.defaultCategories.reduce((acc, val, idx) => {
      let vll =
        (data.markdownRemark.frontmatter[val.replace(" ", "_")] / 5) * 100
      return acc + vll
    }, 0) / state.defaultCategories.length
  let weighted_sum =
    state.categories.reduce((acc, val, idx) => {
      let out_of_one_h =
        (parseFloat(data.markdownRemark.frontmatter[val.replace(" ", "_")]) /
          5) *
        100
      let weight = numToWeight[5 - idx] / 100
      let vll = out_of_one_h * weight
      console.log(vll * 5)
      return acc + vll * 5
    }, 0) / state.categories.length
  console.log(weighted_sum)
  return (
    <Layout>
      <h1 style={{ fontSize: "72px", paddingTop: "40px" }}>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <BarChart
          data={info}
          colors={["#00919d", "#00c5ce"]}
          max={5}
          library={{ fontColor: BASIC }}
          round={2}
        />
        <div
          style={{
            flexGrow: 2,
            padding: "80px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {state.loggedIn && (
            <div>
              <h1 style={{ fontSize: "10vmin", textAlign: "center" }}>
                <span style={{ color: "#4a7b7c" }}>
                  {numberToGrade(weighted_sum)}
                </span>
              </h1>
              <Link to="/profile">Based on your criteria</Link>
            </div>
          )}
          <div>
            <h1
              style={{
                fontSize: state.loggedIn ? "5vmin" : "10vmin",
                textAlign: "center",
              }}
            >
              <span>{numberToGrade(unweighted_sum)}</span>
            </h1>
            <Link
              to="/profile"
              style={{
                textAlign: "center",
                fontSize: state.loggedIn && "18px",
              }}
            >
              {state.loggedIn
                ? "Raw Score"
                : `Create an account to see how 
              ${data.markdownRemark.frontmatter.title} matches with what you care
              about!`}
            </Link>
          </div>
        </div>
      </div>
      <article
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        style={{ columnCount: 2 }}
      ></article>
    </Layout>
  )
}

export default Company

export const query = graphql`
  query CompanyQuery($title: String) {
    markdownRemark(frontmatter: { title: { eq: $title } }) {
      frontmatter {
        Age_Match
        category
        imgSrc
        Labor
        Local_Source
        Recent_Scandals
        Price
        Sustainability
        title
      }
      html
      excerpt(pruneLength: 120)
      fields {
        slug
      }
    }
  }
`
