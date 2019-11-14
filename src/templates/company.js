import React, { useContext } from "react"
import { graphql } from "gatsby"
import { BarChart } from "react-chartkick"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"
import { BASIC } from "../components/shared_css"
import { apply } from "../components/math"

const Company = ({ data }) => {
  const [state, setState] = React.useContext(UserContext)
  let pref = state.preferences.map(([key, val]) => [
    key,
    apply[key](data.markdownRemark.frontmatter[key.replace(" ", "_")], val),
  ])
  let def = state.defaultPreferences.map(([key, val]) => [
    key,
    apply[key](data.markdownRemark.frontmatter[key.replace(" ", "_")], val),
  ])
  let info = [{ name: "Default", data: def }]
  state.loggedIn && info.push({ name: "Preferences", data: pref })
  return (
    <Layout>
      <h1 style={{ fontSize: "72px", paddingTop: "40px" }}>
        {data.markdownRemark.frontmatter.title}
      </h1>
      <div style={{ display: "flex", alignItems: "center" }}>
        <BarChart
          data={info}
          colors={["#D61A71", "#4DBBD5"]}
          max={5}
          library={{ fontColor: BASIC }}
          round={2}
        />
        <h1 style={{ fontSize: "72px", flexGrow: 2, padding: "80px" }}>A</h1>
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
