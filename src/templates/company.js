import React, { useContext } from "react"
import { graphql } from "gatsby"
import { BarChart } from "react-chartkick"
import "chart.js"
import { UserContext } from "../components/UserContext"
import Layout from "../components/layout"
import { MAROON, DARK_GREEN } from "../components/shared_css"
import { apply } from "../components/math"

const Company = ({ data }) => {
  const [state] = useContext(UserContext)
  let pref = state.preferences.map(([key, val]) => [
    key,
    apply[key](data.markdownRemark.frontmatter[key.replace(" ", "_")], val),
  ])
  let def = state.defaultPreferences.map(([key, val]) => [
    key,
    apply[key](data.markdownRemark.frontmatter[key.replace(" ", "_")], val),
  ])
  console.log(pref, def)
  let info = [{ name: "Default", data: def }]
  state.loggedIn && info.push({ name: "Preferences", data: pref })
  return (
    <Layout>
      <h1>{data.markdownRemark.frontmatter.title}</h1>
      <BarChart data={info} colors={[DARK_GREEN, MAROON]} max={5} />
      <article
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
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
